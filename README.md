# dslib-core

[![npm version](https://img.shields.io/npm/v/dslib-core.svg)](https://www.npmjs.com/package/dslib-core)
[![npm release date](https://img.shields.io/github/release-date/oliviacarlisle/dslib-core)](https://www.npmjs.com/package/dslib-core)
[![Build Status](https://github.com/oliviacarlisle/dslib-core/actions/workflows/ci.yml/badge.svg)](https://github.com/oliviacarlisle/dslib-core/actions/)
[![codecov](https://codecov.io/gh/oliviacarlisle/dslib-core/graph/badge.svg?token=SVPFWK8OW9)](https://codecov.io/gh/oliviacarlisle/dslib-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![install size](https://packagephobia.com/badge?p=dslib-core)](https://packagephobia.com/result?p=dslib-core)
[![npm package minified size](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdeno.bundlejs.com%2F%3Fq%3Ddslib-core&query=size.uncompressedSize&label=minified%20size)](https://bundlejs.com/?q=dslib-core)
[![npm package minified gzipped size](https://img.shields.io/bundlejs/size/dslib-core)](https://bundlejs.com/?q=dslib-core)

A robust and efficient data structures library.

## ✨ Features

- 🧰 **Foundational**: Growing collection of essential data structures
- 🛡️ **Reliable**: Robust stability with 100% test coverage
- ⚡ **High-Performance**: Optimized for efficiency in demanding applications
- ⛰️ **Scalable**: Adaptable for projects of any size
- 🪶 **Lightweight**: Zero dependencies, keeping your project lean
- 🔷 **TypeScript Native**: Full type safety and intelligent code completion

## Table of Contents

- [💡 Why dslib-core?](#-why-dslib-core)
- [📦 Installation](#-installation)
- [🚀 Getting Started](#-getting-started)
- [🏗️ Data Structures](#%EF%B8%8F-data-structures)
  - [🔄 Queue](#-queue)
- [🌟 Contributing](#-contributing)
- [⚖️ License](#%EF%B8%8F-license)

## 💡 Why dslib-core?

`dslib-core` is your go-to toolkit for advanced data structures in TypeScript and JavaScript. It bridges the gap left by standard libraries, empowering developers with the tools they need for efficient data management and manipulation.

Whether you're building a complex algorithm or optimizing application performance, `dslib-core` provides the building blocks you need to succeed.

> **Note:** Currently only compatible with ESM projects.

## 📦 Installation

Install the package via npm:

```bash
npm install dslib-core
```

## 🚀 Getting Started

Import using ESM syntax:

```typescript
import { Queue } from 'dslib-core';
```

Quick start example:

```typescript
const queue = new Queue<number>();
queue.enqueue(3);
console.log(queue.dequeue()); // Output: 3
```

### 🚧 Using `dslib-core` in CommonJS Projects

`dslib-core` is primarily designed for ESM (ECMAScript Module) environments. However, you can still use it in CommonJS projects with a few adjustments.

To use `dslib-core` in a CommonJS project, we suggest using a dynamic `import()` within an async IIFE (Immediately Invoked Function Expression). Here's an example:

```typescript
// CommonJS project example
(async function () {
  const { Queue } = await import('dslib-core');

  // Your code here
  const queue = new Queue();
  queue.enqueue(1);
  console.log(queue.dequeue()); // Output: 1
})();
```

This approach allows you to use the ESM-native `dslib-core` package within your CommonJS environment while maintaining asynchronous module loading.

## 🏗️ Data Structures

### 🔄 Queue

Implemented using a circular buffer to ensure efficient enqueue and dequeue operations.

#### Features

- **Performance:** Enqueue and dequeue operations with amortized O(1) complexity.
- **Dynamic Resizing:** Automatically resizes to manage memory usage efficiently.
- **Iterable**: Implements the `Iterable` interface, allowing you to use the queue with `for...of` loops, spread (`...`) syntax and other iterable contexts.
- **Enhanced Runtime Privacy**: Leverages ES2022 private class fields (`#`) for robust encapsulation, ensuring data privacy during execution.
- **Type Safety:** Fully typed for TypeScript, ensuring type safety and IntelliSense support.
- **Versatility:** Suitable for handling numbers, strings, objects, and more.

#### Methods

- `enqueue(item: T): number`
  - Adds an item to the back of the queue.
  - **Time complexity:** amortized O(1).
  - **Parameters:**
    - `item: T` - The item to add to the queue.
  - **Returns**: The new size of the queue.
- `dequeue(): T | undefined`
  - Removes and returns the item at the front of the queue.
  - **Time complexity:** amortized O(1).
  - **Returns**: The item at the front of the queue, or `undefined` if the queue is empty.
- `peek(): T | undefined`
  - Returns the item at the front without removing it.
  - **Time complexity:** guaranteed O(1).
  - **Returns:** The item at the front of the queue, or `undefined` if the queue is empty.
- `get(index: number): T | undefined`
  - Retrieves the element at the specified index without removing it.
  - **Time complexity:** guaranteed O(1) for any index.
  - **Parameters:**
    - `index: number` - The zero-based index of the element to retrieve.
  - **Returns:** The item at the front of the queue, or `undefined` if the index is out of bounds.
- `size: number` _(Getter)_
  - Returns the number of items in the queue.
- `internalSize: number` _(Getter)_
  - Returns the internal capacity of the queue's buffer (useful for debugging or analysis).
- `clear(): void`
  - Removes all items from the queue.
- `[Symbol.iterator](): Iterator<T>`
  - Returns an iterator over the elements in the queue (allows for use with `for...of` loops and spread (`...`) syntax).
- `entries(): Iterator<[T, number]>`
  - Returns an iterator over the elements in the queue along with their indices.
  - **Yields:** Tuples of `[element, index]`.
- `toString(): string`
  - Returns a string representation of the queue.
  - **Format:** `Queue(size) { item1, item2, ... }`
- `forEach(callbackFn: (value: T, index: number, queue: Queue<T>) => void): void`
  - Executes a provided function once for each element in the queue.
  - **Parameters:**
    - `callbackFn` - Function to execute for each element, taking three arguments:
      - `value: T` - The current element being processed.
      - `index: number` - The index of the current element.
      - `queue: Queue<T>` - The queue object being traversed.

#### Example Usage

```typescript
import { Queue } from 'dslib-core';

const queue = new Queue<string>();

queue.enqueue('first');
queue.enqueue('second');
queue.enqueue('third');

console.log(queue.peek()); // Output: 'first'
console.log(queue.get(1)); // Output: 'second'
console.log(queue.size); // Output: 3

queue.forEach((value, index) => {
  console.log(`Index ${index}: ${value}`);
});
// Output:
// Index 0: first
// Index 1: second
// Index 2: third

for (const item of queue) {
  console.log(item);
}
// Output:
// first
// second
// third

for (const [item, i] of queue.entries()) {
  console.log(`Index ${i}: ${item}`);
}
// Output:
// Index 0: first
// Index 1: second
// Index 2: third

const arr = [...queue];
console.log(arr.length); // Output: 3

console.log(queue.dequeue()); // Output: 'first'
console.log(queue.size); // Output: 2

console.log(queue.toString()); // Output: 'Queue(2) { 'second', 'third' }'

queue.clear();
console.log(queue.size); // Output: 0
console.log(queue.dequeue()); // Output: undefined
```

#### Performance

**Performance:** `enqueue` and `dequeue` methods offer performance comparable to the built-in array `push` and `pop` methods.

**Benchmark Results:**

```bash
┌─────────┬───────────┬──────────────┬────────────────────┬───────────┬──────────┐
│ (index) │ Task Name │ ops/sec      │ Average Time (ns)  │ Margin    │ Samples  │
├─────────┼───────────┼──────────────┼────────────────────┼───────────┼──────────┤
│ 0       │ 'enqueue' │ '27,675,706' │ 36.132772689503845 │ '±14.28%' │ 13838019 │
│ 1       │ 'push'    │ '26,611,405' │ 37.5778722674608   │ '±9.86%'  │ 13665449 │
└─────────┴───────────┴──────────────┴────────────────────┴───────────┴──────────┘
┌─────────┬───────────┬──────────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name │ ops/sec      │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼───────────┼──────────────┼────────────────────┼──────────┼─────────┤
│ 0       │ 'pop'     │ '36,840,562' │ 27.143994127022697 │ '±0.93%' │ 7368113 │
│ 1       │ 'shift'   │ '797'        │ 1253180.9375000647 │ '±1.20%' │ 160     │
│ 2       │ 'dequeue' │ '33,964,152' │ 29.442807571542765 │ '±8.38%' │ 6792831 │
└─────────┴───────────┴──────────────┴────────────────────┴──────────┴─────────┘
```

- The first table compares the performance of the built-in `push` method (on an empty array) and the `enqueue` method (on an empty `Queue`). Benchmarks tasks run sequentially for 500ms each.
- The second table compares the performance of the built-in `pop` and `shift` methods, and the `dequeue` method. Each benchmark task starts with an array/queue (as applicable) of size `2^24` (approx. 16 million). Benchmarks tasks run sequentially for 200ms each.
- Demonstrates similar efficiency to native array methods under high load, with a massive improvement over the buit-in `shift` method.

> **_Note:_** The above benchmarks are run using items of type `object` in order to better simulate real-world scenarios. Using primitive data types like `string` or `number` would generally result in faster performance.

_Benchmarks conducted on 10/21/2024 using `tinybench` on a MacBook Pro (M3 Pro) using the following versions:_

```bash
> tsx --version

tsx v4.19.1
node v20.17.0
```

To benchmark with your setup, clone this repo and run:

```bash
npm install
npm run bench
```

## 🌟 Contributing

Contributions are welcome! If you have ideas, suggestions, or find any issues, please open an [issue](https://github.com/oliviacarlisle/dslib-core/issues) or submit a [pull request](https://github.com/oliviacarlisle/dslib-core/pulls).

### Development Setup

Clone the repository:

```bash
git clone https://github.com/oliviacarlisle/dslib-core.git
```

Install dependencies:

```bash
cd dslib-core
npm install
```

Run tests:

```bash
npm test
```

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Feel free to reach out if you have any questions or need assistance!_
