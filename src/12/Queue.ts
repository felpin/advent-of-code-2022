type QueueNode<T> = {
  next?: QueueNode<T>;
  value: T;
};

export default class Queue<T> {
  private head?: QueueNode<T>;
  private tail?: QueueNode<T>;

  enqueue(item: T): void {
    const node: QueueNode<T> = { value: item };

    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  dequeue(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    const node = this.head;
    this.head = node.next;

    if (this.tail === node) {
      this.tail = undefined;
    }

    return node.value;
  }

  hasItem(): boolean {
    return this.head !== undefined;
  }
}
