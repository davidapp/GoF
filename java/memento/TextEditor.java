/**
 * 发起人（Originator）：文本编辑器。
 * 能够把当前状态保存为一个备忘录（save），也能够用备忘录恢复到之前的状态（restore）。
 */
public class TextEditor {
    private StringBuilder content = new StringBuilder();

    public void type(String text) {
        content.append(text);
    }

    public String getContent() {
        return content.toString();
    }

    /** 创建当前内容的快照，返回类型是不透明的 Memento 接口 */
    public Memento save() {
        System.out.println("[TextEditor] 保存快照: \"" + content + "\"");
        return new Snapshot(content.toString());
    }

    /** 用备忘录恢复内容；只有 TextEditor 自己知道 Memento 底下真正的类型 */
    public void restore(Memento memento) {
        if (!(memento instanceof Snapshot snapshot)) {
            throw new IllegalArgumentException("非法的备忘录对象");
        }
        this.content = new StringBuilder(snapshot.content());
        System.out.println("[TextEditor] 恢复到快照: \"" + this.content + "\"");
    }

    /**
     * 具体备忘录：私有静态内部类。
     * 因为是 private 的，History 等外部类即使拿到 Memento 引用也无法感知它的真实类型，
     * 更无法调用 content()，只有外层 TextEditor 能通过下面的 instanceof 模式匹配访问。
     */
    private record Snapshot(String content) implements Memento {
    }
}
