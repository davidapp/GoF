#pragma once
#include <memory>
#include <string>
#include <vector>

// 备忘录：保存文本编辑器某一时刻的状态，对外部只读、不暴露内部细节
class EditorMemento {
public:
    explicit EditorMemento(std::string content) : content_(std::move(content)) {}

private:
    friend class TextEditor;  // 只有发起人 TextEditor 能读取内部状态
    std::string content_;
};

// 发起人：文本编辑器，知道如何创建/恢复备忘录
class TextEditor {
public:
    void type(const std::string& text);
    const std::string& content() const { return content_; }

    std::unique_ptr<EditorMemento> save() const;
    void restore(const EditorMemento& memento);

private:
    std::string content_;
};

// 管理者：只负责保存/取出备忘录历史，不查看也不修改备忘录内部内容
class History {
public:
    void push(std::unique_ptr<EditorMemento> memento);
    std::unique_ptr<EditorMemento> pop();
    bool empty() const { return snapshots_.empty(); }

private:
    std::vector<std::unique_ptr<EditorMemento>> snapshots_;
};
