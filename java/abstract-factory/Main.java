/**
 * 抽象工厂模式示例入口。
 * 场景：跨平台 GUI —— 为 Windows / macOS 生产成套的 Button + Checkbox，
 * 保证同一产品族内的控件风格一致，且客户端代码无需感知具体平台。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 抽象工厂模式：跨平台 GUI 控件 ===\n");

        for (String os : new String[] {"windows", "mac"}) {
            // switch 表达式（Java 17）根据平台名称选择具体工厂
            GUIFactory factory = switch (os) {
                case "windows" -> new WindowsFactory();
                case "mac" -> new MacFactory();
                default -> throw new IllegalArgumentException("不支持的平台: " + os);
            };

            System.out.println("-- 当前平台: " + os + " --");
            var app = new Application(factory);
            app.renderUI();
            System.out.println();
        }
    }
}
