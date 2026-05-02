# 🔪 meta-scalpel

> **Surgical precision for AI token metadata.**  
> Strip, clean, and compress LLM context payloads — ruthlessly.

[![npm version](https://img.shields.io/npm/v/-meta-scalpel-v1?color=6ee7b7&style=flat-square)](https://www.npmjs.com/package/meta-scalpel-masq-v1)
[![license](https://img.shields.io/github/license/admin-masq/-meta-scalpel?color=a78bfa&style=flat-square)](https://github.com/admin-masq/-meta-scalpel/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/admin-masq/-meta-scalpel/pulls)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-blue?style=flat-square&logo=node.js)](https://nodejs.org)

---

## Why this exists

In an era of expansive context windows, every payload sent to an LLM carries invisible weight. Redundant whitespace, verbose JSON keys, duplicated boilerplate, and bloated metadata inflate costs, slow latency, and pollute context precision.

**meta-scalpel** was built to extract the essential.

It is a zero-dependency, zero-compromise utility that trims your AI token payloads down to their leanest possible form, without mutating your original data structures.

---

## Features

- ⚡ **Fast & Synchronous** — Stream-safe transforms without async overhead.
- 🧼 **Whitespace Normalization** — Collapses redundant spaces, tabs, and newlines.
- 🗑️ **Metadata Stripping** — Recursively removes internal keys and debug fields.
- 📦 **Zero Dependencies** — 100% native Node.js.
- 🔁 **Idempotent** — Consistent outputs on repeated executions.

---

## Installation

```bash
# via npm
npm install meta-scalpel-v1

# via yarn
yarn add meta-scalpel-v1
```

---

## Quick Start

```js
const { trim, strip, normalize, tokenEstimate } = require('meta-scalpel-v1');

// 1. Trim redundant whitespace
const cleanText = trim('  Hello,   world!  ');
// → 'Hello, world!'

// 2. Deep strip metadata from objects
const data = {
  content: "User message",
  _meta: { traceId: "123", timestamp: "2026-05-02" }
};
const leanPayload = strip(data, { keys: ['_meta'] });
// → { content: "User message" }

// 3. Normalize multi-line outputs
const normalized = normalize('Line one\n\n\n\nLine two');
// → 'Line one\n\nLine two'

// 4. Estimate Token Savings
const tokens = tokenEstimate(cleanText);
// → 3
```

---

## API Reference

### `trim(input: string): string`
Collapses redundant whitespace into single spaces and strips leading/trailing spaces.

### `normalize(input: string): string`
Normalizes line endings (`\r\n` to `\n`) and collapses 3+ consecutive blank lines into a single blank line.

### `strip(payload: object, options?: { keys?: string[], deep?: boolean }): object`
Recursively clones an object while omitting specified keys. Never mutates the original object.

### `tokenEstimate(text: string): number`
Provides a heuristic token estimate (~1.33 tokens per word) for quick metric evaluation.

---

## License

[MIT](./LICENSE) © 2026 admin-masq
