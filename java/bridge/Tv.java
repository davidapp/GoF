/**
 * 具体实现（Concrete Implementor）：电视。
 */
public class Tv implements Device {
    private boolean on = false;
    private int volume = 30;

    @Override
    public boolean isOn() {
        return on;
    }

    @Override
    public void turnOn() {
        on = true;
        System.out.println("[电视] 已开机");
    }

    @Override
    public void turnOff() {
        on = false;
        System.out.println("[电视] 已关机");
    }

    @Override
    public int getVolume() {
        return volume;
    }

    @Override
    public void setVolume(int percent) {
        volume = Math.max(0, Math.min(100, percent));
        System.out.println("[电视] 音量调整为 " + volume);
    }

    @Override
    public String getName() {
        return "电视";
    }
}
