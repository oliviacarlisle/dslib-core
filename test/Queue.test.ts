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

  it('should dynamically increase in size', () => {
    // enqueue 32 items
    for (let i = 0; i < 32; i++) {
      queue.enqueue(i);
    }
    expect(queue.size).toBe(32);
    expect(queue.internalSize).toBe(32);

    // enqueue a 33rd item
    queue.enqueue(32);
    expect(queue.size).toBe(33);
    expect(queue.internalSize).toBe(64); // internal size should be doubled
  });

  it('should dynamically decrease in size', () => {
    // enqueue 60 items
    for (let i = 0; i < 60; i++) {
      queue.enqueue(i);
    }
    expect(queue.size).toBe(60);
    expect(queue.internalSize).toBe(64);

    // dequeue 43 items (17 left)
    for (let i = 0; i < 43; i++) {
      queue.dequeue();
    }
    expect(queue.size).toBe(17);
    expect(queue.internalSize).toBe(64); // unchanged internal size

    // dequeue so that 16 elements are left (25% utilization)
    queue.dequeue();
    expect(queue.size).toBe(16);
    expect(queue.internalSize).toBe(32); // unchanged internal size
  });

  it('should accept initialCapacity argument greater than 32', () => {
    queue = new Queue(60);
    expect(queue.size).toBe(0);
    expect(queue.internalSize).toBe(60);

    queue = new Queue(55);
    expect(queue.size).toBe(0);
    expect(queue.internalSize).toBe(55);
  });

  it('the initial capacity should never be less than 32', () => {
    queue = new Queue(16);
    expect(queue.size).toBe(0);
    expect(queue.internalSize).toBe(32);

    queue = new Queue(30);
    expect(queue.size).toBe(0);
    expect(queue.internalSize).toBe(32);
  });

  it('should not decrease in size below the initial capacity', () => {
    const values = [32, 20, 60];
    for (const n of values) {
      queue = new Queue(n);
      // enqueue n items
      for (let i = 0; i < n; i++) {
        queue.enqueue(i);
      }
      expect(queue.size).toBe(n);

      // dequeue n - 2 items
      for (let i = 0; i < n - 2; i++) {
        queue.dequeue();
      }
      expect(queue.size).toBe(2);
      expect(queue.internalSize).toBe(Math.max(n, 32)); // unchanged internal size
    }
  });

  it('should handle circular logic correctly', () => {
    for (let i = 0; i < 32; i++) {
      queue.enqueue(i);
    }
    expect(queue.size).toBe(32);
    expect(queue.internalSize).toBe(32);
    for (let i = 0; i < 20; i++) {
      queue.dequeue();
    }
    expect(queue.size).toBe(12);
    expect(queue.internalSize).toBe(32);
    for (let i = 0; i < 20; i++) {
      queue.enqueue(i);
    }
    expect(queue.size).toBe(32);
    expect(queue.internalSize).toBe(32);
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

  it('should handle a large number of enqueues and dequeues', () => {
    const testSize = 2 ** 20;
    for (let i = 0; i < testSize; i++) {
      queue.enqueue(i);
    }
    expect(queue.size).toBe(testSize);
    expect(queue.internalSize).toBe(testSize);
    for (let i = 0; i < testSize; i++) {
      queue.dequeue();
    }
    expect(queue.size).toBe(0);
    expect(queue.internalSize).toBe(32);
  });
});
