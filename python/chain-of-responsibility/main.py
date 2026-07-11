"""责任链模式（Chain of Responsibility）
场景：采购审批 —— Manager → Director → CEO 按金额上限逐级审批。

核心思想：让多个对象都有机会处理同一个请求，从而避免请求发送者与具体
处理者之间的耦合。把这些对象连成一条链，请求沿链传递，直到有对象处理它为止；
调用者只需把请求交给链的第一环，无需关心到底是谁最终处理了它。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod
from dataclasses import dataclass

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 请求 -------------------------
@dataclass
class PurchaseRequest:
    """采购申请"""

    item: str
    amount: float


# ------------------------- 抽象处理者（Handler） -------------------------
class Approver(ABC):
    """抽象审批人：持有下一环的引用，处理不了就传递下去"""

    def __init__(self, name: str) -> None:
        self.name = name
        self._next: Approver | None = None

    def set_next(self, next_approver: Approver) -> Approver:
        """设置链中的下一环，返回该环以支持链式调用"""
        self._next = next_approver
        return next_approver

    def handle(self, request: PurchaseRequest) -> str:
        if request.amount <= self.limit:
            return self._approve(request)
        if self._next is not None:
            print(f"  {self.name} 权限不足（上限 {self.limit} 元），转交下一级...")
            return self._next.handle(request)
        return f"  申请被拒绝：金额 {request.amount} 元超出所有审批人的权限上限"

    @property
    @abstractmethod
    def limit(self) -> float:
        """该审批人能够独立审批的最高金额"""

    def _approve(self, request: PurchaseRequest) -> str:
        return f"  【{self.name}】批准了采购申请「{request.item}」，金额 {request.amount} 元"


# ------------------------- 具体处理者（Concrete Handler） -------------------------
class Manager(Approver):
    """经理：可批准 5000 元以内的采购"""

    def __init__(self) -> None:
        super().__init__("经理")

    @property
    def limit(self) -> float:
        return 5_000


class Director(Approver):
    """总监：可批准 20000 元以内的采购"""

    def __init__(self) -> None:
        super().__init__("总监")

    @property
    def limit(self) -> float:
        return 20_000


class CEO(Approver):
    """CEO：可批准 100000 元以内的采购"""

    def __init__(self) -> None:
        super().__init__("CEO")

    @property
    def limit(self) -> float:
        return 100_000


def main() -> None:
    # 组装责任链：经理 -> 总监 -> CEO
    manager = Manager()
    director = Director()
    ceo = CEO()
    manager.set_next(director).set_next(ceo)

    requests = [
        PurchaseRequest("办公文具", 800),
        PurchaseRequest("部门团建", 8_000),
        PurchaseRequest("服务器采购", 45_000),
        PurchaseRequest("公司年会", 150_000),
    ]

    for request in requests:
        print(f"提交申请: 「{request.item}」金额 {request.amount} 元")
        # 调用者永远只找链的第一环，不关心谁最终处理
        print(manager.handle(request))
        print()


if __name__ == "__main__":
    main()
