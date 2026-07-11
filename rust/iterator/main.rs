// 迭代器模式（Iterator）—— BookCollection 演示
//
// 最地道的 Rust 写法是直接为自定义迭代器实现标准库的 `Iterator`
// trait：这样不仅能用 for 循环遍历，还能免费获得 map/filter/count
// 等一整套迭代器适配器，无需自己再造一套“hasNext/next”接口。

// 聚合元素
struct Book {
    title: String,
    author: String,
}

// 聚合：书籍集合，内部存储对调用者隐藏
struct BookCollection {
    books: Vec<Book>,
}

impl BookCollection {
    fn new() -> Self {
        BookCollection { books: Vec::new() }
    }

    fn add(&mut self, title: &str, author: &str) {
        self.books.push(Book { title: title.to_string(), author: author.to_string() });
    }

    // 提供一个具体迭代器，按加入顺序遍历，不暴露内部 Vec
    fn iter(&self) -> BookIterator<'_> {
        BookIterator { books: &self.books, index: 0 }
    }
}

// 具体迭代器：持有集合的借用与当前遍历位置
struct BookIterator<'a> {
    books: &'a [Book],
    index: usize,
}

impl<'a> Iterator for BookIterator<'a> {
    type Item = &'a Book;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index < self.books.len() {
            let book = &self.books[self.index];
            self.index += 1;
            Some(book)
        } else {
            None
        }
    }
}

fn main() {
    println!("=== 迭代器模式：BookCollection 演示 ===\n");

    let mut collection = BookCollection::new();
    collection.add("三体", "刘慈欣");
    collection.add("百年孤独", "加西亚·马尔克斯");
    collection.add("小王子", "圣埃克苏佩里");
    collection.add("球状闪电", "刘慈欣");

    println!("按加入顺序遍历：");
    for book in collection.iter() {
        println!("  《{}》 —— {}", book.title, book.author);
    }

    // 实现了标准 Iterator trait 后，可以直接复用其适配器方法
    println!("\n只看作者包含“刘”的书：");
    for book in collection.iter().filter(|b| b.author.contains('刘')) {
        println!("  《{}》 —— {}", book.title, book.author);
    }

    println!("\n书籍总数: {}", collection.iter().count());
}
