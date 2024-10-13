import { Queue } from '../src/Queue';

let q: Queue<any>;
let arr: any[];

console.log(new Date().toLocaleString());

const testSize = 2 ** 22;

console.log('Test size: ' + testSize, `(2^${Math.log2(testSize)})`);

console.log('\n------- numbers -------');

// push
arr = new Array<number>();
console.time('push');
for (let i = 0; i < testSize; i++) {
  arr.push(i);
}
console.timeEnd('push');

// enqueue
q = new Queue<number>();
console.time('enqueue');
for (let i = 0; i < testSize; i++) {
  q.enqueue(i);
}
console.timeEnd('enqueue');
console.log('-------');

// pop
console.time('pop');
for (let i = 0; i < testSize; i++) {
  arr.pop();
}
console.timeEnd('pop');

// dequeue
console.time('dequeue');
for (let i = 0; i < testSize; i++) {
  q.dequeue();
}
console.timeEnd('dequeue');
console.log('-----------------------');

// strings
console.log('\n------- strings -------');
// push
arr = new Array<string>();
console.time('push');
for (let i = 0; i < testSize; i++) {
  arr.push('hi' + i);
}
console.timeEnd('push');

// enqueue
q = new Queue<string>();
console.time('enqueue');
for (let i = 0; i < testSize; i++) {
  q.enqueue('hi' + i);
}
console.timeEnd('enqueue');
console.log('-------');

// pop
console.time('pop');
for (let i = 0; i < testSize; i++) {
  arr.pop();
}
console.timeEnd('pop');

// dequeue
console.time('dequeue');
for (let i = 0; i < testSize; i++) {
  q.dequeue();
}
console.timeEnd('dequeue');
console.log('-----------------------');

// objects
console.log('\n------- objects -------');
// push
arr = new Array<object>();
console.time('push');
for (let i = 0; i < testSize; i++) {
  arr.push({ message: 'hi' + i });
}
console.timeEnd('push');

// enqueue
q = new Queue<object>();
console.time('enqueue');
for (let i = 0; i < testSize; i++) {
  q.enqueue({ message: 'hi' + i });
}
console.timeEnd('enqueue');
console.log('-------');

// pop
console.time('pop');
for (let i = 0; i < testSize; i++) {
  arr.pop();
}
console.timeEnd('pop');

// dequeue
console.time('dequeue');
for (let i = 0; i < testSize; i++) {
  q.dequeue();
}
console.timeEnd('dequeue');
console.log('-----------------------');
