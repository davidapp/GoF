/**
 * 备忘录模式示例入口。
 * 场景：文本编辑器保存内容快照，支持 undo 恢复到之前的内容。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 备忘录模式：文本编辑器 undo ===\n");

        TextEditor editor = new TextEditor();
        History history = new History();

        editor.type("Hello");
        history.push(editor.save());

        editor.type(", World");
        history.push(editor.save());

        editor.type("!!! (typo)");
        System.out.println("当前内容: \"" + editor.getContent() + "\"");

        System.out.println("\n-- 撤销一步 --");
        editor.restore(history.pop());
        System.out.println("当前内容: \"" + editor.getContent() + "\"");

        System.out.println("\n-- 再撤销一步 --");
        editor.restore(history.pop());
        System.out.println("当前内容: \"" + editor.getContent() + "\"");
    }
}
