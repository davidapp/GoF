/**
 * 迭代器模式（Iterator）
 * 场景：自定义 BookCollection，提供迭代器顺序遍历。
 *
 * 核心思想：提供一种方法顺序访问聚合对象中的各个元素，
 * 又不暴露该对象的内部表示（数组、链表等）。
 *
 * 注：接口没有直接命名为 `Iterator`，是为了避免与 TypeScript 内置的
 * 全局 `Iterator<T>` 类型（ES2015 迭代协议）产生同名声明合并，
 * 两者在下方会分别展示：GoF 经典迭代器 vs. 原生可迭代协议（for...of）。
 */

// ---------- 聚合元素 ----------
interface Book {
  title: string;
  author: string;
}

// ---------- 抽象迭代器（Iterator）：GoF 经典风格，显式 hasNext/next ----------
interface CustomIterator<T> {
  hasNext(): boolean;
  next(): T;
}

// ---------- 抽象聚合（Aggregate） ----------
interface Aggregate<T> {
  createIterator(): CustomIterator<T>;
}

// ---------- 具体迭代器（Concrete Iterator） ----------
class BookIterator implements CustomIterator<Book> {
  private index = 0;

  constructor(private readonly books: readonly Book[]) {}

  hasNext(): boolean {
    return this.index < this.books.length;
  }

  next(): Book {
    if (!this.hasNext()) {
      throw new Error("已到达集合末尾，没有更多元素");
    }
    return this.books[this.index++]!;
  }
}

// ---------- 具体聚合（Concrete Aggregate） ----------
// 同时实现 TS 原生 Iterable 协议，使其也能直接用于 for...of / 展开运算符，
// 这是比“纯手写 hasNext/next”更贴近 TypeScript 惯用风格的做法。
class BookCollection implements Aggregate<Book>, Iterable<Book> {
  private readonly books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  get count(): number {
    return this.books.length;
  }

  // GoF 经典方式：返回一个显式的迭代器对象
  createIterator(): CustomIterator<Book> {
    return new BookIterator(this.books);
  }

  // 原生方式：实现 Symbol.iterator，桥接到语言内建的迭代协议
  [Symbol.iterator](): Iterator<Book> {
    let index = 0;
    const books = this.books;
    return {
      next(): IteratorResult<Book> {
        return index < books.length
          ? { value: books[index++]!, done: false }
          : { value: undefined, done: true };
      },
    };
  }
}

// ---------- 演示 ----------
function main(): void {
  const library = new BookCollection();
  library.addBook({ title: "设计模式", author: "GoF" });
  library.addBook({ title: "重构", author: "Martin Fowler" });
  library.addBook({ title: "代码整洁之道", author: "Robert C. Martin" });

  console.log("=== 使用 GoF 经典迭代器（hasNext / next）遍历 ===");
  const iterator = library.createIterator();
  while (iterator.hasNext()) {
    const book = iterator.next();
    console.log(`《${book.title}》 —— ${book.author}`);
  }

  console.log("\n=== 使用 TypeScript 原生 for...of 遍历（同一份数据） ===");
  for (const book of library) {
    console.log(`《${book.title}》 —— ${book.author}`);
  }

  console.log("\n=== 借助可迭代协议使用展开运算符 ===");
  const titles = [...library].map((b) => b.title);
  console.log("所有书名:", titles.join("、"));
  console.log("藏书总数:", library.count);
}

main();
