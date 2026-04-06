---
name: judgment-day
description: >
  Parallel adversarial review protocol that launches two independent blind judge sub-agents
  simultaneously to review the same target, synthesizes their findings, applies fixes,
  and re-judges until both pass or escalates after 2 iterations.
  Trigger: When user says "judgment day", "judgment-day", "review adversarial", "dual review".
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.4"
---

## When to Use

- User explicitly asks for "judgment day" or equivalent
- After significant implementations before merging
- When high-confidence review of code is needed
- When a single reviewer might miss edge cases

## Critical Patterns

### Pattern 0: Skill Resolution (BEFORE launching judges)

Follow the **Skill Resolver Protocol** (`_shared/skill-resolver.md`).

### Pattern 1: Parallel Blind Review

- Launch **TWO** sub-agents via `delegate` (async, parallel)
- Each agent receives the **same target** but works **independently**
- **Neither agent knows about the other**

### Pattern 2: Verdict Synthesis

```
Confirmed   → found by BOTH agents          → high confidence, fix immediately
Suspect A   → found ONLY by Judge A         → needs triage
Suspect B   → found ONLY by Judge B         → needs triage
Contradiction → agents DISAGREE              → flag for manual decision
```

### Pattern 3: Warning Classification

```
WARNING (real)        → Causes a bug in realistic production scenario. Fix required.
WARNING (theoretical) → Requires contrived scenario. Report but do NOT block.
```

### Pattern 4: Fix and Re-judge

1. If confirmed CRITICALs or real WARNINGs → delegate Fix Agent
2. After Fix Agent completes → re-launch both judges in parallel
3. After 2 fix iterations, if issues remain → present to user and ASK

## Decision Tree

```
User asks for "judgment day"
│
├── Target specific?
│   └── YES → continue, NO → ask user
│
Resolve skills (Pattern 0)
│
Launch Judge A + Judge B in parallel
│
Synthesize verdict
│
├── No issues? → JUDGMENT: APPROVED ✅
│
└── Issues found?
    ├── Present verdict to user
    ├── Ask: "Fix confirmed issues?"
    ├── YES → Fix Agent + re-judge
    └── NO → JUDGMENT: ESCALATED
```

## Sub-Agent Prompt Templates

### Judge Prompt (identical for both)

```
You are an adversarial code reviewer. Your ONLY job is to find problems.

## Target
{describe target: files, feature, architecture}

## Review Criteria
- Correctness: Does the code do what it claims?
- Edge cases: What inputs or states aren't handled?
- Error handling: Are errors caught and propagated?
- Performance: Any N+1 queries, inefficient loops?
- Security: Any injection risks, exposed secrets?
- Naming & conventions: Does it follow project patterns?

## Return Format
Each finding:
- Severity: CRITICAL | WARNING (real) | WARNING (theoretical) | SUGGESTION
- File: path/to/file.ext
- Description: What is wrong and why it matters
- Suggested fix: one-line description of the fix

If NO issues: VERDICT: CLEAN — No issues found.
```

### Fix Agent Prompt

```
You are a surgical fix agent. You apply ONLY the confirmed issues listed below.

## Confirmed Issues to Fix
{paste the confirmed findings table}

## Instructions
- Fix ONLY the confirmed issues listed
- Do NOT refactor beyond what is strictly needed
- Do NOT change code that was not flagged
- **Scope rule**: If you fix a pattern in one file, search for SAME pattern in ALL other files

Return: ## Fixes Applied
- [file:line] — {what was fixed}
```

## Blocking Rules (MANDATORY)

1. **MUST NOT** declare `JUDGMENT: APPROVED` until Round 1 judges return CLEAN, OR Round 2 judges confirm 0 CRITICALs + 0 confirmed real WARNINGs
2. **MUST NOT** run `git push`, `git commit` after fixes until re-judgment completes
3. **MUST NOT** tell user "done" until every JD reaches APPROVED or ESCALATED

## Output Format

```markdown
## Judgment Day — {target}

### Round {N} — Verdict
| Finding | Judge A | Judge B | Severity | Status |
|---------|---------|---------|----------|--------|
| Missing null check | ✅ | ✅ | CRITICAL | Confirmed |

### JUDGMENT: APPROVED ✅
Both judges pass clean. Target cleared for merge.
```

## Language

- Spanish input → Rioplatense: "Juicio iniciado", "Los jueces coinciden", "Juicio terminado — Aprobado"
- English input: "Judgment initiated", "Both judges agree", "Judgment complete — Approved"
