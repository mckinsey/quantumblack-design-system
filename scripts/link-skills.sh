#!/usr/bin/env bash
#
# Links the committed, tool-agnostic skills in `.agents/skills/` into each
# agent's local skills directory (`.cursor/skills/`, `.claude/skills/`).
#
# Those target dirs are git-ignored, so the canonical source lives once in
# `.agents/skills/` and every machine materializes the links locally. Runs
# automatically via the `prepare` script on `npm install`. Idempotent.
set -euo pipefail

SOURCE=".agents/skills"
TARGETS=(".cursor/skills" ".claude/skills")

[ -d "$SOURCE" ] || exit 0

count=0
for target in "${TARGETS[@]}"; do
  rm -rf "$target"
  mkdir -p "$target"
  for skill_path in "$SOURCE"/*/; do
    [ -d "$skill_path" ] || continue
    skill="$(basename "$skill_path")"
    ln -s "../../$SOURCE/$skill" "$target/$skill"
    count=$((count + 1))
  done
done

echo "Linked skills into ${#TARGETS[@]} agent dir(s) ($count link(s))."
