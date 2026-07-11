import Foundation

// 责任链模式：采购审批
// 场景：Manager -> Director -> CEO 按金额上限逐级审批

// MARK: - 请求：采购申请
struct PurchaseRequest {
    let item: String
    let amount: Double
}

// MARK: - 处理者协议：定义处理请求与设置下一节点的接口
protocol Approver: AnyObject {
    var next: Approver? { get set }
    var approvalLimit: Double { get }
    var title: String { get }
    func approve(_ request: PurchaseRequest)
}

extension Approver {
    // 默认实现：能批则批，不能批则转交下一节点；到链尾仍无法处理则拒绝
    func approve(_ request: PurchaseRequest) {
        if request.amount <= approvalLimit {
            print("\(title) 批准了采购《\(request.item)》，金额 ¥\(request.amount)")
        } else if let next = next {
            print("\(title) 权限不足（上限 ¥\(approvalLimit)），转交上级审批...")
            next.approve(request)
        } else {
            print("\(title) 拒绝了采购《\(request.item)》：金额 ¥\(request.amount) 超出全部审批权限")
        }
    }
}

// MARK: - 具体处理者：经理
final class Manager: Approver {
    var next: Approver?
    let approvalLimit: Double = 1_000
    let title = "经理"
}

// MARK: - 具体处理者：总监
final class Director: Approver {
    var next: Approver?
    let approvalLimit: Double = 10_000
    let title = "总监"
}

// MARK: - 具体处理者：CEO
final class CEO: Approver {
    var next: Approver?
    let approvalLimit: Double = 100_000
    let title = "CEO"
}

// MARK: - 顶层入口
print("=== 责任链模式：采购审批 ===\n")

// 组装责任链：经理 -> 总监 -> CEO
let manager = Manager()
let director = Director()
let ceo = CEO()
manager.next = director
director.next = ceo

let requests = [
    PurchaseRequest(item: "办公用品", amount: 500),
    PurchaseRequest(item: "笔记本电脑", amount: 8_000),
    PurchaseRequest(item: "服务器集群", amount: 80_000),
    PurchaseRequest(item: "企业并购", amount: 500_000)
]

for request in requests {
    manager.approve(request)
    print("")
}
