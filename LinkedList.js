class Node {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Додати елемент в початок списку
  addToFront(data) {
    const newNode = new Node(data, null, this.head);

    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }

    this.head = newNode;
    this.size++;
  }

  // Додати елемент в кінець списку
  addToEnd(data) {
    const newNode = new Node(data, this.tail, null);

    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  // Видалити перший елемент списку
  removeFirst() {
    if (!this.head) return;

    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this.size--;
  }

  // Видалити останній елемент списку
  removeLast() {
    if (!this.tail) return;

    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    this.size--;
  }

  // Перевірити чи існує заданий елемент в списку
  contains(data) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // Отримати елемент за індексом
  getByIndex(index) {
    if (index < 0 || index >= this.size) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.data;
  }

  // Вставити елемент за індексом
  insertAtIndex(index, data) {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      this.addToFront(data);
    } else if (index === this.size) {
      this.addToEnd(data);
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }

      const newNode = new Node(data, current, current.next);
      current.next.prev = newNode;
      current.next = newNode;

      this.size++;
    }
  }

  // Видалити елемент за індексом
  removeAtIndex(index) {
    if (index < 0 || index >= this.size) return;

    if (index === 0) {
      this.removeFirst();
    } else if (index === this.size - 1) {
      this.removeLast();
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }

      current.prev.next = current.next;
      current.next.prev = current.prev;

      this.size--;
    }
  }

  // Повернути найбільший елемент
  getMax() {
    if (!this.head) return null;

    let max = this.head.data;
    let current = this.head.next;

    while (current) {
      if (current.data > max) {
        max = current.data;
      }
      current = current.next;
    }

    return max;
  }

  // Повернути найменший елемент
  getMin() {
    if (!this.head) return null;

    let min = this.head.data;
    let current = this.head.next;

    while (current) {
      if (current.data < min) {
        min = current.data;
      }
      current = current.next;
    }

    return min;
  }

  // Отримати розмір списку
  getSize() {
    return this.size;
  }

  // Вивести елементи списку у форматі {[index:0; value:10] … [index:n; value:n]}
  printList() {
    let current = this.head;
    let result = '';

    while (current) {
      result += `[index:${this.indexOf(current.data)}; value:${current.data}] `;
      current = current.next;
    }

    return `{${result.trim()}}`;
  }

  // Додати множину елементів(масив) у вказане місце у списку(за індексом)
  addArrayAtIndex(index, array) {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      array.reverse().forEach((data) => this.addToFront(data));
    } else if (index === this.size) {
      array.forEach((data) => this.addToEnd(data));
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }

      array.forEach((data) => {
        const newNode = new Node(data, current, current.next);
        current.next.prev = newNode;
        current.next = newNode;

        current = newNode;
      });

      this.size += array.length;
    }
  }

  // Допоміжний метод для отримання індексу елемента
  indexOf(data) {
    let index = 0;
    let current = this.head;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }
}

// Приклад використання
const linkedList = new LinkedList();

linkedList.addToEnd(10);
linkedList.addToEnd(20);
linkedList.addToEnd(30);

console.log(linkedList.printList()); // { [index:0; value:10] [index:1; value:20] [index:2; value:30] }

linkedList.addToFront(5);
linkedList.addToFront(15);

console.log(linkedList.printList()); // { [index:0; value:15] [index:1; value:5] [index:2; value:10] [index:3; value:20] [index:4; value:30] }

linkedList.removeFirst();
linkedList.removeLast();

console.log(linkedList.printList()); // {[index:0; value:5] [index:1; value:10] [index:2; value:20]}

console.log(linkedList.contains(10)); // true
console.log(linkedList.contains(15)); // false

console.log(linkedList.getByIndex(1)); // 10

linkedList.insertAtIndex(1, 25);

console.log(linkedList.printList()); // {[index:0; value:5] [index:1; value:25] [index:2; value:10] [index:3; value:20]}

linkedList.removeAtIndex(2);

console.log(linkedList.printList()); // {[index:0; value:5] [index:1; value:25] [index:2; value:20]}

console.log(linkedList.getMax()); // 25
console.log(linkedList.getMin()); // 5

console.log(linkedList.getSize()); // 3

linkedList.addArrayAtIndex(1, [15, 30]);

console.log(linkedList.printList()); // {[index:0; value:5] [index:1; value:15] [index:2; value:30] [index:4; value:25] [index:5; value:20]}
