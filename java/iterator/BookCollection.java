import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 聚合（Aggregate）：书籍集合。
 * 实现 Iterable<Book> 后即可配合 Java 的增强 for 循环使用；
 * 内部具体用 List 存储只是实现细节，对外通过 iterator() 隐藏起来。
 */
public class BookCollection implements Iterable<Book> {
    private final List<Book> books = new ArrayList<>();

    public void addBook(Book book) {
        books.add(book);
    }

    public int size() {
        return books.size();
    }

    @Override
    public Iterator<Book> iterator() {
        return new BookIterator(books);
    }
}
