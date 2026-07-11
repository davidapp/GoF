package main

import (
	"fmt"
	"strconv"
	"strings"
)

// Context 上下文：保存变量到数值的映射，解释表达式时按需查询
type Context struct {
	variables map[string]int
}

func NewContext() *Context {
	return &Context{variables: make(map[string]int)}
}

func (c *Context) SetVar(name string, value int) {
	c.variables[name] = value
}

func (c *Context) GetVar(name string) int {
	return c.variables[name]
}

// Expression 抽象表达式：所有节点都能在给定上下文中求值
type Expression interface {
	Interpret(ctx *Context) int
}

// NumberExpression 终结符表达式：数字字面量
type NumberExpression struct {
	value int
}

func (n *NumberExpression) Interpret(ctx *Context) int {
	return n.value
}

// VariableExpression 终结符表达式：变量，求值时从上下文中查询
type VariableExpression struct {
	name string
}

func (v *VariableExpression) Interpret(ctx *Context) int {
	return ctx.GetVar(v.name)
}

// AddExpression 非终结符表达式：加法
type AddExpression struct {
	left, right Expression
}

func (a *AddExpression) Interpret(ctx *Context) int {
	return a.left.Interpret(ctx) + a.right.Interpret(ctx)
}

// SubExpression 非终结符表达式：减法
type SubExpression struct {
	left, right Expression
}

func (s *SubExpression) Interpret(ctx *Context) int {
	return s.left.Interpret(ctx) - s.right.Interpret(ctx)
}

// Parse 将形如 "5 + 3 - 2" 或 "x + y - 2" 的中缀表达式解析为表达式树。
// 仅支持 + / - 两种运算符，按从左到右顺序结合（不含优先级与括号）。
func Parse(input string) (Expression, error) {
	tokens := strings.Fields(input)
	if len(tokens) == 0 {
		return nil, fmt.Errorf("表达式为空")
	}

	var left Expression = parseTerm(tokens[0])

	for i := 1; i+1 < len(tokens); i += 2 {
		operator := tokens[i]
		right := parseTerm(tokens[i+1])

		switch operator {
		case "+":
			left = &AddExpression{left: left, right: right}
		case "-":
			left = &SubExpression{left: left, right: right}
		default:
			return nil, fmt.Errorf("不支持的运算符: %s", operator)
		}
	}

	return left, nil
}

// parseTerm 将单个词法单元解析为数字或变量终结符表达式
func parseTerm(token string) Expression {
	if value, err := strconv.Atoi(token); err == nil {
		return &NumberExpression{value: value}
	}
	return &VariableExpression{name: token}
}

func main() {
	fmt.Println("=== 解释器模式：算术表达式 ===")

	expr1 := "5 + 3 - 2"
	ast1, err := Parse(expr1)
	if err != nil {
		fmt.Println("解析错误:", err)
		return
	}
	fmt.Printf("%s = %d\n", expr1, ast1.Interpret(NewContext()))

	ctx := NewContext()
	ctx.SetVar("x", 10)
	ctx.SetVar("y", 4)

	expr2 := "x + y - 3"
	ast2, err := Parse(expr2)
	if err != nil {
		fmt.Println("解析错误:", err)
		return
	}
	fmt.Printf("%s = %d  (x=%d, y=%d)\n", expr2, ast2.Interpret(ctx), ctx.GetVar("x"), ctx.GetVar("y"))
}
