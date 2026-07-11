#include "editor.h"

void TextEditor::type(const std::string& text) { content_ += text; }

std::unique_ptr<EditorMemento> TextEditor::save() const {
    return std::make_unique<EditorMemento>(content_);
}

void TextEditor::restore(const EditorMemento& memento) { content_ = memento.content_; }

void History::push(std::unique_ptr<EditorMemento> memento) { snapshots_.push_back(std::move(memento)); }

std::unique_ptr<EditorMemento> History::pop() {
    if (snapshots_.empty()) return nullptr;
    auto memento = std::move(snapshots_.back());
    snapshots_.pop_back();
    return memento;
}
