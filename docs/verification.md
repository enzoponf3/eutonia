# Verification — How to prove the work works

> Golden rule: **the agent does not say "it works", it proves it**.
> Every feature ends with executable evidence, not claims.

## Verification levels

### Level 1 — Unit tests (mandatory)

Every public function in `src/` has at least one test in `tests/` that:

1. Covers the happy path.
2. Covers at least one error path if the function can fail.

Command:
```bash
```

## Anti-patterns (do not do)

- ❌ "I added the command, it should work." → missing executable test.
- ❌ A test that only verifies that the function does not throw an exception. → it must
  check the concrete result.
- ❌ Marking the feature as `done` without passing `./init.sh`.

## Final verification before closing

```bash
./init.sh           # must finish with [OK] Environment ready
```

If `./init.sh` is red, do **not** mark anything as `done`. Record the blocker
in `progress/current.md` with status `blocked` in `feature_list.json`.
