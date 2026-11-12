# Code conventions

> Extreme homogeneity. AI predicts better when the repository looks
> like itself everywhere.

## Style

- **Version:** ECMAScript 2016+.
- **Format:** PEP 8. Lines maximum 100 characters.
- **Imports:** stdlib first, then local. One line per module.
- **Strings:** double quotes `"..."` always. Single quotes only
  to escape double quotes inside.

## Naming

| Type                    | Convention        | Example               |
|-------------------------|-------------------|-----------------------|
| Modules                 | `snake_case`      | `notes.ts`            |
| Classes                 | `PascalCase`      | `Note`                |
| Functions / variables   | `snake_case`      | `load_notes`          |
| Constants               | `UPPER_SNAKE`     | `DEFAULT_NOTES_PATH`  |


## Tests

- One test file per module: `tests/test_<module>.ts`.
- One `Test<Thing>` class per logical unit.
- Descriptive test names: `test_load_returns_empty_when_file_missing`.

## Error handling

The CLI catches domain exceptions, prints the message to `stderr` and exits
with code 1. Never propagates stack traces to the user.

## Comments

By default they are **not** written. They are only allowed when they explain a
non-obvious *why* (e.g. documented workaround, subtle invariant). Names should
do the rest.
