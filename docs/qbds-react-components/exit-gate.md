# exit_gate

Final verification before the component work is complete.

```bash
npm run lint && npm run typecheck && npm run test:unit && npm run registry:build && npm run figma:parse
```

- Fix until all five pass
- Triage individually when `&&` hides failures
- `npm run prettier:fix` for format
- Prop surface change → return to `api`, re-show prop list, continue forward

Ask before continuing when: Figma axis has no sensible React expression, sibling contradicts shadcn naming, export list exceeds closest shadcn sibling without Figma reason, or a new token is needed.
