import java.util.ArrayList;
import java.util.List;

/**
 * 享元模式示例入口。
 * 场景：森林中种植大量 Tree，它们共享同一份 TreeType（名称/颜色/纹理）内在状态，
 * 只有坐标这一外在状态各不相同。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 享元模式：森林种树 ===\n");

        List<Tree> forest = new ArrayList<>();

        System.out.println("开始种植 6 棵树：");
        plantTree(forest, 1, 1, "松树", "深绿色", "粗糙树皮");
        plantTree(forest, 2, 5, "松树", "深绿色", "粗糙树皮");
        plantTree(forest, 8, 3, "白桦树", "浅绿色", "光滑树皮");
        plantTree(forest, 3, 9, "松树", "深绿色", "粗糙树皮");
        plantTree(forest, 6, 2, "白桦树", "浅绿色", "光滑树皮");
        plantTree(forest, 9, 9, "枫树", "红色", "斑驳树皮");

        System.out.println("\n遍历整片森林并绘制：");
        for (Tree tree : forest) {
            tree.draw();
        }

        System.out.println("\n共种植 " + forest.size() + " 棵树，"
                + "但只创建了 " + TreeFactory.getCreatedTypeCount() + " 个 TreeType 共享对象");
    }

    private static void plantTree(List<Tree> forest, int x, int y,
                                   String name, String color, String texture) {
        TreeType type = TreeFactory.getTreeType(name, color, texture);
        forest.add(new Tree(x, y, type));
    }
}
