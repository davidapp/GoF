/**
 * 命令模式示例入口。
 * 场景：遥控器控制 LightOn/LightOff 命令，并支持撤销（undo）。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 命令模式：遥控器控制灯光 ===\n");

        Light livingRoomLight = new Light("客厅");
        Command lightOn = new LightOnCommand(livingRoomLight);
        Command lightOff = new LightOffCommand(livingRoomLight);

        RemoteControl remote = new RemoteControl();

        System.out.println("-- 按下开灯按钮 --");
        remote.pressButton(lightOn);

        System.out.println("-- 按下关灯按钮 --");
        remote.pressButton(lightOff);

        System.out.println("-- 按下撤销按钮（应重新开灯）--");
        remote.pressUndo();

        System.out.println("-- 再按一次撤销按钮（应重新关灯）--");
        remote.pressUndo();

        System.out.println("-- 再按一次撤销按钮（历史已空）--");
        remote.pressUndo();
    }
}
