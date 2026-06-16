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
  mkdir -p "$target"
  for skill_path in "$SOURCE"/*/; do
    [ -d "$skill_path" ] || continue
    skill="$(basename "$skill_path")"
    link="$target/$skill"
    rm -rf "$link"
    ln -s "../../$SOURCE/$skill" "$link"
    count=$((count + 1))
  done
done

echo "Linked skills into ${#TARGETS[@]} agent dir(s) ($count link(s))."
