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
   * Returns the element at the specified index in the queue without removing it.
   *
   * @param {number} index - The index of the element to retrieve (0-based).
   * @returns {T | undefined} The element at the specified index, or undefined if the index is out of bounds.
   */
  get(index: number): T | undefined {
    if (typeof index !== 'number' || !Number.isInteger(index)) {
      return undefined;
    }

    if (index < 0 || index >= this.#size) {
      return undefined;
    }

    return this.#buffer[(this.#head + index) % this.#buffer.length] as T;
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
   *
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
   *
   * @generator
   * @yields {[T, number]} A tuple containing the element and its index in the queue.
   * @returns {Generator<[T, number]>} A generator that yields tuples of elements of type T and their indices.
   */
  *entries(): Generator<[T, number]> {
    for (let i = 0; i < this.#size; i++) {
      yield [this.#buffer[(this.#head + i) % this.#buffer.length] as T, i];
    }
  }

  /**
   * Returns a string representation of the queue.
   *
   * @returns {string} A string representation of the queue in the format:
   *                   "Queue(size) { item1, item2, ... }"
   */
  toString(): string {
    return `Queue(${this.size}) { ${[...this].join(', ')} }`;
  }

  /**
   * Executes a provided function once for each queue element.
   *
   * @param {function} callbackFn - Function to execute for each element, taking three arguments:
   * @param {T} callbackFn.value - The current element being processed in the queue.
   * @param {number} callbackFn.index - The index of the current element being processed in the queue.
   * @param {Queue<T>} callbackFn.queue - The queue object forEach() was called upon.
   *
   * @throws {TypeError} If callbackFn is not a function.
   */
  forEach(
    callbackFn: (value: T, index: number, queue: Queue<T>) => void,
  ): void {
    if (typeof callbackFn !== 'function') {
      throw new TypeError('callbackFn must be a function');
    }

    for (let i = 0; i < this.#size; i++) {
      const value = this.#buffer[(this.#head + i) % this.#buffer.length] as T;
      callbackFn(value, i, this);
    }
  }
}
