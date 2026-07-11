import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * 具体迭代器（Concrete Iterator）：按下标顺序遍历书籍列表。
 * 客户端只通过 hasNext()/next() 访问元素，感知不到内部到底是用 List、数组还是链表存储。
 */
public class BookIterator implements Iterator<Book> {
    private final List<Book> books;
    private int cursor = 0;

    public BookIterator(List<Book> books) {
        this.books = books;
    }

    @Override
    public boolean hasNext() {
        return cursor < books.size();
    }

    @Override
    public Book next() {
        if (!hasNext()) {
            throw new NoSuchElementException("已经遍历到最后一本书了");
        }
        return books.get(cursor++);
    }
}
