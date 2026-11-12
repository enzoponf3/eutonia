#!/usr/bin/env bash
# Environment gate for the eutonia project.
# Checks the toolchain, installs dependencies if needed and runs the test suite.
# Exit code 0 means the project is ready to work on.

set -uo pipefail

cd "$(dirname "$0")" || exit 1

failures=0
pass() { printf '[OK]   %s\n' "$1"; }
fail() { printf '[FAIL] %s\n' "$1"; failures=$((failures + 1)); }
info() { printf '[info] %s\n' "$1"; }

echo "== Toolchain =="

if command -v node >/dev/null 2>&1; then
  node_version="$(node --version 2>/dev/null | sed 's/^v//')"
  node_major="${node_version%%.*}"
  if [ "${node_major:-0}" -ge 18 ] 2>/dev/null; then
    pass "node installed (v${node_version})"
  else
    fail "node >= 18 required (found v${node_version:-unknown})"
  fi
else
  fail "node is not installed or not in PATH"
fi

if command -v npm >/dev/null 2>&1; then
  pass "npm installed ($(npm --version 2>/dev/null))"
else
  fail "npm is not installed or not in PATH"
fi

if command -v npx >/dev/null 2>&1; then
  pass "npx installed"
else
  fail "npx is not installed or not in PATH"
fi

echo
echo "== Project files =="

if [ -f package.json ]; then
  pass "package.json found"
else
  fail "package.json not found (dependencies and test script are not defined)"
fi

if node -e 'JSON.parse(require("fs").readFileSync("feature_list.json", "utf8"))' >/dev/null 2>&1; then
  pass "feature_list.json is valid JSON"
else
  fail "feature_list.json is missing or invalid JSON"
fi

if [ -f progress/current.md ]; then
  pass "progress/current.md found"
else
  fail "progress/current.md not found"
fi

echo
echo "== Dependencies =="

if [ -f package.json ]; then
  if [ -d node_modules ]; then
    pass "node_modules already present"
  else
    info "node_modules missing, running npm install..."
    if npm install; then
      pass "dependencies installed"
    else
      fail "npm install failed"
    fi
  fi
else
  info "skipping install (no package.json)"
fi

echo
echo "== Tests (vitest) =="

if [ -f package.json ] && [ -x node_modules/.bin/vitest ]; then
  pass "vitest available"
  if node_modules/.bin/vitest run; then
    pass "vitest suite passed"
  else
    fail "vitest suite failed"
  fi
else
  fail "cannot run vitest (missing package.json or vitest devDependency)"
fi

echo
if [ "$failures" -eq 0 ]; then
  echo "All checks passed."
  exit 0
fi

echo "$failures check(s) failed."
exit 1
