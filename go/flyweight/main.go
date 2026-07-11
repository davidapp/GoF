package main

import "fmt"

// 享元：树的内在状态（可共享），名称/颜色/纹理相同的树共用同一个 TreeType 实例
type TreeType struct {
	Name    string
	Color   string
	Texture string
}

func (t *TreeType) Draw(x, y int) string {
	return fmt.Sprintf("在 (%d,%d) 绘制 [%s, %s, 纹理:%s]", x, y, t.Name, t.Color, t.Texture)
}

// 享元工厂：缓存并复用已创建的 TreeType，避免为相同内在状态重复创建对象
type TreeFactory struct {
	types map[string]*TreeType
}

func NewTreeFactory() *TreeFactory {
	return &TreeFactory{types: make(map[string]*TreeType)}
}

// GetTreeType 若已存在相同内在状态的 TreeType 则直接复用，否则创建并缓存
func (f *TreeFactory) GetTreeType(name, color, texture string) *TreeType {
	key := name + "|" + color + "|" + texture
	if t, ok := f.types[key]; ok {
		return t
	}
	fmt.Println("(创建新的 TreeType:", key, ")")
	t := &TreeType{Name: name, Color: color, Texture: texture}
	f.types[key] = t
	return t
}

func (f *TreeFactory) Count() int {
	return len(f.types)
}

// Tree 树：外在状态（坐标）+ 指向共享内在状态的引用
type Tree struct {
	X, Y int
	Type *TreeType
}

func (t *Tree) Draw() string {
	return t.Type.Draw(t.X, t.Y)
}

// Forest 森林：管理大量 Tree 对象
type Forest struct {
	trees   []*Tree
	factory *TreeFactory
}

func NewForest() *Forest {
	return &Forest{factory: NewTreeFactory()}
}

func (f *Forest) Plant(x, y int, name, color, texture string) {
	t := f.factory.GetTreeType(name, color, texture)
	f.trees = append(f.trees, &Tree{X: x, Y: y, Type: t})
}

func (f *Forest) Draw() {
	for _, t := range f.trees {
		fmt.Println(t.Draw())
	}
}

func main() {
	fmt.Println("=== 享元模式：森林 ===")

	forest := NewForest()
	forest.Plant(1, 1, "松树", "深绿色", "粗糙")
	forest.Plant(2, 5, "松树", "深绿色", "粗糙")
	forest.Plant(8, 3, "枫树", "红色", "光滑")
	forest.Plant(10, 10, "松树", "深绿色", "粗糙")
	forest.Plant(4, 7, "枫树", "红色", "光滑")

	forest.Draw()

	fmt.Printf("\n共种植 %d 棵树，但只创建了 %d 个 TreeType 对象（内在状态被共享）\n",
		len(forest.trees), forest.factory.Count())
}
