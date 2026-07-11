/**
 * 实现部分接口（Implementor）：设备。
 * 定义设备最基础的操作，具体由 Tv / Radio 等实现类完成。
 * 遥控器（Abstraction）只依赖这个接口，不关心具体是哪种设备。
 */
public interface Device {
    boolean isOn();

    void turnOn();

    void turnOff();

    int getVolume();

    void setVolume(int percent);

    String getName();
}
