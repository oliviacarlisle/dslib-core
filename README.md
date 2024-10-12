# mini-queue

A simple, efficient queue implementation in TypeScript.

## Data Structures

### Queue

A simple, efficient queue implementation with amortized O(1) operations, using a circular buffer.

The performance of the enqueue and dequeue methods is roughly similar to that of the built-in push and pop methods, respectively.

Preliminary benchmark results compared to built-in array method for 2^22 (approx. 4 million) calls to push/enqueue and pop/dequeue:

```
➜  ts-data-structures git:(main) ✗ tsx bench/Queue.bench
10/12/2024, 4:36:42 PM
Test size: 4194304 (2^22)

------- numbers -------
push: 26.275ms
enqueue: 32.855ms
-------
pop: 10.23ms
dequeue: 3.325ms
-----------------------

------- strings -------
push: 222.552ms
enqueue: 213.289ms
-------
pop: 9.376ms
dequeue: 3.198ms
-----------------------

------- objects -------
push: 225.531ms
enqueue: 320.968ms
-------
pop: 9.394ms
dequeue: 3.202ms
-----------------------
```

Benchmark script run on MacBook Pro (M3 Pro) using the following version of `tsx` and `node`:

```
➜  ts-data-structures git:(main) ✗ tsx --version
tsx v4.19.1
node v20.17.0
```
