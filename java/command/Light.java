/**
 * 接收者（Receiver）：真正知道如何执行“开灯/关灯”操作的对象。
 * 命令对象只是把对 Light 的调用包装起来，具体逻辑仍由 Light 自己完成。
 */
public class Light {
    private final String location;

    public Light(String location) {
        this.location = location;
    }

    public void turnOn() {
        System.out.println("[" + location + "灯] 已打开");
    }

    public void turnOff() {
        System.out.println("[" + location + "灯] 已关闭");
    }
}
