package main

import (
	"fmt"
	"math"
)

// Shape 元素接口：图形，接受访问者
type Shape interface {
	Accept(visitor ShapeVisitor)
}

// ShapeVisitor 访问者接口：为每种具体图形声明一个 Visit 方法，
// 新增操作时只需新增一个访问者实现，无需修改 Shape 类型。
type ShapeVisitor interface {
	VisitCircle(c *Circle)
	VisitRectangle(r *Rectangle)
}

// Circle 具体元素：圆形
type Circle struct {
	Radius float64
}

func (c *Circle) Accept(visitor ShapeVisitor) {
	visitor.VisitCircle(c)
}

// Rectangle 具体元素：矩形
type Rectangle struct {
	Width, Height float64
}

func (r *Rectangle) Accept(visitor ShapeVisitor) {
	visitor.VisitRectangle(r)
}

// AreaVisitor 具体访问者：计算面积
type AreaVisitor struct {
	TotalArea float64
}

func (v *AreaVisitor) VisitCircle(c *Circle) {
	area := math.Pi * c.Radius * c.Radius
	fmt.Printf("圆形(半径=%.1f) 面积 = %.2f\n", c.Radius, area)
	v.TotalArea += area
}

func (v *AreaVisitor) VisitRectangle(r *Rectangle) {
	area := r.Width * r.Height
	fmt.Printf("矩形(%.1fx%.1f) 面积 = %.2f\n", r.Width, r.Height, area)
	v.TotalArea += area
}

// DrawVisitor 具体访问者：渲染绘制
type DrawVisitor struct{}

func (v *DrawVisitor) VisitCircle(c *Circle) {
	fmt.Printf("绘制一个半径为 %.1f 的圆 ○\n", c.Radius)
}

func (v *DrawVisitor) VisitRectangle(r *Rectangle) {
	fmt.Printf("绘制一个 %.1fx%.1f 的矩形 □\n", r.Width, r.Height)
}

func main() {
	fmt.Println("=== 访问者模式：图形操作 ===")

	shapes := []Shape{
		&Circle{Radius: 3},
		&Rectangle{Width: 4, Height: 5},
		&Circle{Radius: 1.5},
	}

	fmt.Println("-- 使用 AreaVisitor 计算面积 --")
	areaVisitor := &AreaVisitor{}
	for _, s := range shapes {
		s.Accept(areaVisitor)
	}
	fmt.Printf("总面积 = %.2f\n", areaVisitor.TotalArea)

	fmt.Println("\n-- 使用 DrawVisitor 渲染图形 --")
	drawVisitor := &DrawVisitor{}
	for _, s := range shapes {
		s.Accept(drawVisitor)
	}
}
