#pragma once
#include <memory>
#include <string>
#include <unordered_map>

// 上下文：保存变量名到数值的映射，解释过程中按需查询
class Context {
public:
    void set_variable(const std::string& name, int value) { variables_[name] = value; }
    int get_variable(const std::string& name) const;

private:
    std::unordered_map<std::string, int> variables_;
};

// 抽象表达式：声明解释操作
class Expression {
public:
    virtual ~Expression() = default;
    virtual int interpret(const Context& context) const = 0;
    virtual std::string to_string() const = 0;
};

// 终结符表达式：数字常量
class NumberExpression : public Expression {
public:
    explicit NumberExpression(int value) : value_(value) {}
    int interpret(const Context& context) const override;
    std::string to_string() const override;

private:
    int value_;
};

// 终结符表达式：变量引用，需要从 Context 中查值
class VariableExpression : public Expression {
public:
    explicit VariableExpression(std::string name) : name_(std::move(name)) {}
    int interpret(const Context& context) const override;
    std::string to_string() const override;

private:
    std::string name_;
};

// 非终结符表达式：加法，组合两个子表达式
class AddExpression : public Expression {
public:
    AddExpression(std::unique_ptr<Expression> left, std::unique_ptr<Expression> right)
        : left_(std::move(left)), right_(std::move(right)) {}
    int interpret(const Context& context) const override;
    std::string to_string() const override;

private:
    std::unique_ptr<Expression> left_;
    std::unique_ptr<Expression> right_;
};

// 非终结符表达式：减法，组合两个子表达式
class SubtractExpression : public Expression {
public:
    SubtractExpression(std::unique_ptr<Expression> left, std::unique_ptr<Expression> right)
        : left_(std::move(left)), right_(std::move(right)) {}
    int interpret(const Context& context) const override;
    std::string to_string() const override;

private:
    std::unique_ptr<Expression> left_;
    std::unique_ptr<Expression> right_;
};

// 解析器：把形如 "5 + 3 - 2" 或 "x + 3 - y" 的句子解析成表达式树
// 文法（简化版）：expr := term (('+' | '-') term)*，term := NUMBER | IDENT
class ExpressionParser {
public:
    static std::unique_ptr<Expression> parse(const std::string& sentence);
};
