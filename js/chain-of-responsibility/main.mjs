// ============================================================
// 责任链模式（Chain of Responsibility）
// 场景：采购审批 —— Manager -> Director -> CEO 按金额上限逐级审批
// ============================================================

// ---- 抽象处理者（Handler）：约定“设置下一节点”与“处理请求”----
class Approver {
  #next = null;

  setNext(approver) {
    this.#next = approver;
    return approver; // 返回下一节点，便于链式设置 a.setNext(b).setNext(c)
  }

  handle(request) {
    if (this.canApprove(request)) {
      return this.approve(request);
    }
    if (this.#next) {
      console.log(`  ${this.title} 无权审批（超出 ¥${this.limit}），转交下一级...`);
      return this.#next.handle(request);
    }
    return `[采购申请 "${request.item}" ¥${request.amount}] 无人可以审批此金额，流程终止`;
  }

  canApprove(request) {
    throw new Error('子类必须实现 canApprove()');
  }

  approve(request) {
    throw new Error('子类必须实现 approve()');
  }
}

// ---- 具体处理者：经理，限额 1000 ----
class Manager extends Approver {
  title = '经理';
  limit = 1000;

  canApprove(request) {
    return request.amount <= this.limit;
  }

  approve(request) {
    return `[采购申请 "${request.item}" ¥${request.amount}] 由 ${this.title} 批准`;
  }
}

// ---- 具体处理者：总监，限额 10000 ----
class Director extends Approver {
  title = '总监';
  limit = 10000;

  canApprove(request) {
    return request.amount <= this.limit;
  }

  approve(request) {
    return `[采购申请 "${request.item}" ¥${request.amount}] 由 ${this.title} 批准`;
  }
}

// ---- 具体处理者：CEO，无金额上限 ----
class CEO extends Approver {
  title = 'CEO';
  limit = Infinity;

  canApprove(request) {
    return request.amount <= this.limit;
  }

  approve(request) {
    return `[采购申请 "${request.item}" ¥${request.amount}] 由 ${this.title} 批准`;
  }
}

console.log('=== 责任链模式：采购审批链 ===\n');

// 组装责任链：经理 -> 总监 -> CEO
const manager = new Manager();
const director = new Director();
const ceo = new CEO();
manager.setNext(director).setNext(ceo);

const requests = [
  { item: '办公文具', amount: 500 },
  { item: '部门团建', amount: 8000 },
  { item: '新服务器采购', amount: 150000 },
];

for (const request of requests) {
  console.log(`提交申请: 《${request.item}》 金额 ¥${request.amount}`);
  const result = manager.handle(request);
  console.log(result);
  console.log();
}
