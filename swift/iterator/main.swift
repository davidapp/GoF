import Foundation

// 迭代器模式：自定义 BookCollection
// 场景：提供迭代器顺序遍历一组 Book

// MARK: - 聚合元素
struct Book {
    let title: String
    let author: String
}

// MARK: - 具体迭代器：实现标准库 IteratorProtocol，负责遍历状态与推进逻辑
struct BookIterator: IteratorProtocol {
    private let books: [Book]
    private var currentIndex = 0

    init(books: [Book]) {
        self.books = books
    }

    // 推进游标并返回下一个元素；遍历结束返回 nil
    mutating func next() -> Book? {
        guard currentIndex < books.count else { return nil }
        defer { currentIndex += 1 }
        return books[currentIndex]
    }
}

// MARK: - 聚合协议：实现 Sequence 即可使用 for-in、map、filter 等标准遍历方式
struct BookCollection: Sequence {
    private var books: [Book] = []

    mutating func addBook(_ book: Book) {
        books.append(book)
    }

    // 提供迭代器，隐藏内部存储细节（数组、链表等实现均可替换而不影响调用方）
    func makeIterator() -> BookIterator {
        BookIterator(books: books)
    }
}

// MARK: - 顶层入口
print("=== 迭代器模式：自定义 BookCollection ===\n")

var collection = BookCollection()
collection.addBook(Book(title: "设计模式", author: "GoF"))
collection.addBook(Book(title: "重构", author: "Martin Fowler"))
collection.addBook(Book(title: "代码整洁之道", author: "Robert C. Martin"))

print("使用 for-in 遍历（底层调用自定义迭代器）：")
for book in collection {
    print("  《\(book.title)》 — \(book.author)")
}

print("\n直接使用迭代器手动遍历：")
var iterator = collection.makeIterator()
while let book = iterator.next() {
    print("  《\(book.title)》 — \(book.author)")
}

print("\nSequence 协议赋予的额外能力（map / filter）：")
let titles = collection.map { $0.title }
print("  所有书名: \(titles)")
let byGoF = collection.filter { $0.author == "GoF" }
print("  作者为 GoF 的书: \(byGoF.map { $0.title })")
