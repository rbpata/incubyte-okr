export class BlockingQueue<T> {
  private queue: T[] = [];
  private waiting: Array<(value: T) => void> = [];
  enqueue(item: T): void {
    console.log('hi enqueue');

    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift()!;
      resolve(item);
    } else {
      this.queue.push(item);
    }
  }

  dequeue(): Promise<T> {
    if (this.queue.length > 0) {
      return Promise.resolve(this.queue.shift()!);
    }
    return new Promise((resolve) => this.waiting.push(resolve));
  }

  getWaiting() {
    return this.waiting;
  }
}
