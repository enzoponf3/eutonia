# Architecture — What "doing a good job" means

> This document defines the quality standard. Reviewer agents
> evaluate code against this file. If it is not here, it is not a requirement.

## Principles

1. **Clear layers.** The project uses screaming architecture


2. **Explicit errors.** Functions that can fail (id does not exist,
   corrupted file) throw named exceptions, they do not return `None`.

3. **Immutability by default.** Modifying = creating a new instance.
