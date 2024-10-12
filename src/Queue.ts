/**
 * An simple, efficient queue implementation with amortized O(1) operations,
 * using a circular buffer.
 *
 * Dynamically resizes to manage memory usage.
 *
 * @template T The type of elements held in the queue.
 */
export class Queue<T> {
  private _buffer: (T | undefined)[];
  private _head: number;
  private _tail: number;
  private _size: number;
  private readonly _initialCapacity: number;

  /**
   * Creates a new Queue instance.
   *
   * @param {number} [initialCapacity=32] The initial capacity of the queue.
   */
  constructor(initialCapacity: number = 32) {
    this._initialCapacity = initialCapacity
      ? Math.max(Math.floor(initialCapacity), 32)
      : 32;
    this._buffer = new Array(this._initialCapacity);
    this._head = 0;
    this._tail = 0;
    this._size = 0;
  }

  /**
   * Adds an item to the back of the queue.
   *
   * @param {T} item The item to add to the queue.
   * @returns {number} The new size of the queue.
   */
  enqueue(item: T): number {
    if (this._size === this._buffer.length) {
      this._resize(this._buffer.length * 2);
    }

    this._buffer[this._tail] = item;
    this._tail = (this._tail + 1) % this._buffer.length;
    return ++this._size;
  }

  /**
   * Removes and returns the item at the front of the queue.
   *
   * @returns {T | undefined} The item at the front of the queue, or undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this._size === 0) return;

    const item = this._buffer[this._head];
    this._buffer[this._head] = undefined;
    this._head = (this._head + 1) % this._buffer.length;
    this._size--;

    if (
      this._buffer.length >= this._initialCapacity * 2 &&
      this._size <= this._buffer.length / 4
    ) {
      this._resize(this._buffer.length / 2);
    }

    return item as T;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   *
   * @returns {T | undefined} The item at the front of the queue, or undefined if the queue is empty.
   */
  peek(): T | undefined {
    return this._size === 0 ? undefined : (this._buffer[this._head] as T);
  }

  /**
   * Returns the number of items in the queue.
   *
   * @returns {number} The number of items in the queue.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Returns the internal size of the queue.
   *
   * @returns {number} The internal size of the queue.
   */
  get internalSize(): number {
    return this._buffer.length;
  }

  /**
   * Removes all items from the queue.
   */
  clear(): void {
    this._buffer = new Array(this._initialCapacity);
    this._head = 0;
    this._tail = 0;
    this._size = 0;
  }

  /**
   * Resizes the queue
   *
   * @private
   * @param {number} newSize The new target size of the queue.
   */
  private _resize(newSize: number): void {
    const newBuffer = new Array(newSize);
    for (let i = 0; i < this._size; i++) {
      newBuffer[i] = this._buffer[(this._head + i) % this._buffer.length];
    }
    this._buffer = newBuffer;
    this._head = 0;
    this._tail = this._size;
  }
}
