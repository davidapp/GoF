/**
 * 子系统类（Subsystem）：投影仪。
 */
public class Projector {
    public void on() {
        System.out.println("[投影仪] 已开启");
    }

    public void setInput(String source) {
        System.out.println("[投影仪] 切换输入源为 " + source);
    }

    public void off() {
        System.out.println("[投影仪] 已关闭");
    }
}
