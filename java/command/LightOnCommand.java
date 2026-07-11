/**
 * 具体命令（Concrete Command）：开灯。
 * execute() 转发给接收者 Light，undo() 则执行相反操作。
 */
public class LightOnCommand implements Command {
    private final Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }

    @Override
    public void undo() {
        light.turnOff();
    }
}
