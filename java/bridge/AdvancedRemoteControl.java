/**
 * 精确抽象（Refined Abstraction）：高级遥控器。
 * 在基础遥控器之上扩展了静音等高级功能，但依旧通过父类持有的 Device 桥接到具体设备，
 * 因此同一套高级功能可以直接套用在电视、收音机等任意 Device 实现上。
 */
public class AdvancedRemoteControl extends RemoteControl {
    private int volumeBeforeMute = -1;

    public AdvancedRemoteControl(Device device) {
        super(device);
    }

    public void mute() {
        if (volumeBeforeMute == -1) {
            volumeBeforeMute = device.getVolume();
            device.setVolume(0);
            System.out.println("[高级遥控器] " + device.getName() + " 已静音");
        } else {
            device.setVolume(volumeBeforeMute);
            volumeBeforeMute = -1;
            System.out.println("[高级遥控器] " + device.getName() + " 已取消静音");
        }
    }
}
