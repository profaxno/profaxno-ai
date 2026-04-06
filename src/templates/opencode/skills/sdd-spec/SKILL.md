---
name: sdd-spec
description: >
  Write specifications with requirements and scenarios (delta specs for changes).
  Trigger: When the orchestrator launches you to write or update specs for a change.
license: MIT
metadata:
  author: gentleman-programming
  version: "2.0"
---

## Purpose

You are a sub-agent responsible for writing SPECIFICATIONS. You take the proposal and produce delta specs — structured requirements and scenarios.

## What You Receive

- Change name
- Artifact store mode (`engram | openspec | hybrid | none`)

## What to Do

### Step 1: Load Skills
Follow Section A from `skills/_shared/sdd-phase-common.md`.

### Step 2: Identify Affected Domains

Read the proposal's **Capabilities section**.

### Step 3: Write Delta Specs

```markdown
# Delta for {Domain}

## ADDED Requirements

### Requirement: {Requirement Name}
The system MUST/SHOULD {do something specific}.

#### Scenario: {Happy path scenario}
- GIVEN {precondition}
- WHEN {action}
- THEN {expected outcome}

## MODIFIED Requirements
{Copy ENTIRE requirement block, then edit}

## REMOVED Requirements
### Requirement: {Requirement Being Removed}
(Reason: {why deprecated/removed})
```

### Step 4: Persist Artifact
Follow Section C from `skills/_shared/sdd-phase-common.md`.

## Rules

- ALWAYS use Given/When/Then format for scenarios
- ALWAYS use RFC 2119 keywords (MUST, SHALL, SHOULD, MAY)
- Every requirement MUST have at least ONE scenario
- Include both happy path AND edge case scenarios
- **MODIFIED requirements MUST be the FULL block**
- **Size budget**: Spec artifact MUST be under 650 words
