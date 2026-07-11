#include "expression.h"
#include <iostream>

// 解释器模式：ExpressionParser 把字符串解析成一棵由
// NumberExpression/VariableExpression/AddExpression/SubtractExpression 组成的语法树，
// 之后对树递归调用 interpret() 即可求值，而无需再关心原始文本。
int main() {
    std::cout << "=== 解释器模式：算术表达式求值 ===\n" << std::endl;

    Context context;

    auto expr1 = ExpressionParser::parse("5 + 3 - 2");
    std::cout << "表达式: " << expr1->to_string() << " = " << expr1->interpret(context) << std::endl;

    context.set_variable("x", 10);
    context.set_variable("y", 4);
    auto expr2 = ExpressionParser::parse("x + 3 - y");
    std::cout << "表达式: " << expr2->to_string() << " = " << expr2->interpret(context)
              << "  (x=10, y=4)" << std::endl;

    auto expr3 = ExpressionParser::parse("100 - x - y");
    std::cout << "表达式: " << expr3->to_string() << " = " << expr3->interpret(context)
              << "  (x=10, y=4)" << std::endl;

    return 0;
}
