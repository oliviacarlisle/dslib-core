import { Queue } from '../src/core/Queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should create an empty queue', () => {
    expect(queue.size).toBe(1);
  });

  it('should enqueue elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);
    queue.enqueue(4);
    expect(queue.size).toBe(3);
  });

  it('should dequeue elements in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.size).toBe(2);
    expect(queue.dequeue()).toBe(2);
    expect(queue.size).toBe(1);
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

  it('should dynamically grow in size when full', () => {
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

  it('should dynamically shrink in size when less than 25% full', () => {
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

  it('should not decrease in size below the initial capacity', () => {
    const values = [32, 20, 60];
    for (const n of values) {
      queue = new Queue();
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
      expect(queue.internalSize).toBe(32); // unchanged internal size
    }
  });

  it('should correctly implement circular buffer logic', () => {
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
    queue.dequeue();
    queue.dequeue();
    for (let i = 100; i < testSize * 2; i++) {
      queue.enqueue(i);
    }
    expect(queue.size).toBe(198);
    for (let i = 2; i < testSize * 2; i++) {
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

  it('should be iterable', () => {
    for (let i = 0; i < 50; i++) {
      queue.enqueue(i);
    }
    let val = 0;
    for (const item of queue) {
      expect(item).toBe(val);
      val++;
    }
  });

  it('the .entries() method should yield tuples of elements and their indices', () => {
    for (let i = 0; i < 50; i++) {
      queue.enqueue(i + 1);
    }
    let val = 0;
    for (const [item, i] of queue.entries()) {
      expect(item).toBe(val + 1);
      expect(i).toBe(val);
      val++;
    }
  });

  it('should have a toString method', () => {
    queue.enqueue(3);
    queue.enqueue(5);
    queue.enqueue(7);
    expect(queue.toString()).toBe('Queue(3) { 3, 5, 7 }');
  });

  it('should have a forEach method', () => {
    queue.enqueue(3);
    queue.enqueue(5);
    queue.enqueue(7);
    const arr = [...queue];
    queue.forEach((value, index, q) => {
      expect(value).toBe(arr[index]);
      expect(q).toBe(queue);
    });

    expect(() => queue.forEach(3 as any)).toThrow();
  });

  it('should get an element by index', () => {
    queue.enqueue(3);
    queue.enqueue(5);
    queue.enqueue(7);
    expect(queue.get(-1)).toBeUndefined();
    expect(queue.get(3)).toBeUndefined();
    expect(queue.get(0)).toBe(3);
    expect(queue.get(1)).toBe(5);
    expect(queue.get(2)).toBe(7);
    expect(queue.get(2.5)).toBe(undefined);
  });
});
