#include "editor.h"
#include <iostream>

// 备忘录模式：History 只负责保管快照（对它而言是黑盒），
// 只有 TextEditor 自己知道如何创建/恢复快照，很好地保护了封装边界。
int main() {
    std::cout << "=== 备忘录模式：文本编辑器 undo ===\n" << std::endl;

    TextEditor editor;
    History history;

    editor.type("第一段内容。");
    history.push(editor.save());
    std::cout << "输入后: " << editor.content() << std::endl;

    editor.type("第二段内容。");
    history.push(editor.save());
    std::cout << "输入后: " << editor.content() << std::endl;

    editor.type("第三段内容（手滑写错了）。");
    std::cout << "输入后: " << editor.content() << std::endl;

    std::cout << "\n执行 undo..." << std::endl;
    if (auto memento = history.pop()) {
        editor.restore(*memento);
    }
    std::cout << "撤销后: " << editor.content() << std::endl;

    std::cout << "\n再次执行 undo..." << std::endl;
    if (auto memento = history.pop()) {
        editor.restore(*memento);
    }
    std::cout << "撤销后: " << editor.content() << std::endl;

    return 0;
}
