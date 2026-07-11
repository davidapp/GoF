package main

import (
	"errors"
	"fmt"
)

// EditorMemento 备忘录：保存文本编辑器某一时刻的状态，对外只读
type EditorMemento struct {
	content string
}

func (m *EditorMemento) Content() string {
	return m.content
}

// TextEditor 发起人：文本编辑器
type TextEditor struct {
	content string
}

func NewTextEditor() *TextEditor {
	return &TextEditor{}
}

func (e *TextEditor) Type(text string) {
	e.content += text
}

func (e *TextEditor) Content() string {
	return e.content
}

// Save 创建当前状态的快照（备忘录）
func (e *TextEditor) Save() *EditorMemento {
	return &EditorMemento{content: e.content}
}

// Restore 从备忘录恢复状态
func (e *TextEditor) Restore(m *EditorMemento) {
	e.content = m.Content()
}

// History 管理者：负责保存历史快照，只做保存与取出，不关心快照内部结构
type History struct {
	snapshots []*EditorMemento
}

func (h *History) Push(m *EditorMemento) {
	h.snapshots = append(h.snapshots, m)
}

// Pop 弹出最近一次快照；历史为空时返回 error 而非零值，调用方需显式处理
func (h *History) Pop() (*EditorMemento, error) {
	n := len(h.snapshots)
	if n == 0 {
		return nil, errors.New("没有可撤销的历史记录")
	}
	last := h.snapshots[n-1]
	h.snapshots = h.snapshots[:n-1]
	return last, nil
}

func main() {
	fmt.Println("=== 备忘录模式：文本编辑器 ===")

	editor := NewTextEditor()
	history := &History{}

	editor.Type("第一段内容。")
	history.Push(editor.Save())
	fmt.Println("当前内容:", editor.Content())

	editor.Type("第二段内容。")
	history.Push(editor.Save())
	fmt.Println("当前内容:", editor.Content())

	editor.Type("第三段内容（误操作）。")
	fmt.Println("当前内容:", editor.Content())

	fmt.Println("\n--- 撤销误操作 ---")
	if m, err := history.Pop(); err == nil {
		editor.Restore(m)
		fmt.Println("恢复后内容:", editor.Content())
	}

	fmt.Println("\n--- 再次撤销 ---")
	if m, err := history.Pop(); err == nil {
		editor.Restore(m)
		fmt.Println("恢复后内容:", editor.Content())
	}

	fmt.Println("\n--- 撤销次数过多 ---")
	if _, err := history.Pop(); err != nil {
		fmt.Println("撤销失败:", err)
	}
}
