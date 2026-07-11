/**
 * 桥接模式示例入口。
 * 场景：抽象 RemoteControl（basic/advanced）× 实现 Device（TV/Radio），
 * 两个维度可以自由组合、独立变化。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 桥接模式：遥控器与设备 ===\n");

        System.out.println("-- 基础遥控器 + 电视 --");
        RemoteControl basicForTv = new RemoteControl(new Tv());
        basicForTv.togglePower();
        basicForTv.volumeUp();

        System.out.println("\n-- 高级遥控器 + 收音机 --");
        AdvancedRemoteControl advancedForRadio = new AdvancedRemoteControl(new Radio());
        advancedForRadio.togglePower();
        advancedForRadio.volumeUp();
        advancedForRadio.mute();
        advancedForRadio.mute();

        System.out.println("\n-- 高级遥控器 + 电视（同一套高级功能换一个设备照样可用）--");
        AdvancedRemoteControl advancedForTv = new AdvancedRemoteControl(new Tv());
        advancedForTv.togglePower();
        advancedForTv.mute();
    }
}
