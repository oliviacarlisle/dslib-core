[![Coverage Status](https://coveralls.io/repos/github/oliviacarlisle/core-dslib/badge.svg?branch=main)](https://coveralls.io/github/oliviacarlisle/core-dslib?branch=main)

# core-dslib

**A simple yet powerful data structures library for TypeScript and JavaScript projects.**

Designed for production environments and scalability, **core-dslib** is a developer's versatile toolbox for projects of any size. It provides essential data structures that enhance the capabilities of TypeScript and JavaScript, filling in the gaps left by the standard libraries.

Note: currently only compatible with ESM projects.

## Getting Started

Install:

```bash
npm i core-dslib
```

Quick start example:

```typescript
import { Queue } from 'core-dslib';

const queue = new Queue<number>();

queue.enqueue(3);

console.log(queue.dequeue()); // 3
```

## Data Structures

### Queue

**Amortized O(1) Operations:** Utilizes a circular buffer to ensure efficient enqueue and dequeue operations.

**Performance:** Enqueue and dequeue methods offer performance comparable to the built-in array `push` and `pop` methods.

**Benchmark Results:**

- Tested with approximately 4 million (`2^22`) calls to enqueue/dequeue.
- Demonstrated similar efficiency to native array methods in high-load scenarios.

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

Benchmark script run on MacBook Pro (M3 Pro) using the following version of `tsx` and `node`:

```bash
> tsx --version

tsx v4.19.1
node v20.17.0
```
