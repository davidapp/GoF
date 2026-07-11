/**
 * 子系统类（Subsystem）：功放。
 */
public class Amplifier {
    public void on() {
        System.out.println("[功放] 已开启");
    }

    public void setVolume(int level) {
        System.out.println("[功放] 音量设置为 " + level);
    }

    public void off() {
        System.out.println("[功放] 已关闭");
    }
}
