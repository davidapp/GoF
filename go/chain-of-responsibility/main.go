package main

import "fmt"

// 请求：采购申请
type PurchaseRequest struct {
	Item   string
	Amount float64
}

// 处理者接口：审批人，可设置下一处理者并处理审批请求
type Approver interface {
	SetNext(next Approver) Approver
	Approve(req *PurchaseRequest)
}

// 基础处理者：封装"转交下一环节"的通用逻辑，供各级审批人组合复用（而非继承）
type baseApprover struct {
	next Approver
}

func (b *baseApprover) SetNext(next Approver) Approver {
	b.next = next
	return next
}

func (b *baseApprover) passToNext(req *PurchaseRequest) {
	if b.next != nil {
		b.next.Approve(req)
		return
	}
	fmt.Printf("采购申请 [%s, %.0f 元] 无人可审批，已被拒绝\n", req.Item, req.Amount)
}

// 具体处理者：经理，限额 5000
type Manager struct {
	baseApprover
	limit float64
}

func NewManager() *Manager {
	return &Manager{limit: 5000}
}

func (m *Manager) Approve(req *PurchaseRequest) {
	if req.Amount <= m.limit {
		fmt.Printf("经理批准了采购申请 [%s, %.0f 元]\n", req.Item, req.Amount)
		return
	}
	fmt.Printf("经理权限不足（限额 %.0f），转交上级\n", m.limit)
	m.passToNext(req)
}

// 具体处理者：总监，限额 20000
type Director struct {
	baseApprover
	limit float64
}

func NewDirector() *Director {
	return &Director{limit: 20000}
}

func (d *Director) Approve(req *PurchaseRequest) {
	if req.Amount <= d.limit {
		fmt.Printf("总监批准了采购申请 [%s, %.0f 元]\n", req.Item, req.Amount)
		return
	}
	fmt.Printf("总监权限不足（限额 %.0f），转交上级\n", d.limit)
	d.passToNext(req)
}

// 具体处理者：CEO，限额 100000
type CEO struct {
	baseApprover
	limit float64
}

func NewCEO() *CEO {
	return &CEO{limit: 100000}
}

func (c *CEO) Approve(req *PurchaseRequest) {
	if req.Amount <= c.limit {
		fmt.Printf("CEO 批准了采购申请 [%s, %.0f 元]\n", req.Item, req.Amount)
		return
	}
	fmt.Printf("CEO 权限不足（限额 %.0f），申请被拒绝\n", c.limit)
	c.passToNext(req)
}

func main() {
	fmt.Println("=== 责任链模式：采购审批 ===")

	manager := NewManager()
	director := NewDirector()
	ceo := NewCEO()

	manager.SetNext(director).SetNext(ceo)

	requests := []*PurchaseRequest{
		{Item: "办公用品", Amount: 800},
		{Item: "会议室设备", Amount: 15000},
		{Item: "新服务器", Amount: 80000},
		{Item: "并购项目", Amount: 500000},
	}

	for _, req := range requests {
		manager.Approve(req)
		fmt.Println()
	}
}
