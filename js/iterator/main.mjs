// ============================================================
// 迭代器模式（Iterator）
// 场景：自定义 BookCollection，提供迭代器顺序遍历
// ============================================================
// JS 惯用写法：实现 Symbol.iterator 协议，即可让自定义集合支持
// for...of、展开运算符、解构等所有原生迭代语法，无需暴露内部存储结构。

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  toString() {
    return `《${this.title}》— ${this.author}`;
  }
}

// ---- 聚合（Aggregate）：自定义集合，内部用数组存储，但对外隐藏实现细节 ----
class BookCollection {
  #books = [];

  addBook(book) {
    this.#books.push(book);
    return this;
  }

  get count() {
    return this.#books.length;
  }

  // 正序迭代器：实现标准迭代器协议 { next(): { value, done } }
  [Symbol.iterator]() {
    let index = 0;
    const books = this.#books;
    return {
      next() {
        if (index < books.length) {
          return { value: books[index++], done: false };
        }
        return { value: undefined, done: true };
      },
      // 迭代器本身也可迭代，方便在 for...of 中途 break 时正确释放资源
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  // 额外提供一个反序迭代器：生成器函数是实现迭代器协议最简洁的方式
  *reverseIterator() {
    for (let i = this.#books.length - 1; i >= 0; i--) {
      yield this.#books[i];
    }
  }
}

console.log('=== 迭代器模式：自定义图书集合的遍历 ===\n');

const shelf = new BookCollection()
  .addBook(new Book('设计模式', 'GoF'))
  .addBook(new Book('重构', 'Martin Fowler'))
  .addBook(new Book('代码整洁之道', 'Robert C. Martin'));

console.log(`-- 使用 for...of 正序遍历（共 ${shelf.count} 本）--`);
for (const book of shelf) {
  console.log(' ', book.toString());
}

console.log('\n-- 使用生成器提供的反序迭代器遍历 --');
for (const book of shelf.reverseIterator()) {
  console.log(' ', book.toString());
}

console.log('\n-- 因为实现了迭代器协议，天然支持展开运算符 --');
const titles = [...shelf].map((b) => b.title);
console.log('所有书名:', titles.join('、'));

console.log('\n-- 手动调用迭代器（不借助 for...of），演示协议本身 --');
const iterator = shelf[Symbol.iterator]();
let result = iterator.next();
while (!result.done) {
  console.log('  手动 next() 取得:', result.value.toString());
  result = iterator.next();
}
console.log('  迭代结束, done =', result.done);
