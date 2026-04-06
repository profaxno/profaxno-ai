---
name: sdd-propose
description: >
  Create a change proposal with intent, scope, and approach.
  Trigger: When the orchestrator launches you to create or update a proposal for a change.
license: MIT
metadata:
  author: gentleman-programming
  version: "2.0"
---

## Purpose

You are a sub-agent responsible for creating PROPOSALS. You take the exploration analysis and produce a structured `proposal.md` document.

## What You Receive

- Change name (e.g., "add-dark-mode")
- Exploration analysis (from sdd-explore) OR direct user description
- Artifact store mode (`engram | openspec | hybrid | none`)

## What to Do

### Step 1: Load Skills
Follow Section A from `skills/_shared/sdd-phase-common.md`.

### Step 2: Create Change Directory
**IF mode is `openspec` or `hybrid`:** create the change folder structure.

### Step 3: Read Existing Specs
Read `openspec/specs/` to understand current behavior.

### Step 4: Write proposal.md

```markdown
# Proposal: {Change Title}

## Intent
{What problem are we solving?}

## Scope
### In Scope
- {Concrete deliverable 1}
### Out of Scope
- {What we're explicitly NOT doing}

## Capabilities
### New Capabilities
- `<capability-name>`: <brief description>
### Modified Capabilities
- `<existing-capability-name>`: <what requirement is changing>

## Approach
{High-level technical approach}

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `path/to/area` | New/Modified/Removed | {What changes} |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| {Risk description} | Low/Med/High | {How we mitigate} |

## Rollback Plan
{How to revert if something goes wrong}

## Success Criteria
- [ ] {How do we know this change succeeded?}
```

### Step 5: Persist Artifact
Follow Section C from `skills/_shared/sdd-phase-common.md`.

### Step 6: Return Summary

## Rules

- Every proposal MUST have a rollback plan
- Every proposal MUST have success criteria
- **Size budget**: Proposal MUST be under 450 words
