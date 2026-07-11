package main

import "fmt"

// 原型接口：能够克隆自身的图形
type Shape interface {
	Clone() Shape
	Info() string
	SetPosition(x, y int)
}

// 具体原型：圆形
type Circle struct {
	Color  string
	X, Y   int
	Radius int
}

// Clone 返回自身的一份拷贝。Go 中结构体赋值本身就是逐字段值拷贝，
// 对于本例这种只含值类型字段的结构体，即完成了深拷贝。
func (c *Circle) Clone() Shape {
	cp := *c
	return &cp
}

func (c *Circle) Info() string {
	return fmt.Sprintf("圆形[颜色=%s, 位置=(%d,%d), 半径=%d]", c.Color, c.X, c.Y, c.Radius)
}

func (c *Circle) SetPosition(x, y int) {
	c.X, c.Y = x, y
}

// 具体原型：矩形
type Rectangle struct {
	Color         string
	X, Y          int
	Width, Height int
}

func (r *Rectangle) Clone() Shape {
	cp := *r
	return &cp
}

func (r *Rectangle) Info() string {
	return fmt.Sprintf("矩形[颜色=%s, 位置=(%d,%d), 宽高=%dx%d]", r.Color, r.X, r.Y, r.Width, r.Height)
}

func (r *Rectangle) SetPosition(x, y int) {
	r.X, r.Y = x, y
}

func main() {
	fmt.Println("=== 原型模式：克隆图形 ===")

	original := &Circle{Color: "红色", X: 10, Y: 20, Radius: 5}
	fmt.Println("原始图形:", original.Info())

	cloned := original.Clone()
	cloned.SetPosition(100, 200)
	fmt.Println("克隆图形（修改位置后）:", cloned.Info())
	fmt.Println("原始图形（应保持不变）:", original.Info())

	rect := &Rectangle{Color: "蓝色", X: 0, Y: 0, Width: 30, Height: 40}
	rectClone := rect.Clone()
	rectClone.SetPosition(5, 5)
	fmt.Println("\n原始矩形:", rect.Info())
	fmt.Println("克隆矩形（修改位置后）:", rectClone.Info())
}
