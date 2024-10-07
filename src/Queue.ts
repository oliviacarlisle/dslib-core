/**
 * An simple, efficient queue implementation with O(1) enqueue
 * and amortized O(1) dequeue.
 *
 * @template T The type of elements held in the queue.
 */
export class Queue<T> {
  private _items: (T | undefined)[];
  private _headIndex: number;
  private readonly _resizeThreshold: number;

  /**
   * Creates a new Queue instance.
   *
   * @param {number} [resizeThreshold=32] The initial capacity of the queue.
   */
  constructor(resizeThreshold: number = 32) {
    this._resizeThreshold = Math.max(Math.floor(resizeThreshold), 32);
    this._items = [];
    this._headIndex = 0;
  }

  /**
   * Adds an item to the back of the queue.
   *
   * @param {T} item The item to add to the queue.
   */
  enqueue(item: T): void {
    this._items.push(item);
  }

  /**
   * Removes and returns the item at the front of the queue.
   *
   * @returns {T | undefined} The item at the front of the queue, or undefined if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) return;

    const item = this._items[this._headIndex];
    delete this._items[this._headIndex];
    this._headIndex++;

    // If we're using less than half the array, shift items to the front
    if (
      this.size >= 2 * this._resizeThreshold &&
      this._headIndex >= this._items.length / 2
    ) {
      this._shiftItems();
    }

    // Reset the queue when all items have been dequeued
    if (this._headIndex === this._items.length) {
      this._items = [];
      this._headIndex = 0;
    }

    return item;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   *
   * @returns {T | undefined} The item at the front of the queue, or undefined if the queue is empty.
   */
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this._items[this._headIndex];
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns {boolean} True if the queue is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns the number of items in the queue.
   *
   * @returns {number} The number of items in the queue.
   */
  get size(): number {
    return this._items.length - this._headIndex;
  }

  /**
   * Returns the internal size of the queue (including unused space)
   *
   * @returns {number} The internal size of the queue
   */
  get _internalSize(): number {
    return this._items.length;
  }

  /**
   * Removes all items from the queue.
   */
  clear(): void {
    this._items = [];
    this._headIndex = 0;
  }

  /**
   * Shifts items in place to the start of the array.
   * This helps save memory when headIndex becomes too large.
   *
   * @private
   */
  private _shiftItems(): void {
    this._items = this._items.slice(this._headIndex);
    this._headIndex = 0;
  }
}
