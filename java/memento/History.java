import java.util.ArrayDeque;
import java.util.Deque;

/**
 * 管理者（Caretaker）：只负责保存和取出备忘录，绝不查看或修改其内容。
 * 因为 Memento 接口不暴露任何方法，History 即使想窥探内部状态也做不到，
 * 这正是备忘录模式“在不破坏封装性的前提下捕获并恢复对象状态”的关键。
 */
public class History {
    private final Deque<Memento> snapshots = new ArrayDeque<>();

    public void push(Memento memento) {
        snapshots.push(memento);
    }

    public Memento pop() {
        if (snapshots.isEmpty()) {
            throw new IllegalStateException("没有可恢复的历史记录");
        }
        return snapshots.pop();
    }

    public boolean isEmpty() {
        return snapshots.isEmpty();
    }
}
