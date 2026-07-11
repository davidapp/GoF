/**
 * 抽象部分（Abstraction）：基础遥控器。
 * 持有一个 Device 引用——这就是“桥”，把控制请求转发给具体设备。
 * 遥控器的种类（基础/高级）与设备的种类（电视/收音机）从此可以独立变化、自由组合，
 * 不会出现“电视基础遥控器”“收音机基础遥控器”“电视高级遥控器”…… 这样的类爆炸。
 */
public class RemoteControl {
    protected final Device device;

    public RemoteControl(Device device) {
        this.device = device;
    }

    public void togglePower() {
        if (device.isOn()) {
            device.turnOff();
        } else {
            device.turnOn();
        }
    }

    public void volumeUp() {
        device.setVolume(device.getVolume() + 10);
    }

    public void volumeDown() {
        device.setVolume(device.getVolume() - 10);
    }
}
