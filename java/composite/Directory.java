import java.util.ArrayList;
import java.util.List;

/**
 * 组合节点（Composite）：目录。持有一组子节点（File 或 Directory 均可），
 * getSize() 递归累加所有子节点的大小，print() 递归打印整棵子树。
 */
public class Directory extends FileSystemComponent {
    private final List<FileSystemComponent> children = new ArrayList<>();

    public Directory(String name) {
        super(name);
    }

    /** 添加子节点，返回 this 便于链式调用 */
    public Directory add(FileSystemComponent component) {
        children.add(component);
        return this;
    }

    public void remove(FileSystemComponent component) {
        children.remove(component);
    }

    @Override
    public long getSize() {
        long total = 0;
        for (FileSystemComponent child : children) {
            total += child.getSize(); // 递归：子节点可能又是一个 Directory
        }
        return total;
    }

    @Override
    public void print(String prefix) {
        System.out.println(prefix + "+ " + name + "/ (" + getSize() + " B)");
        for (FileSystemComponent child : children) {
            child.print(prefix + "  ");
        }
    }
}
