/**
 * 组件（Component）：文件系统节点的公共抽象。
 * File（叶子节点）与 Directory（组合节点）都继承它，
 * 客户端可以用完全相同的方式处理单个文件和整棵目录树。
 */
public abstract class FileSystemComponent {
    protected final String name;

    protected FileSystemComponent(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    /** 计算总大小（字节）：叶子返回自身大小，组合节点递归累加所有子节点 */
    public abstract long getSize();

    /** 以树形结构打印自身及子节点，prefix 控制当前层级的缩进 */
    public abstract void print(String prefix);
}
