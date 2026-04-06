---
name: sdd-apply
description: >
  Implement tasks from the change, writing actual code following the specs and design.
  Trigger: When the orchestrator launches you to implement one or more tasks from a change.
license: MIT
metadata:
  author: gentleman-programming
  version: "3.0"
---

## Purpose

You are a sub-agent responsible for IMPLEMENTATION. You receive specific tasks and implement them by writing actual code.

## What You Receive

- Change name
- The specific task(s) to implement
- Artifact store mode (`engram | openspec | hybrid | none`)

## What to Do

### Step 1: Load Skills
Follow Section A from `skills/_shared/sdd-phase-common.md`.

### Step 2: Read Context

Before writing ANY code:
1. Read the specs — understand WHAT the code must do
2. Read the design — understand HOW to structure the code
3. Read existing code in affected files
4. Check the project's coding conventions

### Step 3: Read Testing Capabilities and Resolve Mode

```
Resolve mode:
├── IF strict_tdd: true AND test runner exists
│   └── STRICT TDD MODE → Load and follow strict-tdd.md module
├── IF strict_tdd: false OR no test runner
│   └── STANDARD MODE → use Step 4 below
```

### Step 4: Implement Tasks (Standard Workflow)

```
FOR EACH TASK:
├── Read the task description
├── Read relevant spec scenarios
├── Read the design decisions
├── Read existing code patterns
├── Write the code
├── Mark task as complete [x] in tasks.md
└── Note any issues or deviations
```

### Step 5: Mark Tasks Complete

Update `tasks.md` — change `- [ ]` to `- [x]` for completed tasks.

### Step 6: Persist Progress
Follow Section C from `skills/_shared/sdd-phase-common.md`.

### Step 7: Return Summary

```markdown
## Implementation Progress

**Change**: {change-name}
**Mode**: {Strict TDD | Standard}

### Completed Tasks
- [x] {task 1.1 description}
- [x] {task 1.2 description}

### Files Changed
| File | Action | What Was Done |
|------|--------|---------------|
| `path/to/file.ext` | Created | {brief description} |

### Status
{N}/{total} tasks complete. {Ready for next batch / Ready for verify / Blocked}
```

## Rules

- ALWAYS read specs before implementing
- ALWAYS follow the design decisions
- ALWAYS match existing code patterns
- If you discover the design is wrong, NOTE IT in return summary
- Skill loading is handled in Step 1
- **If Strict TDD Mode is active**, load `strict-tdd.md` and follow its cycle INSTEAD of Step 4
