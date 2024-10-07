import { Queue } from '../src/Queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should create an empty queue', () => {
    expect(queue.size).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  it('should enqueue elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);
    expect(queue.peek()).toBe(1);
  });

  it('should dequeue elements in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.size).toBe(0);
  });

  it('should return undefined when dequeuing from an empty queue', () => {
    expect(queue.dequeue()).toBeUndefined();
  });

  it('should peek at the front element without removing it', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    expect(queue.size).toBe(2);
  });

  it('should clear all elements from the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();
    expect(queue.size).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  it('should handle a large number of enqueues and dequeues', () => {
    const testSize = 10000;
    for (let i = 0; i < testSize; i++) {
      queue.enqueue(i);
    }
    expect(queue.size).toBe(testSize);
    for (let i = 0; i < testSize; i++) {
      expect(queue.dequeue()).toBe(i);
    }
    expect(queue.size).toBe(0);
  });

  it('should maintain FIFO order after resize operations', () => {
    const testSize = 100;
    for (let i = 0; i < testSize; i++) {
      queue.enqueue(i);
    }
    for (let i = 0; i < testSize; i++) {
      expect(queue.dequeue()).toBe(i);
    }
  });

  it('should handle edge cases with enqueue and dequeue operations', () => {
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(2);
    queue.enqueue(4);
    expect(queue.peek()).toBe(3);
    expect(queue.size).toBe(2);
  });
});
