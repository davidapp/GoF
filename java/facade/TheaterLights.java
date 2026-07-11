/**
 * 子系统类（Subsystem）：灯光。
 */
public class TheaterLights {
    public void dim(int percent) {
        System.out.println("[灯光] 调暗至 " + percent + "%");
    }

    public void on() {
        System.out.println("[灯光] 恢复全亮");
    }
}
