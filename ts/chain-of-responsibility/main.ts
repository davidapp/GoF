/**
 * 责任链模式（Chain of Responsibility）
 * 场景：采购审批 —— Manager -> Director -> CEO 按金额上限逐级审批。
 *
 * 核心思想：把多个处理者串成一条链，请求沿链传递，
 * 直到某个处理者能够处理它为止。发送者无需知道具体由谁处理。
 */

interface PurchaseRequest {
  amount: number;
  purpose: string;
}

// ---------- 抽象处理者（Handler） ----------
abstract class Approver {
  private next: Approver | undefined;

  // 返回 next 以支持链式拼接：a.setNext(b).setNext(c)
  setNext(next: Approver): Approver {
    this.next = next;
    return next;
  }

  handle(request: PurchaseRequest): void {
    if (this.canApprove(request.amount)) {
      console.log(
        `${this.getTitle()} 批准了采购申请 [${request.purpose}]，金额 ¥${request.amount}`,
      );
    } else if (this.next !== undefined) {
      console.log(`${this.getTitle()} 权限不足（上限 ¥${this.getLimit()}），转交上级审批...`);
      this.next.handle(request);
    } else {
      console.log(`金额 ¥${request.amount} 超出所有审批人的权限，申请被拒绝`);
    }
  }

  protected abstract canApprove(amount: number): boolean;
  protected abstract getLimit(): number;
  protected abstract getTitle(): string;
}

// ---------- 具体处理者（Concrete Handler） ----------
class Manager extends Approver {
  protected getLimit(): number {
    return 1_000;
  }
  protected canApprove(amount: number): boolean {
    return amount <= this.getLimit();
  }
  protected getTitle(): string {
    return "部门经理";
  }
}

class Director extends Approver {
  protected getLimit(): number {
    return 10_000;
  }
  protected canApprove(amount: number): boolean {
    return amount <= this.getLimit();
  }
  protected getTitle(): string {
    return "总监";
  }
}

class CEO extends Approver {
  protected getLimit(): number {
    return Number.POSITIVE_INFINITY;
  }
  protected canApprove(_amount: number): boolean {
    return true; // CEO 无金额上限，参数未使用故加下划线前缀
  }
  protected getTitle(): string {
    return "CEO";
  }
}

// ---------- 演示 ----------
function main(): void {
  const manager = new Manager();
  const director = new Director();
  const ceo = new CEO();

  // 组装责任链：Manager -> Director -> CEO
  manager.setNext(director).setNext(ceo);

  const requests: PurchaseRequest[] = [
    { amount: 500, purpose: "办公用品采购" },
    { amount: 5_000, purpose: "部门团建活动" },
    { amount: 80_000, purpose: "服务器采购" },
  ];

  for (const request of requests) {
    console.log(`\n--- 新申请: ${request.purpose}，金额 ¥${request.amount} ---`);
    manager.handle(request);
  }
}

main();
