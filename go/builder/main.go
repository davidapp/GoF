package main

import (
	"errors"
	"fmt"
)

// 产品：电脑，由多个部件组成
type Computer struct {
	CPU     string
	Memory  string
	Storage string
	GPU     string
}

// String 实现 fmt.Stringer，方便直接打印
func (c *Computer) String() string {
	gpu := c.GPU
	if gpu == "" {
		gpu = "无（集成显卡）"
	}
	return fmt.Sprintf("电脑配置 [CPU: %s, 内存: %s, 存储: %s, GPU: %s]",
		c.CPU, c.Memory, c.Storage, gpu)
}

// 建造者接口：定义分步构建电脑的步骤，每步返回自身以支持链式调用
type ComputerBuilder interface {
	SetCPU(cpu string) ComputerBuilder
	SetMemory(memory string) ComputerBuilder
	SetStorage(storage string) ComputerBuilder
	SetGPU(gpu string) ComputerBuilder
	Build() (*Computer, error)
}

// 具体建造者：逐步组装 Computer 的内部状态
type computerBuilder struct {
	computer *Computer
}

// NewComputerBuilder 创建一个新的建造者
func NewComputerBuilder() ComputerBuilder {
	return &computerBuilder{computer: &Computer{}}
}

func (b *computerBuilder) SetCPU(cpu string) ComputerBuilder {
	b.computer.CPU = cpu
	return b
}

func (b *computerBuilder) SetMemory(memory string) ComputerBuilder {
	b.computer.Memory = memory
	return b
}

func (b *computerBuilder) SetStorage(storage string) ComputerBuilder {
	b.computer.Storage = storage
	return b
}

func (b *computerBuilder) SetGPU(gpu string) ComputerBuilder {
	b.computer.GPU = gpu
	return b
}

// Build 校验关键部件后返回最终产品；缺少必要部件时返回 error（Go 惯用做法）
func (b *computerBuilder) Build() (*Computer, error) {
	if b.computer.CPU == "" {
		return nil, errors.New("缺少 CPU，无法组装电脑")
	}
	if b.computer.Memory == "" {
		return nil, errors.New("缺少内存，无法组装电脑")
	}
	if b.computer.Storage == "" {
		return nil, errors.New("缺少存储，无法组装电脑")
	}
	return b.computer, nil
}

// 指挥者：封装常见预设配置的组装流程，隐藏具体的建造步骤顺序
type Director struct{}

// BuildOfficePC 组装一台办公电脑（无独立显卡）
func (d *Director) BuildOfficePC(b ComputerBuilder) (*Computer, error) {
	return b.SetCPU("Intel i5").
		SetMemory("16GB").
		SetStorage("512GB SSD").
		Build()
}

// BuildGamingPC 组装一台游戏电脑（含独立显卡）
func (d *Director) BuildGamingPC(b ComputerBuilder) (*Computer, error) {
	return b.SetCPU("Intel i9").
		SetMemory("32GB").
		SetStorage("2TB SSD").
		SetGPU("NVIDIA RTX 4090").
		Build()
}

func main() {
	fmt.Println("=== 建造者模式：组装电脑 ===")

	director := &Director{}

	officePC, err := director.BuildOfficePC(NewComputerBuilder())
	if err != nil {
		fmt.Println("组装失败:", err)
		return
	}
	fmt.Println("办公电脑:", officePC)

	gamingPC, err := director.BuildGamingPC(NewComputerBuilder())
	if err != nil {
		fmt.Println("组装失败:", err)
		return
	}
	fmt.Println("游戏电脑:", gamingPC)

	// 不通过 Director，也可以自由组装自定义配置
	customPC, err := NewComputerBuilder().
		SetCPU("AMD Ryzen 9").
		SetMemory("64GB").
		SetStorage("4TB NVMe").
		SetGPU("AMD RX 7900").
		Build()
	if err != nil {
		fmt.Println("组装失败:", err)
		return
	}
	fmt.Println("自定义电脑:", customPC)

	fmt.Println("\n(演示缺少必要部件时的错误处理)")
	if _, err := NewComputerBuilder().SetCPU("Intel i3").Build(); err != nil {
		fmt.Println("组装失败:", err)
	}
}
