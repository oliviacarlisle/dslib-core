# TypeScript Data Structures

Production-ready simple and efficient implementations of common data structures in TypeScript.

To provide standardized solutions for data structures that do not exist natively in TypeScript, these implementations are inspired by Java's native implementations of corresponding data structures. However, for compatibility and ease-of-use, they still follow and prioritize TypeScript paradigms whenever applicable.

## Data structures implemented

### Queue

#### Implementation Overview

A simple and efficient queue implementation. The Queue class uses a single data structure (an array) for storing items without using a circular buffer (for simplicity). The queue lets the JavaScript engine handle array resizing for a growing queue--by using `Array.prototype.push()` for enqueues--which negates the need for a circular buffer.

#### Notes on Time Complexity

- `enqueue` method: `O(1)` time
- `dequeue` method: amortized `O(1)` time on average, `O(n)` in the worst case

#### Notes on Memory Management

To prevent the problem of an infinitely increasing `headIndex`, this Queue implementation automatically resets `headIndex` to 0 whenever the queue is empty, and dynamically shrinks the size of the internal array whenever its utilization ratio falls below 50%. This guarantees that memory requirements for a Queue--even one that frequently fluctuates in size--should never be more than twice the memory requirements for its underlying items at any point in time.

To improve memory management further for small queues, no resizes will take place when the size of the queue is less than the initial `resizeThreshold`, which has a default value of `32` and can be increased when invoking the Queue constructor.

To futher faciliate efficient memory management by the underlying JavaScript engine, this implementation makes use of the `delete` keyword on `dequeue`.
