import Foundation

// 解释器模式：算术表达式求值
// 场景：解析并求值 "5 + 3 - 2"（数字、加、减，带上下文变量）

// MARK: - 上下文：保存变量到数值的映射
final class Context {
    private var variables: [String: Int] = [:]

    func setVariable(_ name: String, _ value: Int) {
        variables[name] = value
    }

    func valueOf(_ name: String) -> Int {
        guard let value = variables[name] else {
            print("警告：变量 \(name) 未定义，按 0 处理")
            return 0
        }
        return value
    }
}

// MARK: - 抽象表达式：用带关联值的枚举表示语法树（递归结构需 indirect）
indirect enum Expression {
    case number(Int)                       // 终结符表达式：数字字面量
    case variable(String)                  // 终结符表达式：变量引用
    case add(Expression, Expression)       // 非终结符表达式：加法
    case subtract(Expression, Expression)  // 非终结符表达式：减法

    // 解释器核心方法：递归求值
    func evaluate(in context: Context) -> Int {
        switch self {
        case .number(let value):
            return value
        case .variable(let name):
            return context.valueOf(name)
        case .add(let left, let right):
            return left.evaluate(in: context) + right.evaluate(in: context)
        case .subtract(let left, let right):
            return left.evaluate(in: context) - right.evaluate(in: context)
        }
    }

    // 生成表达式的中缀字符串表示，便于观察语法树结构
    var description: String {
        switch self {
        case .number(let value):
            return "\(value)"
        case .variable(let name):
            return name
        case .add(let left, let right):
            return "(\(left.description) + \(right.description))"
        case .subtract(let left, let right):
            return "(\(left.description) - \(right.description))"
        }
    }
}

// MARK: - 极简解析器：把形如 "5 + 3 - 2" 的字符串（空格分隔）解析为表达式树
enum ExpressionParser {
    static func parse(_ text: String) -> Expression {
        let tokens = text.split(separator: " ").map(String.init)
        guard !tokens.isEmpty else { return .number(0) }

        func makeTerm(_ token: String) -> Expression {
            if let number = Int(token) {
                return .number(number)
            }
            return .variable(token)
        }

        var result = makeTerm(tokens[0])
        var index = 1
        while index < tokens.count - 1 {
            let op = tokens[index]
            let next = makeTerm(tokens[index + 1])
            switch op {
            case "+":
                result = .add(result, next)
            case "-":
                result = .subtract(result, next)
            default:
                break
            }
            index += 2
        }
        return result
    }
}

// MARK: - 顶层入口
print("=== 解释器模式：算术表达式求值 ===\n")

let context = Context()

let expr1 = ExpressionParser.parse("5 + 3 - 2")
print("表达式: \(expr1.description) = \(expr1.evaluate(in: context))")

// 带变量的表达式：x + y - 4
context.setVariable("x", 10)
context.setVariable("y", 6)
let expr2 = ExpressionParser.parse("x + y - 4")
print("表达式: \(expr2.description) = \(expr2.evaluate(in: context))")

// 手动构造语法树，等价于 (5 + 3) - 2
let manualExpr = Expression.subtract(.add(.number(5), .number(3)), .number(2))
print("手动构造: \(manualExpr.description) = \(manualExpr.evaluate(in: context))")
