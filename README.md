# mini-queue

A simple, efficient queue implementation in TypeScript.

## Data Structures

### Queue

A simple, efficient queue implementation with amortized O(1) operations, using a circular buffer.

The performance of the enqueue and dequeue methods is roughly similar to that of the built-in push and pop methods, respectively.

Preliminary benchmark results compared to built-in array method for 2^22 (approx. 4 million) calls to push/enqueue and pop/dequeue:

```
> mini-queue@1.0.0 bench
> tsx bench/Queue.bench.ts

10/12/2024, 8:34:48 PM
Test size: 4194304 (2^22)

------- numbers -------
push: 25.811ms
enqueue: 32.191ms
-------
pop: 9.599ms
dequeue: 3.65ms
-----------------------

------- strings -------
push: 221.245ms
enqueue: 212.207ms
-------
pop: 9.457ms
dequeue: 3.406ms
-----------------------

------- objects -------
push: 221.957ms
enqueue: 319.909ms
-------
pop: 9.49ms
dequeue: 3.373ms
-----------------------
```

Benchmark script run on MacBook Pro (M3 Pro) using the following version of `tsx` and `node`:

```
> tsx --version
tsx v4.19.1
node v20.17.0
```
