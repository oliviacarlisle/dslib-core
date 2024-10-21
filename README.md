# core-dslib

[![codecov](https://codecov.io/gh/oliviacarlisle/core-dslib/graph/badge.svg?token=SVPFWK8OW9)](https://codecov.io/gh/oliviacarlisle/core-dslib)
[![Build Status](https://github.com/oliviacarlisle/core-dslib/actions/workflows/ci.yml/badge.svg)](https://github.com/oliviacarlisle/core-dslib/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A simple yet powerful data structures library for TypeScript and JavaScript projects.**

Designed for production environments and scalability, **core-dslib** is a developer's versatile toolbox for projects of any size. It provides essential data structures that enhance the capabilities of TypeScript and JavaScript, filling in the gaps left by the standard libraries.

> **Note:** Currently only compatible with ESM projects.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Data Structures](#data-structures)
  - [Queue](#queue)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package via npm:

```bash
npm install core-dslib
```

## Getting Started

Import using ESM syntax:

```typescript
import { Queue } from 'core-dslib';
```

Quick start example:

```typescript
const queue = new Queue<number>();
queue.enqueue(3);
console.log(queue.dequeue()); // Output: 3
```

## Data Structures

### Queue

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
import { Queue } from 'core-dslib';

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

**Performance:** Enqueue and dequeue methods offer performance comparable to the built-in array `push` and `pop` methods.

**Benchmark Results:**

- Tested with approximately 4 million (`2^22`) enqueue/dequeue operations.
- Demonstrated similar efficiency to native array methods under high load.

```bash
> npm run bench

Test size: 4194304 (2^22)

------- numbers -------
push: 25.385ms
enqueue: 31.665ms
-------
pop: 9.322ms
dequeue: 27.606ms
-----------------------

------- strings -------
push: 220.045ms
enqueue: 209.886ms
-------
pop: 9.557ms
dequeue: 23.174ms
-----------------------

------- objects -------
push: 195.094ms
enqueue: 307.915ms
-------
pop: 9.358ms
dequeue: 23.145ms
-----------------------
```

_Benchmarks conducted on a MacBook Pro (M3 Pro) using the following versions:_

```bash
> tsx --version

tsx v4.19.1
node v20.17.0
```

## Contributing

Contributions are welcome! If you have ideas, suggestions, or find any issues, please open an [issue](https://github.com/oliviacarlisle/core-dslib/issues) or submit a [pull request](https://github.com/oliviacarlisle/core-dslib/pulls).

### Development Setup

Clone the repository:

```bash
git clone https://github.com/oliviacarlisle/core-dslib.git
```

Install dependencies:

```bash
cd core-dslib
npm install
```

Run tests:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Feel free to reach out if you have any questions or need assistance!_
