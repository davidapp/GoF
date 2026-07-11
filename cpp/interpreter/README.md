# Interpreter 解释器模式（C++）

## 意图

给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

## 适用场景

- 需要解释执行的语言，其文法相对简单（否则应考虑成熟的 parser generator）
- 一些重复出现的问题可以用一种简单语言来表达（如规则引擎、算术表达式、查询条件）
- 效率不是关键关注点（解释器模式通常用递归实现，效率一般）

## 实现方式

`Expression` 是抽象表达式；`NumberExpression`/`VariableExpression` 是终结符表达式（叶子节点）；`AddExpression`/`SubtractExpression` 是非终结符表达式，组合两个子表达式：

```cpp
int AddExpression::interpret(const Context& context) const {
    return left_->interpret(context) + right_->interpret(context);
}
```

`ExpressionParser::parse()` 按空格分词，从左到右递归下降，把 `"5 + 3 - 2"` 或带变量的 `"x + 3 - y"` 组装成一棵表达式树；`Context` 保存变量到数值的映射，供 `VariableExpression::interpret()` 查询。

## 文件说明

| 文件 | 说明 |
|------|------|
| `expression.h` | `Context`、抽象表达式、终结符/非终结符表达式、`ExpressionParser` 的声明 |
| `expression.cpp` | 各表达式节点的求值逻辑与简易递归下降解析器 |
| `main.cpp` | 解析并求值 `"5 + 3 - 2"`、含变量的表达式 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 解释器模式：算术表达式求值 ===

表达式: ((5 + 3) - 2) = 6
表达式: ((x + 3) - y) = 9  (x=10, y=4)
表达式: ((100 - x) - y) = 86  (x=10, y=4)
```

## 要点

1. **文法与对象一一对应** — 每一种语法规则（数字、变量、加、减）对应一个 `Expression` 子类
2. **组合方式即语法树** — `AddExpression`/`SubtractExpression` 持有子表达式，树形结构天然表达运算的优先级与结合方式
3. **Context 携带外部状态** — 变量取值与语法树本身解耦，同一棵树可以在不同 `Context` 下求出不同结果
4. **易扩展但不适合复杂文法** — 新增运算符只需新增一个 `Expression` 子类；文法复杂时应改用专门的解析器生成工具
