package main

import "fmt"

// 组件接口：饮品
type Beverage interface {
	Description() string
	Cost() float64
}

// 具体组件：意式浓缩咖啡
type Espresso struct{}

func (e *Espresso) Description() string { return "Espresso 意式浓缩" }
func (e *Espresso) Cost() float64       { return 15.0 }

// 装饰器基础结构：持有被装饰的 Beverage（组合而非继承），
// 具体装饰器嵌入它即可复用"持有被装饰对象"这部分能力。
type beverageDecorator struct {
	wrapped Beverage
}

// 具体装饰器：加牛奶
type MilkDecorator struct {
	beverageDecorator
}

func NewMilkDecorator(b Beverage) *MilkDecorator {
	return &MilkDecorator{beverageDecorator: beverageDecorator{wrapped: b}}
}

func (m *MilkDecorator) Description() string {
	return m.wrapped.Description() + " + 牛奶"
}

func (m *MilkDecorator) Cost() float64 {
	return m.wrapped.Cost() + 3.0
}

// 具体装饰器：加糖
type SugarDecorator struct {
	beverageDecorator
}

func NewSugarDecorator(b Beverage) *SugarDecorator {
	return &SugarDecorator{beverageDecorator: beverageDecorator{wrapped: b}}
}

func (s *SugarDecorator) Description() string {
	return s.wrapped.Description() + " + 糖"
}

func (s *SugarDecorator) Cost() float64 {
	return s.wrapped.Cost() + 1.5
}

func main() {
	fmt.Println("=== 装饰器模式：咖啡加料 ===")

	var beverage Beverage = &Espresso{}
	fmt.Printf("%s => %.2f 元\n", beverage.Description(), beverage.Cost())

	beverage = NewMilkDecorator(beverage)
	fmt.Printf("%s => %.2f 元\n", beverage.Description(), beverage.Cost())

	beverage = NewSugarDecorator(beverage)
	fmt.Printf("%s => %.2f 元\n", beverage.Description(), beverage.Cost())

	beverage = NewSugarDecorator(beverage)
	fmt.Printf("%s => %.2f 元\n", beverage.Description(), beverage.Cost())
}
