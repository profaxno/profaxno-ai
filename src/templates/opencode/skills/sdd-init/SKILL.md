---
name: sdd-init
description: >
  Initialize Spec-Driven Development context in any project. Detects stack, conventions, testing capabilities, and bootstraps the active persistence backend.
  Trigger: When user wants to initialize SDD in a project, or says "sdd init", "iniciar sdd", "openspec init".
license: MIT
metadata:
  author: gentleman-programming
  version: "3.0"
---

## Purpose

You are a sub-agent responsible for initializing the Spec-Driven Development (SDD) context in a project. You detect the project stack, conventions, and testing capabilities, then bootstrap the active persistence backend.

You are an EXECUTOR for this phase, not the orchestrator. Do the initialization work yourself. Do NOT launch sub-agents, do NOT call `delegate` or `task`.

## Execution and Persistence Contract

- If mode is `engram`:
  Do NOT create `openspec/` directory.
  **Save project context**:
  ```
  mem_save(
    title: "sdd-init/{project-name}",
    topic_key: "sdd-init/{project-name}",
    type: "architecture",
    project: "{project-name}",
    content: "{detected project context markdown}"
  )
  ```
  `topic_key` enables upserts — re-running init updates the existing context, not duplicates.
  (See `skills/_shared/engram-convention.md` for full naming conventions.)
- If mode is `openspec`: Read and follow `skills/_shared/openspec-convention.md`. Run full bootstrap.
- If mode is `hybrid`: Read and follow BOTH convention files. Run openspec bootstrap AND persist context to Engram.
- If mode is `none`: Return detected context without writing project files.

## What to Do

### Step 1: Detect Project Context

Read the project to understand:
- Tech stack (check package.json, go.mod, pyproject.toml, etc.)
- Existing conventions (linters, test frameworks, CI)
- Architecture patterns in use

### Step 2: Detect Testing Capabilities

Scan the project for ALL testing infrastructure:

```
Detect testing capabilities:
├── Test Runner
│   ├── package.json → devDependencies: vitest, jest, mocha, ava
│   ├── pyproject.toml / pytest.ini → pytest
│   ├── go.mod → go test (built-in)
│   ├── Cargo.toml → cargo test (built-in)
│   └── Result: {framework name, command} or NOT FOUND
│
├── Test Layers
│   ├── Unit: test runner exists → AVAILABLE
│   ├── Integration: @testing-library/*, pytest + httpx, net/http/httptest, etc.
│   ├── E2E: playwright, cypress, selenium, etc.
│   └── Result: AVAILABLE or NOT INSTALLED
│
├── Coverage Tool
│   ├── vitest --coverage, jest --coverage, c8, coverage.py, go test -cover
│   └── Result: {command} or NOT AVAILABLE
│
└── Quality Tools
    ├── Linter: eslint, pylint, golangci-lint, clippy
    ├── Type checker: tsc --noEmit, mypy, go vet
    └── Formatter: prettier, black, gofmt
```

### Step 3: Resolve STRICT TDD MODE

```
1. Read from system prompt: "strict-tdd-mode" marker
2. Check openspec/config.yaml → strict_tdd field
3. If nothing found AND test runner detected: default to strict_tdd: true
4. If no test runner: strict_tdd: false
```

### Step 4: Initialize Persistence Backend

If mode resolves to `openspec`, create directory structure.

### Step 5: Persist Testing Capabilities

MANDATORY — persist detected testing capabilities.

### Step 6: Build Skill Registry

1. Scan user skills: glob `*/SKILL.md` across skill directories
2. Scan project conventions: check for `agents.md`, `.cursorrules`, etc.
3. Write `.atl/skill-registry.md` in project root
4. If engram available, ALSO save to engram

### Step 7: Persist Project Context

**MANDATORY** — persist detected project context.

### Step 8: Return Summary

Return structured envelope with: status, executive_summary, artifacts, next_recommended, risks.

## Rules

- NEVER create placeholder spec files - specs are created via sdd-spec during a change
- ALWAYS detect the real tech stack, don't guess
- ALWAYS persist testing capabilities as a separate observation
- If Strict TDD Mode requested but no test runner exists, set strict_tdd: false
