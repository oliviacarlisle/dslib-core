/**
 * An simple, efficient queue implementation with amortized O(1) operations,
 * using a circular buffer.
 *
 * Dynamically resizes to manage memory usage.
 *
 * @template T The type of elements held in the queue.
 */
export class Queue<T> implements Iterable<T> {
  #buffer: (T | undefined)[];
  #head: number;
  #tail: number;
  #size: number;
  readonly #initialCapacity: number;

  /**
   * Creates a new Queue instance.
   *
   */
  constructor() {
    this.#initialCapacity = 32;
    this.#buffer = new Array(this.#initialCapacity);
    this.#head = 0;
    this.#tail = 0;
    this.#size = 0;
  }

  /**
   * Adds an item to the back of the queue.
   *
   * @param {T} item The item to add to the queue.
   * @returns {number} The new size of the queue.
   */
  enqueue(item: T): number {
    if (this.#size === this.#buffer.length) {
      this.#resize(this.#buffer.length * 2);
    }

    this.#buffer[this.#tail] = item;
    this.#tail = (this.#tail + 1) % this.#buffer.length;
    return ++this.#size;
  }

  /**
   * Removes and returns the item at the front of the queue.
   *
   * @returns {T | undefined} The item at the front of the queue, or undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this.#size === 0) return;

    const item = this.#buffer[this.#head];
    this.#buffer[this.#head] = undefined;
    this.#head = (this.#head + 1) % this.#buffer.length;
    this.#size--;

    if (
      this.#buffer.length >= this.#initialCapacity * 2 &&
      this.#size <= this.#buffer.length / 4
    ) {
      this.#resize(this.#buffer.length / 2);
    }

    return item as T;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   *
   * @returns {T | undefined} The item at the front of the queue, or undefined if the queue is empty.
   */
  peek(): T | undefined {
    return this.#size === 0 ? undefined : (this.#buffer[this.#head] as T);
  }

  /**
   * Returns the number of items in the queue.
   *
   * @returns {number} The number of items in the queue.
   */
  get size(): number {
    return this.#size;
  }

  /**
   * Returns the internal size of the queue.
   *
   * @returns {number} The internal size of the queue.
   */
  get internalSize(): number {
    return this.#buffer.length;
  }

  /**
   * Removes all items from the queue.
   */
  clear(): void {
    this.#buffer = new Array(this.#initialCapacity);
    this.#head = 0;
    this.#tail = 0;
    this.#size = 0;
  }

  /**
   * Resizes the queue
   *
   * @private
   * @param {number} newSize The new target size of the queue.
   */
  #resize(newSize: number): void {
    const newBuffer = new Array(newSize);
    for (let i = 0; i < this.#size; i++) {
      newBuffer[i] = this.#buffer[(this.#head + i) % this.#buffer.length];
    }
    this.#buffer = newBuffer;
    this.#head = 0;
    this.#tail = this.#size;
  }

  /**
   * Creates an iterator for the elements in the queue.
   * @generator
   * @yields {T} The next element in the queue.
   * @returns {Generator<T>} A generator that yields elements of type T.
   */
  *[Symbol.iterator](): Generator<T> {
    for (let i = 0; i < this.#size; i++) {
      yield this.#buffer[(this.#head + i) % this.#buffer.length] as T;
    }
  }

  /**
   * Creates an iterator for the elements in the queue.
   * @generator
   * @yields {[T, number]} A tuple containing the element and its index in the queue.
   * @returns {Generator<[T, number]>} A generator that yields tuples of elements of type T and their indices.
   */
  *entries(): Generator<[T, number]> {
    for (let i = 0; i < this.#size; i++) {
      yield [this.#buffer[(this.#head + i) % this.#buffer.length] as T, i];
    }
  }
}
