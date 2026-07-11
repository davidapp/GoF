/**
 * 叶子节点（Leaf）：文件。没有子节点，getSize() 直接返回自身大小。
 */
public class File extends FileSystemComponent {
    private final long sizeInBytes;

    public File(String name, long sizeInBytes) {
        super(name);
        this.sizeInBytes = sizeInBytes;
    }

    @Override
    public long getSize() {
        return sizeInBytes;
    }

    @Override
    public void print(String prefix) {
        System.out.println(prefix + "- " + name + " (" + sizeInBytes + " B)");
    }
}
