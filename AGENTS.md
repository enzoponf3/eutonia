AGENTS.md
> This file is the **entry point** for any agent that works on this repository. This is NOT  a rules bible: is a **map**. Read what you need only when you need it. (Progressive divulgation)

## 1. Before start (mandatory)

1. Run `./init.sh` and check there are not errors. If it fails, **stop** and fix the environment before coding.
2. Read `progress/current.md` to understand the last session state.
3. Read `feature_list.json` and pick **one** task in the `pending` state. Do not work in more than one at the time.

## 2. Repository map

| File / folder            | Contents                                              | When to read |
|------------------------------|-----------------------------------------------------------|---------------|
| `feature_list.json`          | Tasks list with states (pending / in_progress / done) | Always, at start |
| `progress/current.md`        | Current session state                                | Always, at start |
| `progress/history.md`        | Append-only binnacle from previous sessions             | If historic context is needed |
| `docs/architecture.md`       | The means of "make a good job" in this project    | Before implement |
| `docs/conventions.md`        | Style rules, names, structure                     | Before write code |
| `docs/verification.md`       | How to verify that your work works                    | Before change a task to `done`                        |
| `docs/comments.md`           | Static-friendly comments and alumni testimonials plan | Before implementing a comments section                |
| `CHECKPOINTS.md`             | objective criteria of "correct final state"            | For auto-evaluation |
| `.opencode/agents/`            | Subagents definitions (leader, implementer, reviewer) | If work is orchestrated |
| `src/`                       | Application code                                   | To implement |
| `tests/`                     | Automated tests                                         | For verification |

## 3. Hard rules (non negotiable)

- **One feature at the time.** Do not mix changes of multiples tasks in the same session.
- **Do not set a task to `done` without green tests.** Run `./init.sh` and make sure all the tests are 100% OK.
- **Document what you do** in `progress/current.md` while working, not at the end.
- **Leave the repository clean** before closing the session.
- **If you do not know something, search in `docs/`** before inventing it.

## 4. How to choose a task

```
1. Open feature_list.json
2. Filter by status == "pending"
3. Pick the lesser "id"
4. Change it's status to "in_progress" and save
5. Write in progress/current.md: feature, time of start and short plan
```

## 5. Session close (lifecycle)

Beforre closing:

1. Run `./init.sh` - All green.
2. If the task is done: change the `status: "done"` in `features_list.json`.
3. Move the summary from `progress/current.md` to the end of `progress/history.md`.
4. Empty `progress/current.md` leaving only the template.
5. Do not leave temp files, or debugging prints, or TODOs without context.

## 6. In case of blockage

- Re-read the relevant section from `docs/`.
- If the tools works unexpectedly, **do not invent a workaround**: Document the blockage in `progress/current.md` and stop the session.