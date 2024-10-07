# TypeScript Data Structures

Production-ready simple and efficient implementations of common data structures in TypeScript.

To provide standardized solutions for data structures that do not exist natively in TypeScript, these implementations are inspired by Java's native implementations of corresponding data structures. However, for compatibility and ease-of-use, they still follow and prioritize TypeScript paradigms whenever applicable.

## Data structures implemented

### Queue

A simple and efficient queue implementation with O(1) enqueue and amortized O(1) dequeue. The Queue class uses a single data structure (an array) for storing items and does not use a circular buffer (for simplicity). The queue lets the JavaScript engine handle array resizing for a growing queue--by using `Array.prototype.push()` for enqueues--which negates the need for a circular buffer. To prevent the problem of an infinitely increasing `headIndex`, it automatically resets `headIndex` to 0 whenever the queue is empty, and dynamically shrinks the size of the internal array whenever its utilization ratio falls below 50%. To improve memory management further for small queues, no resizes will take place when the size of the queue is less than the initial `resizeThreshold`. To futher faciliate efficient memory management by the underlying JavaScript engine, this implementation makes use of the `delete` keyword on dequeue.
