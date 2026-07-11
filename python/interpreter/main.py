"""解释器模式（Interpreter）
场景：算术表达式 —— 解析并求值 "5 + 3 - 2"（数字、加、减，支持上下文变量）。

核心思想：给定一门语言，定义它的文法的一种表示，并定义一个解释器，
这个解释器使用该表示来解释语言中的句子。本例把 "5 + 3 - 2" 这样的
中缀表达式解析成一棵表达式树（AST），树的每个节点都实现统一的
interpret(context) 接口，求值即对树做一次后序遍历。
"""

from __future__ import annotations

import sys
from abc import ABC, abstractmethod

# Windows 控制台有时默认非 UTF-8 编码，强制切换避免中文输出乱码
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")


# ------------------------- 上下文（Context） -------------------------
class Context:
    """上下文：保存变量名到数值的映射，供变量表达式查询"""

    def __init__(self, **variables: float) -> None:
        self._variables: dict[str, float] = dict(variables)

    def get_variable(self, name: str) -> float:
        if name not in self._variables:
            raise KeyError(f"未定义的变量: {name}")
        return self._variables[name]


# ------------------------- 抽象表达式（Abstract Expression） -------------------------
class Expression(ABC):
    """抽象表达式：树中的每个节点（数字、变量、加法、减法）都实现该接口"""

    @abstractmethod
    def interpret(self, context: Context) -> float:
        """在给定上下文中求值"""


# ------------------------- 终结符表达式（Terminal Expression） -------------------------
class NumberExpression(Expression):
    """终结符：字面量数字"""

    def __init__(self, value: float) -> None:
        self._value = value

    def interpret(self, context: Context) -> float:
        return self._value

    def __repr__(self) -> str:
        return _format_number(self._value)


class VariableExpression(Expression):
    """终结符：变量，求值时从上下文中查询"""

    def __init__(self, name: str) -> None:
        self._name = name

    def interpret(self, context: Context) -> float:
        return context.get_variable(self._name)

    def __repr__(self) -> str:
        return self._name


# ------------------------- 非终结符表达式（Non-terminal Expression） -------------------------
class AddExpression(Expression):
    """非终结符：加法，组合左右两个子表达式"""

    def __init__(self, left: Expression, right: Expression) -> None:
        self._left = left
        self._right = right

    def interpret(self, context: Context) -> float:
        return self._left.interpret(context) + self._right.interpret(context)

    def __repr__(self) -> str:
        return f"({self._left} + {self._right})"


class SubtractExpression(Expression):
    """非终结符：减法，组合左右两个子表达式"""

    def __init__(self, left: Expression, right: Expression) -> None:
        self._left = left
        self._right = right

    def interpret(self, context: Context) -> float:
        return self._left.interpret(context) - self._right.interpret(context)

    def __repr__(self) -> str:
        return f"({self._left} - {self._right})"


def _format_number(value: float) -> str:
    return str(int(value)) if value == int(value) else str(value)


# ------------------------- 语法解析（Parser） -------------------------
def parse(expression: str) -> Expression:
    """将形如 "5 + 3 - 2" 或 "x + y - 3" 的中缀表达式解析为表达式树。

    文法（仅支持 + / -，同优先级，从左到右结合）:
        expression := operand (('+' | '-') operand)*
        operand    := NUMBER | IDENTIFIER
    """
    tokens = expression.split()
    if not tokens:
        raise ValueError("表达式不能为空")

    def to_operand(token: str) -> Expression:
        try:
            return NumberExpression(float(token))
        except ValueError:
            return VariableExpression(token)

    tree: Expression = to_operand(tokens[0])
    i = 1
    while i < len(tokens):
        operator, operand_token = tokens[i], tokens[i + 1]
        right = to_operand(operand_token)
        if operator == "+":
            tree = AddExpression(tree, right)
        elif operator == "-":
            tree = SubtractExpression(tree, right)
        else:
            raise ValueError(f"不支持的运算符: {operator}")
        i += 2
    return tree


def main() -> None:
    empty_context = Context()

    print("--- 纯数字表达式 ---")
    for text in ["5 + 3 - 2", "10 - 4 + 1 - 2"]:
        tree = parse(text)
        result = _format_number(tree.interpret(empty_context))
        print(f"表达式: {text!r:20} 语法树: {tree!s:20} 结果: {result}")

    print()
    print("--- 带变量的表达式（依赖上下文） ---")
    context = Context(x=10, y=4, z=3)
    for text in ["x + y - z", "x - y - z"]:
        tree = parse(text)
        result = _format_number(tree.interpret(context))
        print(f"表达式: {text!r:20} 语法树: {tree!s:20} 结果: {result}")

    print()
    print("--- 同一棵语法树，切换上下文即可得到不同结果 ---")
    reusable_tree = parse("x + y - z")
    for x, y, z in [(1, 2, 3), (100, 50, 25)]:
        result = _format_number(reusable_tree.interpret(Context(x=x, y=y, z=z)))
        print(f"x={x}, y={y}, z={z} -> {reusable_tree} = {result}")


if __name__ == "__main__":
    main()
