/**
 * 具体实现（Concrete Implementor）：收音机。
 */
public class Radio implements Device {
    private boolean on = false;
    private int volume = 50;

    @Override
    public boolean isOn() {
        return on;
    }

    @Override
    public void turnOn() {
        on = true;
        System.out.println("[收音机] 已开机，正在搜索频道");
    }

    @Override
    public void turnOff() {
        on = false;
        System.out.println("[收音机] 已关机");
    }

    @Override
    public int getVolume() {
        return volume;
    }

    @Override
    public void setVolume(int percent) {
        volume = Math.max(0, Math.min(100, percent));
        System.out.println("[收音机] 音量调整为 " + volume);
    }

    @Override
    public String getName() {
        return "收音机";
    }
}
