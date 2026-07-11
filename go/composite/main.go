package main

import (
	"fmt"
	"strings"
)

// 组件接口：文件与目录的统一抽象，客户端无需区分叶子节点还是容器节点
type FileSystemNode interface {
	Name() string
	Size() int64
	Print(indent string)
}

// 叶子节点：文件
type File struct {
	name string
	size int64
}

func NewFile(name string, size int64) *File {
	return &File{name: name, size: size}
}

func (f *File) Name() string { return f.name }
func (f *File) Size() int64  { return f.size }

func (f *File) Print(indent string) {
	fmt.Printf("%s- %s (%d 字节)\n", indent, f.name, f.size)
}

// 容器节点：目录，可包含文件或子目录，实现递归组合
type Directory struct {
	name     string
	children []FileSystemNode
}

func NewDirectory(name string) *Directory {
	return &Directory{name: name}
}

func (d *Directory) Name() string { return d.name }

// Add 添加子节点（文件或目录皆可），返回自身以支持链式调用
func (d *Directory) Add(node FileSystemNode) *Directory {
	d.children = append(d.children, node)
	return d
}

// Size 递归累加所有子节点大小，调用者无需关心子节点是文件还是目录
func (d *Directory) Size() int64 {
	var total int64
	for _, child := range d.children {
		total += child.Size()
	}
	return total
}

func (d *Directory) Print(indent string) {
	fmt.Printf("%s+ %s/ (%d 字节)\n", indent, d.name, d.Size())
	for _, child := range d.children {
		child.Print(indent + "  ")
	}
}

func main() {
	fmt.Println("=== 组合模式：文件系统 ===")

	root := NewDirectory("project")

	src := NewDirectory("src")
	src.Add(NewFile("main.go", 1200)).Add(NewFile("utils.go", 800))

	docs := NewDirectory("docs")
	docs.Add(NewFile("README.md", 300))

	root.Add(src).Add(docs).Add(NewFile("go.mod", 50))

	root.Print("")

	fmt.Println(strings.Repeat("-", 30))
	fmt.Printf("项目总大小: %d 字节\n", root.Size())
}
