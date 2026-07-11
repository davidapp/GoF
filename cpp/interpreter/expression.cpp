#include "expression.h"
#include <cctype>
#include <sstream>
#include <stdexcept>

int Context::get_variable(const std::string& name) const {
    auto it = variables_.find(name);
    if (it == variables_.end()) {
        throw std::runtime_error("未定义的变量: " + name);
    }
    return it->second;
}

int NumberExpression::interpret(const Context& /*context*/) const { return value_; }
std::string NumberExpression::to_string() const { return std::to_string(value_); }

int VariableExpression::interpret(const Context& context) const { return context.get_variable(name_); }
std::string VariableExpression::to_string() const { return name_; }

int AddExpression::interpret(const Context& context) const {
    return left_->interpret(context) + right_->interpret(context);
}
std::string AddExpression::to_string() const {
    return "(" + left_->to_string() + " + " + right_->to_string() + ")";
}

int SubtractExpression::interpret(const Context& context) const {
    return left_->interpret(context) - right_->interpret(context);
}
std::string SubtractExpression::to_string() const {
    return "(" + left_->to_string() + " - " + right_->to_string() + ")";
}

namespace {

bool is_number(const std::string& token) {
    if (token.empty()) return false;
    size_t start = (token[0] == '-') ? 1 : 0;
    if (start >= token.size()) return false;
    for (size_t i = start; i < token.size(); ++i) {
        if (!std::isdigit(static_cast<unsigned char>(token[i]))) return false;
    }
    return true;
}

// 终结符表达式的工厂：数字就造 NumberExpression，否则当作变量名
std::unique_ptr<Expression> make_terminal(const std::string& token) {
    if (is_number(token)) {
        return std::make_unique<NumberExpression>(std::stoi(token));
    }
    return std::make_unique<VariableExpression>(token);
}

}  // namespace

std::unique_ptr<Expression> ExpressionParser::parse(const std::string& sentence) {
    std::istringstream iss(sentence);
    std::string token;

    iss >> token;
    std::unique_ptr<Expression> result = make_terminal(token);

    std::string op;
    while (iss >> op) {
        iss >> token;
        auto right = make_terminal(token);
        if (op == "+") {
            result = std::make_unique<AddExpression>(std::move(result), std::move(right));
        } else if (op == "-") {
            result = std::make_unique<SubtractExpression>(std::move(result), std::move(right));
        } else {
            throw std::runtime_error("不支持的运算符: " + op);
        }
    }
    return result;
}
