import { Bench } from 'tinybench';
import { Queue } from '../src/index.js';

type BenchmarkType = Record<string, any>;

// Set up
let q = new Queue<BenchmarkType>();
let arr = new Array<BenchmarkType>();

let i = 0;

const resetCounter = () => {
  i = 0;
};

// Benchmark 1 - enqueue v push
const bench = new Bench();

bench
  .add(
    'enqueue',
    () => {
      q.enqueue({ count: i++ });
    },
    {
      beforeAll: resetCounter,
    },
  )
  .add(
    'push',
    () => {
      arr.push({ count: i++ });
    },
    {
      beforeAll: resetCounter,
    },
  );

await bench.warmup();
await bench.run();

console.table(bench.table());

// Benchmark 2 - pop v shift v dequeue

q = new Queue<BenchmarkType>();
arr = new Array<BenchmarkType>();
const inputSize = 2 ** 24; // approx 16m

const bench2 = new Bench({ time: 200 });

const fillArray = () => {
  arr = new Array<BenchmarkType>();
  for (let i = 0; i < inputSize; i++) {
    arr.push({ count: i++ });
  }
};

const fillQueue = () => {
  q = new Queue<BenchmarkType>();
  for (let i = 0; i < inputSize; i++) {
    q.enqueue({ count: i++ });
  }
};

bench2
  .add(
    'pop',
    () => {
      arr.pop();
    },
    {
      beforeAll: fillArray,
    },
  )
  .add(
    'shift',
    () => {
      arr.shift();
    },
    {
      beforeAll: fillArray,
    },
  )
  .add(
    'dequeue',
    () => {
      q.dequeue();
    },
    {
      beforeAll: fillQueue,
    },
  );

await bench2.warmup();
await bench2.run();

console.table(bench2.table());
