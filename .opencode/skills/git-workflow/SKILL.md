---
name: Git Workflow
description: Commit, branch and open pull requests in this repository using Conventional Commits and a clean history. Use before committing, creating a branch, or opening a PR.
---

# Git workflow

## Commits

Conventional Commits, one logical change per commit.

```text
<type>(<scope>): <imperative summary>

[optional body: why, not what]

[optional footer: BREAKING CHANGE / Refs #12]
```

| Type | Use for |
| --- | --- |
| `feat` | New user-visible behaviour |
| `fix` | Bug fix |
| `refactor` | Internal change, same behaviour |
| `style` | Formatting, no logic change |
| `perf` | Performance improvement |
| `docs` | Documentation only |
| `test` | Tests only |
| `build` | Dependencies, build config |
| `ci` | Pipelines |
| `chore` | Housekeeping |

Good: `feat(menu): add seasonal tasting menu card`
Good: `fix(reservations): keep form values after a validation error`
Bad: `update`, `fixes`, `WIP`, `final changes`

Summary is imperative, lowercase, no trailing period, ≤ 72 characters.

## Branches

`<type>/<short-kebab-slug>` off `main`:

```text
feat/reservation-form
fix/mobile-nav-overlap
chore/upgrade-next
```

Never commit directly to `main` on a shared repo. Keep branches short-lived; rebase on `main` before opening a PR.

## Before committing

```bash
npm run lint
npx tsc --noEmit
npm run build
git status          # review everything you are about to stage
git diff            # read your own diff
```

Never commit `.env*`, `node_modules`, build output, or editor droppings. Never commit secrets — a leaked key must be rotated, not just deleted.

## Staging

Stage deliberately:

```bash
git add src/app/menu/page.tsx src/components/menu-card.tsx
```

Avoid `git add -A` when the working tree holds unrelated edits.

## Pull requests

Title follows the commit convention. Body answers:

1. **What** changed and **why**.
2. **How** it was verified (commands run, pages checked, screenshots for UI).
3. **Risk** — migrations, env vars, cache implications.
4. **Follow-ups**, if any.

Keep PRs reviewable: under ~400 changed lines. Split refactors from features.

## Rewriting history

Rewriting is fine on your own branch before review; never rewrite `main` or a branch someone else is basing work on.

```bash
git commit --amend            # last commit, not yet pushed
git rebase -i main            # squash and reword before PR
git rebase origin/main        # update a branch
```

Use `git revert` for mistakes already on `main` — it keeps history honest.

## Checkpoints for agents

Before starting, `git status` must be clean or the user must know what is already modified. After finishing, summarise the diff rather than leaving the user to discover it.
