package main

import "fmt"

// BeverageSteps 步骤接口：定义冲泡过程中因具体饮品而异的步骤。
// Go 没有抽象类/继承，用"接口 + 组合"表达模板方法模式：
// 固定的算法骨架放在 Beverage 中，变化的步骤通过接口委托给具体类型。
type BeverageSteps interface {
	Name() string
	Brew() string
	AddCondiments() string
}

// Beverage 模板：定义冲泡饮料的固定算法骨架
type Beverage struct {
	steps BeverageSteps
}

func NewBeverage(steps BeverageSteps) *Beverage {
	return &Beverage{steps: steps}
}

// Prepare 是模板方法：固定了冲泡流程的顺序，具体步骤由 steps 提供
func (b *Beverage) Prepare() {
	fmt.Println("开始冲泡", b.steps.Name())
	fmt.Println("1. 烧开水")
	fmt.Println("2.", b.steps.Brew())
	fmt.Println("3. 倒入杯中")
	fmt.Println("4.", b.steps.AddCondiments())
	fmt.Println(b.steps.Name(), "冲泡完成！")
}

// Tea 具体步骤：茶
type Tea struct{}

func (t *Tea) Name() string          { return "茶" }
func (t *Tea) Brew() string          { return "用沸水浸泡茶叶" }
func (t *Tea) AddCondiments() string { return "加入柠檬片" }

// Coffee 具体步骤：咖啡
type Coffee struct{}

func (c *Coffee) Name() string          { return "咖啡" }
func (c *Coffee) Brew() string          { return "用沸水冲泡咖啡粉" }
func (c *Coffee) AddCondiments() string { return "加入牛奶和糖" }

func main() {
	fmt.Println("=== 模板方法模式：冲泡饮料 ===")

	tea := NewBeverage(&Tea{})
	tea.Prepare()

	fmt.Println()

	coffee := NewBeverage(&Coffee{})
	coffee.Prepare()
}
