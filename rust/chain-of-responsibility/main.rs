// 责任链模式（Chain of Responsibility）—— 采购审批演示
//
// 经理 -> 总监 -> CEO 按金额上限逐级审批：每个节点先判断自己能不能
// 处理，不能处理就转给链上的下一个节点。这里用一个统一的 Approver
// 结构体 + Option<Box<Approver>> 构成链表，比为每个角色单独建一个
// 几乎相同的 trait 实现更符合 Rust“数据驱动”的惯用风格。

// 请求：采购申请
struct PurchaseRequest {
    amount: f64,
    purpose: String,
}

// 处理者：审批人节点，角色通过 role/limit 区分，next 指向链上的下一位
struct Approver {
    role: String,
    limit: f64,
    next: Option<Box<Approver>>,
}

impl Approver {
    fn new(role: &str, limit: f64) -> Self {
        Approver {
            role: role.to_string(),
            limit,
            next: None,
        }
    }

    // 构建责任链：把 next 接到当前节点之后，返回自身以便继续链式组装
    fn chain(mut self, next: Approver) -> Self {
        self.next = Some(Box::new(next));
        self
    }

    fn handle(&mut self, request: &PurchaseRequest) {
        if request.amount <= self.limit {
            println!(
                "{}（审批额度 {:.0} 元以内）批准了采购申请: {:.0} 元 —— {}",
                self.role, self.limit, request.amount, request.purpose
            );
        } else {
            match &mut self.next {
                Some(next) => next.handle(request),
                None => println!(
                    "金额 {:.0} 元超出所有审批权限（最高到 {}），需要董事会特批 —— {}",
                    request.amount, self.role, request.purpose
                ),
            }
        }
    }
}

fn main() {
    println!("=== 责任链模式：采购审批演示 ===\n");

    // 组装责任链：经理 -> 总监 -> CEO
    let mut chain = Approver::new("经理", 5_000.0).chain(
        Approver::new("总监", 50_000.0).chain(Approver::new("CEO", 100_000.0)),
    );

    let requests = vec![
        PurchaseRequest { amount: 3_000.0, purpose: "办公用品".to_string() },
        PurchaseRequest { amount: 20_000.0, purpose: "团队建设".to_string() },
        PurchaseRequest { amount: 80_000.0, purpose: "服务器采购".to_string() },
        PurchaseRequest { amount: 500_000.0, purpose: "并购项目".to_string() },
    ];

    for request in &requests {
        chain.handle(request);
    }
}
