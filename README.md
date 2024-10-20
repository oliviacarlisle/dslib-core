# array-queue

A simple, efficient queue implementation using a circular buffer.

## Data Structures

### Queue

A simple, efficient queue implementation with amortized O(1) operations, using a circular buffer.

The performance of the enqueue and dequeue methods is roughly similar to that of the built-in push and pop methods, respectively.

Preliminary benchmark results compared to built-in array method for 2^22 (approx. 4 million) calls to push/enqueue and pop/dequeue:

```
> mini-queue@1.0.0 bench
> tsx bench/Queue.bench.ts

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

```
> tsx --version
tsx v4.19.1
node v20.17.0
```
