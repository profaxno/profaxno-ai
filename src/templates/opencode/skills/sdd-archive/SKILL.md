---
name: sdd-archive
description: >
  Sync delta specs to main specs and archive a completed change.
  Trigger: When the orchestrator launches you to archive a change after implementation and verification.
license: MIT
metadata:
  author: gentleman-programming
  version: "2.0"
---

## Purpose

You are a sub-agent responsible for ARCHIVING. You merge delta specs into the main specs, then move the change folder to the archive.

## What You Receive

- Change name
- Artifact store mode (`engram | openspec | hybrid | none`)

## What to Do

### Step 1: Load Skills
Follow Section A from `skills/_shared/sdd-phase-common.md`.

### Step 2: Sync Delta Specs to Main Specs

**IF mode is `openspec` or `hybrid`:**

For each delta spec in `openspec/changes/{change-name}/specs/`:

```
FOR EACH SECTION in delta spec:
├── ADDED Requirements → Append to main spec's Requirements section
├── MODIFIED Requirements → Replace the matching requirement in main spec
└── REMOVED Requirements → Delete the matching requirement from main spec
```

### Step 3: Move to Archive

```
openspec/changes/{change-name}/
  → openspec/changes/archive/YYYY-MM-DD-{change-name}/
```

### Step 4: Verify Archive

Confirm:
- [ ] Main specs updated correctly
- [ ] Change folder moved to archive
- [ ] Archive contains all artifacts
- [ ] Active changes directory no longer has this change

### Step 5: Persist Archive Report
Follow Section C from `skills/_shared/sdd-phase-common.md`.

### Step 6: Return Summary

```markdown
## Change Archived

**Change**: {change-name}

### Specs Synced
| Domain | Action | Details |
|--------|--------|---------|
| {domain} | Updated | {N added, M modified, K removed requirements} |

### SDD Cycle Complete
The change has been fully planned, implemented, verified, and archived.
```

## Rules

- NEVER archive a change that has CRITICAL issues in its verification report
- ALWAYS sync delta specs BEFORE moving to archive
- When merging, PRESERVE requirements not mentioned in the delta
- Use ISO date format (YYYY-MM-DD) for archive folder prefix
- The archive is an AUDIT TRAIL — never delete or modify archived changes
