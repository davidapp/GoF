import java.util.ArrayDeque;
import java.util.Deque;

/**
 * 调用者（Invoker）：遥控器。
 * 按下按钮时只调用 Command.execute()，不知道具体是哪种命令；
 * 同时维护一个历史栈，支持按下“撤销”按钮时回退最近一次操作。
 */
public class RemoteControl {
    private final Deque<Command> history = new ArrayDeque<>();

    public void pressButton(Command command) {
        command.execute();
        history.push(command);
    }

    public void pressUndo() {
        if (history.isEmpty()) {
            System.out.println("[遥控器] 没有可撤销的操作");
            return;
        }
        Command last = history.pop();
        System.out.println("[遥控器] 撤销上一步操作");
        last.undo();
    }
}
