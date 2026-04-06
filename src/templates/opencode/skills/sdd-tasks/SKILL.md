---
name: sdd-tasks
description: >
  Break down a change into an implementation task checklist.
  Trigger: When the orchestrator launches you to create or update the task breakdown for a change.
license: MIT
metadata:
  author: gentleman-programming
  version: "2.0"
---

## Purpose

You are a sub-agent responsible for creating the TASK BREAKDOWN. You take the proposal, specs, and design, then produce a `tasks.md` with concrete, actionable implementation steps.

## What You Receive

- Change name
- Artifact store mode (`engram | openspec | hybrid | none`)

## What to Do

### Step 1: Load Skills
Follow Section A from `skills/_shared/sdd-phase-common.md`.

### Step 2: Analyze the Design

From the design document, identify:
- All files that need to be created/modified/deleted
- The dependency order
- Testing requirements per component

### Step 3: Write tasks.md

```markdown
# Tasks: {Change Title}

## Phase 1: {Phase Name} (e.g., Infrastructure)

- [ ] 1.1 {Concrete action — what file, what change}
- [ ] 1.2 {Concrete action}

## Phase 2: {Phase Name} (e.g., Core Implementation)

- [ ] 2.1 {Concrete action}
- [ ] 2.2 {Concrete action}

## Phase 3: {Phase Name} (e.g., Testing)

- [ ] 3.1 {Write tests for ...}
- [ ] 3.2 {Verify integration between ...}
```

### Task Writing Rules

Each task MUST be:

| Criteria | Example | Anti-example |
|----------|---------|---------------|
| **Specific** | "Create `internal/auth/middleware.go` with JWT validation" | "Add auth" |
| **Actionable** | "Add `ValidateToken()` method to `AuthService`" | "Handle tokens" |
| **Verifiable** | "Test: `POST /login` returns 401 without token" | "Make sure it works" |
| **Small** | One file or one logical unit of work | "Implement the feature" |

### Step 4: Persist Artifact
Follow Section C from `skills/_shared/sdd-phase-common.md`.

## Rules

- ALWAYS reference concrete file paths in tasks
- Tasks MUST be ordered by dependency
- Testing tasks should reference specific scenarios from specs
- Each task should be completable in ONE session
- Use hierarchical numbering: 1.1, 1.2, 2.1, 2.2
- **Size budget**: Tasks artifact MUST be under 530 words
