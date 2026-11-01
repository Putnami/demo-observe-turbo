# demo-observe-turbo

A Node monorepo on Turborepo and pnpm that Putnami observes from the outside.
It keeps its own CI on GitHub Actions and emits standard reports.

| Package | Path | Depends on |
| --- | --- | --- |
| `@demo/pricing` | `packages/pricing/` | `zod` |
| `@demo/api` | `apps/api/` | `@demo/pricing` |

## CI

`.github/workflows/ci.yml` runs `turbo run build` and `turbo run test`. Each
package writes, with Vitest:

- `reports/junit.xml`: JUnit test results;
- `reports/coverage/lcov.info`: LCOV coverage.

On `main`, the `publish` job packs `@demo/pricing` and uploads the tarball as
an artifact.

## Run locally

```bash
pnpm install
pnpm build
pnpm test
PORT=8080 pnpm --filter @demo/api start
```
