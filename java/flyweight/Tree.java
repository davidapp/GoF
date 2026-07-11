/**
 * 享元的使用者（Context）：代表森林中的一棵具体的树。
 * 只保存外在状态——坐标 (x, y)，内在状态（名称/颜色/纹理）通过共享的 TreeType 引用获得，
 * 不在每棵树对象里重复存储。
 */
public class Tree {
    private final int x;
    private final int y;
    private final TreeType type; // 共享的享元对象，多棵树可能指向同一个实例

    public Tree(int x, int y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void draw() {
        type.draw(x, y);
    }
}
