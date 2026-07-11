package main

import "fmt"

// 抽象产品：运输工具
type Transport interface {
	Deliver() string
}

// 具体产品：卡车
type Truck struct{}

func (t *Truck) Deliver() string {
	return "卡车在陆地上运输货物"
}

// 具体产品：轮船
type Ship struct{}

func (s *Ship) Deliver() string {
	return "轮船在海上运输货物"
}

// 抽象创建者：只声明工厂方法，具体创建哪种 Transport 交由实现者决定
type Logistics interface {
	CreateTransport() Transport
}

// PlanDelivery 是不依赖具体产品的通用业务逻辑，
// 通过抽象创建者接口间接使用工厂方法创建出的产品。
func PlanDelivery(l Logistics) string {
	transport := l.CreateTransport()
	return "规划运输路线 -> " + transport.Deliver()
}

// 具体创建者：陆运物流，工厂方法返回 Truck
type RoadLogistics struct{}

func (r *RoadLogistics) CreateTransport() Transport {
	return &Truck{}
}

// 具体创建者：海运物流，工厂方法返回 Ship
type SeaLogistics struct{}

func (s *SeaLogistics) CreateTransport() Transport {
	return &Ship{}
}

func main() {
	fmt.Println("=== 工厂方法模式：物流运输 ===")

	fmt.Println("[陆运]", PlanDelivery(&RoadLogistics{}))
	fmt.Println("[海运]", PlanDelivery(&SeaLogistics{}))
}
