import java.util.HashMap;
import java.util.Map;

/**
 * 原型模式示例入口。
 * 场景：克隆 Shape（Circle/Rectangle），复制其颜色、位置等属性，
 * 修改克隆体不影响原型；同时演示一个简单的“原型注册表”用法。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 原型模式：克隆图形 ===\n");

        Shape originalCircle = new Circle(10, 10, "红色", 5);
        System.out.println("原始圆形     : " + originalCircle.describe());

        Shape clonedCircle = originalCircle.copy();
        clonedCircle.moveTo(100, 100);
        clonedCircle.setColor("蓝色");
        System.out.println("克隆并修改后 : " + clonedCircle.describe());
        System.out.println("原始圆形不变 : " + originalCircle.describe());

        System.out.println();

        Shape originalRect = new Rectangle(0, 0, "黑色", 20, 10);
        Shape clonedRect = originalRect.copy();
        clonedRect.setColor("黄色");
        System.out.println("原始矩形     : " + originalRect.describe());
        System.out.println("克隆并修改后 : " + clonedRect.describe());

        System.out.println("\n=== 原型注册表：预先配置好的模板可直接克隆复用 ===");
        Map<String, Shape> registry = new HashMap<>();
        registry.put("默认红圆", new Circle(0, 0, "红色", 1));
        registry.put("默认黑框矩形", new Rectangle(0, 0, "黑色", 4, 3));

        Shape stamp1 = registry.get("默认红圆").copy();
        stamp1.moveTo(50, 60);
        System.out.println("从注册表克隆 : " + stamp1.describe());
    }
}
