# Interpreter 解释器模式（Objective-C）

## 意图

为一种简单语言定义其文法的对象表示，并提供一个解释器来解释该语言中的句子。每个文法规则对应一个表达式类，句子被解析成这些类组成的语法树，求值即遍历该树。

## 适用场景

- 需要解释执行的语言/规则相对简单（本例只有数字、变量、加、减）
- 文法可以方便地表示成一棵抽象语法树
- 希望同一棵语法树能在不同的上下文（变量取值）下反复求值

## 实现方式

`Expression` 协议声明 `interpretWithContext:`。`NumberExpression`/`VariableExpression` 是终结符表达式（叶子），`AddExpression`/`SubtractExpression` 是非终结符表达式（组合左右子表达式，递归求值）：

```objc
@implementation AddExpression
- (NSInteger)interpretWithContext:(NSDictionary<NSString *, NSNumber *> *)context {
    return [_left interpretWithContext:context] + [_right interpretWithContext:context];
}
@end
```

`main.m` 里的 `ParseExpression` 把 `@[@"5", @"+", @"3", @"-", @"2"]` 这样的 token 数组折叠成一棵表达式树；变量的值直到 `interpretWithContext:` 被调用时才从上下文字典查出，因此同一棵树换个上下文就能得到不同结果。

## 文件说明

| 文件 | 说明 |
|------|------|
| `Interpreter.h` | 抽象表达式协议 `Expression`、终结符 `NumberExpression`/`VariableExpression`、非终结符 `AddExpression`/`SubtractExpression` 声明 |
| `Interpreter.m` | 上述类型的实现 |
| `main.m` | 简易 token 解析器 + 三组求值演示（含变量、含不同上下文复用同一棵树） |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
=== 解析并求值 "5 + 3 - 2" ===
结果 = 6
 
=== 带变量的表达式 "x + 3 - 2"，上下文 x = 5 ===
结果 = 6
 
=== 同一棵表达式树，换一个上下文再求值（x = 10） ===
结果 = 11
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **文法规则即类** —— 每种语法结构（数字、变量、加、减）对应一个 `Expression` 实现类，新增运算符（如乘法）只需新增一个类。
2. **语法树与求值分离** —— `ParseExpression` 负责"搭树"，`interpretWithContext:` 负责"求值"，同一棵树可以反复用不同上下文求值。
3. **适合小型 DSL，不适合复杂语言** —— 规则一旦复杂（运算符优先级、括号嵌套很深），类的数量和递归深度会迅速膨胀，通常应换用专门的解析器生成工具。
