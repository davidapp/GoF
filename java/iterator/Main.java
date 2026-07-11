import java.util.Iterator;

/**
 * 迭代器模式示例入口。
 * 场景：自定义 BookCollection，提供迭代器按顺序遍历其中的书籍。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 迭代器模式：遍历书籍集合 ===\n");

        BookCollection collection = new BookCollection();
        collection.addBook(new Book("设计模式", "GoF"));
        collection.addBook(new Book("重构", "Martin Fowler"));
        collection.addBook(new Book("代码整洁之道", "Robert C. Martin"));

        System.out.println("-- 用增强 for 循环遍历（底层由 iterator() 驱动）--");
        for (Book book : collection) {
            System.out.println("《" + book.title() + "》 —— " + book.author());
        }

        System.out.println("\n-- 显式获取迭代器，手动调用 hasNext()/next() --");
        Iterator<Book> it = collection.iterator();
        int index = 1;
        while (it.hasNext()) {
            Book book = it.next();
            System.out.println(index++ + ". 《" + book.title() + "》 —— " + book.author());
        }
    }
}
