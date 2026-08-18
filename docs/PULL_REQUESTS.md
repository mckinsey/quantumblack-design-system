# Pull requests

Use the same title format for PRs and commits.

## Title format

```
<type>(<scope>): <description>
```

- Lowercase description
- Scope optional for repo-wide changes (e.g. `chore: add @user to CODEOWNERS`)
- Keep it short — expand in the PR body

### Examples

```
fix(ci): hardcode registry URL in PR workflow
fix(badge): drop format prop, pill only
fix(input-group-demo): replace dangling icon imports with Icon component
refactor(icons): replace lucide-react with Material Symbols Icon
chore: add @user to CODEOWNERS
feat(icon-generator): introduction of icon generator
feat(card): add demo and code connect for cards
```

## Types

| Type | Use for |
| --- | --- |
| `feat` | New component, capability, or meaningful addition |
| `fix` | Bug or behavior correction |
| `chore` | Maintenance — `tidy`, `deps`, `docs` |
| `refactor` | Restructure without changing intent |
| `dev` | CI, QA, scripts, dev tooling |
| `docs` | Documentation only |
| `test` | Tests only |
| `style` | Formatting or styling only (rare) |
| `demo` | Demo-only changes (e.g. `demo(input): …`) |

## Scopes

Pick the narrowest scope that fits.

| Bucket | Examples |
| --- | --- |
| Meta / repo | `tidy`, `deps`, `deps-dev`, `dev`, `ci`, `qa`, `scripts`, `registry`, `docs` |
| Feature area | `code-connect`, `tokens`, `css`, `comp`, `ui`, `feat` |
| Component | `input`, `card`, `button-group`, `textarea`, `tag`, `form`, `dropdown`, `time-input`, … |
| Demo | `demo`, `input-group-demo`, … |

Component name for component work. Demo name for demo-only fixes.

## PR description

```markdown
## Summary
- Migrate `Input` from Radix to Base UI
- Align disabled/hover states with Figma via `--surface-*` tokens
- Add Code Connect mapping for the variant matrix
```

1–3 bullets. State what changed and why. No filler — drop hedging, throat-clearing, and restating the title.

### Examples

```markdown
## Summary
- Drop `format` prop on `Badge`; pill is the only shape
```

```markdown
## Summary
- Add `docs/PULL_REQUESTS.md`: `<type>(<scope>):` titles, type/scope tables, summary rules
- Link doc from `CLAUDE.md` pre-PR checklist
```
