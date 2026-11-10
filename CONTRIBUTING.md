# Small, verifiable contributions

## Task contract

Before editing, identify the requested outcome, affected files/callers, acceptance
check and exclusions. Keep one task active. Prefer a small vertical slice containing
behavior, tests and necessary docs, not disconnected code fragments.

Prefer 1–3 implementation files and about 150 changed implementation lines as a
review prompt, not a hard limit. Explain larger cohesive changes. Do not omit tests,
split a working feature into broken commits or create extra commits to meet a quota.
Existing prototype code must be described as imported/adapted, not new activity.

Keep local configuration, dependencies, generated output and private uploads out of
commits; see `.gitignore`. Ignore rules are not a security boundary: review staged
content even for allowed files such as `.env.example`, which must use placeholders.

## Branch and commit workflow

1. Read instructions; inspect `git status --short --branch`, `git log -1 --oneline`,
   `git diff --stat` and `git diff --cached --stat`. Preserve all pre-existing work.
2. For a clean checkout, fetch current remote refs when available and create a branch
   from the verified intended base: `docs/<task>`, `feat/<task>`, `fix/<task>`,
   `test/<task>` or `ci/<task>`. Do not reset or pull over dirty/unrelated work.
   If offline, state the local base and recheck the remote before pushing.
3. Make the smallest complete change. For a bug, reproduce it with a regression before
   fixing the root cause; check affected callers. Test the changed behavior narrowly.
4. Review the diff and run `git diff --check`. Stage explicit files or selected hunks;
   inspect `git diff --cached` and `git diff --cached --check` before committing.
5. Use conventional commits, for example `docs(agents): define delivery rules` or
   `fix(draft): reject unsupported facts`. Commit real completed units of work.
6. Push only with scoped authorization and only the selected branch, never `--all`,
   `--mirror` or force-push. Prefer a PR for integration; no direct feature commits to main.
7. Record the task, implementation, exact checks/results and known limits in the PR
   or handoff. Only a human owner can attest their own review. Merge/deploy needs approval.

No empty commits, falsified dates, concealed code imports, activity farming or rewriting
public history. Repository cleanliness must come from focused changes, not deleting WIP.

## Verification gates

| Change | Required evidence |
| --- | --- |
| Documentation | Diff review, valid local references, consistent instructions, diff check |
| Behavior | Focused positive/negative tests; regression for a bug; applicable static checks |
| Integration | Relevant API/render tests and one full suite at the integration milestone |
| AI workflow | Fixture checks; separately label live evaluator vs generator end-to-end evidence |
| Word/PDF deliverable | Render and visually inspect every page |

Check the actual package manifest and tests before selecting commands. Do not invent
`npm test` or CI success for a docs-only repository. A failed or unavailable check is
reported as such, never silently skipped or converted to pass. Avoid rerunning unchanged
full suites. Synthetic test data only; no paid model calls without a bounded approved task.

Generated text is a draft requiring human review, not legal advice or acceptance.
Never turn model support judgments into verified/released legal-source status.

## CI and CD rollout

These are requirements for future implementation, not claims of enabled automation:

- Add a small documentation check when its checker/tooling is selected and reviewed.
- Once application tooling is introduced, add lockfile installation, static checks and
  deterministic tests on push/PR. CI must use the same documented local commands.
- Use least-privilege read-only permissions by default, timeouts and isolated synthetic
  fixtures. Do not expose secrets to untrusted PR code or call paid providers in default CI.
- Verify that the checks fail for an intentionally invalid fixture/change and pass for
  valid input before describing them as gates. Do not add fake green/no-op tests.
- Branch protection and required checks are remote settings needing separate approval
  and readback verification. A workflow file alone does not enforce merge protection.
- CD is separate: approve target, credential handling, rollback and release gates first.
  Do not auto-deploy, auto-merge, publish releases or change repository visibility.

## Handoff

```text
Task and acceptance criteria:
Repo / branch / commit:
Changed files and outcome:
Checks: exact command -> result (or not run + reason):
Preserved WIP / limitations:
Remote actions and PR, if authorized:
Next single task:
```

For a weaker model, reduce the task's scope and give concrete acceptance criteria;
do not weaken validation. Ask for help on ambiguous ownership, contradictory requirements
or repeated unexplained failures. Do not change global model/plugin settings automatically.
