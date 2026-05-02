# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-05-02

### Added

- `tokenEstimate()` — heuristic token count for quick before/after comparisons.
- 90% code coverage threshold enforcement in CI.
- Integration test suite covering full cleanup pipelines.

### Changed

- Promoted to stable `1.0.0` release after internal production validation.
- Standardized all error messages to `[meta-scalpel:<fn>]` prefix format.

## [0.5.0] — 2026-04-18

### Added

- `strip()` — recursive metadata key removal from JSON objects.
- `deep` option for controlling recursion depth in `strip()`.
- Immutability guarantee: original objects are never mutated.

### Fixed

- Array handling in `strip()` now correctly maps nested objects.

## [0.3.0] — 2026-03-28

### Added

- `normalize()` — line ending unification (CRLF → LF) and blank line collapsing.
- GitHub Actions CI workflow with Node 18/20/22 matrix testing.
- Vitest configuration with V8 coverage reporting.

### Changed

- Migrated test runner from `node --test` to Vitest.

## [0.2.0] — 2026-03-14

### Added

- TypeErrors with descriptive messages for all public functions.
- JSDoc annotations across all exported functions.
- `.gitignore` covering Node.js, coverage output, and OS files.

## [0.1.0] — 2026-02-28

### Added

- `trim()` — whitespace collapsing and edge trimming for raw text.
- Initial project scaffold: `package.json`, `README.md`, `LICENSE`.
- MIT License under `admin-masq`.

[1.0.0]: https://github.com/admin-masq/meta-scalpel/compare/v0.5.0...v1.0.0
[0.5.0]: https://github.com/admin-masq/meta-scalpel/compare/v0.3.0...v0.5.0
[0.3.0]: https://github.com/admin-masq/meta-scalpel/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/admin-masq/meta-scalpel/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/admin-masq/meta-scalpel/releases/tag/v0.1.0
