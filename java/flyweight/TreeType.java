/**
 * 享元（Flyweight）：树的内在状态（name/color/texture）。
 * 大量 Tree 实例只要种类相同（如同为“松树/绿色/粗糙树皮”），就可以共享同一个 TreeType，
 * 从而避免为森林中成千上万棵树各自保存一份重复的名称、颜色、纹理数据。
 * 用 record 表达：天然不可变、自带 equals/hashCode/toString，很适合做共享对象。
 */
public record TreeType(String name, String color, String texture) {
    /** 内在状态由 TreeType 自己持有，外在状态（坐标）由调用方传入 */
    public void draw(int x, int y) {
        System.out.printf("在 (%d, %d) 绘制一棵【%s】，颜色=%s，纹理=%s%n", x, y, name, color, texture);
    }
}
