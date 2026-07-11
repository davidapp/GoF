// 解释器模式（Interpreter）—— 算术表达式演示
//
// 为“数字 / 变量 / 加法 / 减法”各自建一个实现 Expression 的类型，
// 组合成一棵抽象语法树（AST），求值时递归调用 interpret()。
// parse() 只是一个极简的、按空格分词、从左到右求值的解析器，
// 用来把形如 "5 + 3 - 2" 的字符串搭建成 AST。

use std::collections::HashMap;

// 抽象表达式：所有语法节点的公共接口
trait Expression {
    fn interpret(&self, context: &HashMap<String, i32>) -> i32;
}

// 终结符表达式：数字字面量
struct Number(i32);
impl Expression for Number {
    fn interpret(&self, _context: &HashMap<String, i32>) -> i32 {
        self.0
    }
}

// 终结符表达式：变量，从上下文中查值
struct Variable(String);
impl Expression for Variable {
    fn interpret(&self, context: &HashMap<String, i32>) -> i32 {
        *context.get(&self.0).unwrap_or(&0)
    }
}

// 非终结符表达式：加法，组合两个子表达式
struct Add {
    left: Box<dyn Expression>,
    right: Box<dyn Expression>,
}
impl Expression for Add {
    fn interpret(&self, context: &HashMap<String, i32>) -> i32 {
        self.left.interpret(context) + self.right.interpret(context)
    }
}

// 非终结符表达式：减法
struct Subtract {
    left: Box<dyn Expression>,
    right: Box<dyn Expression>,
}
impl Expression for Subtract {
    fn interpret(&self, context: &HashMap<String, i32>) -> i32 {
        self.left.interpret(context) - self.right.interpret(context)
    }
}

// 极简解析器：按空格分词，支持“数字/变量 (+|-) 数字/变量 ...”，从左到右求值
fn parse(expression: &str) -> Box<dyn Expression> {
    let tokens: Vec<&str> = expression.split_whitespace().collect();
    let mut iter = tokens.into_iter();

    let first = iter.next().expect("表达式不能为空");
    let mut result: Box<dyn Expression> = parse_term(first);

    let rest: Vec<&str> = iter.collect();
    let mut idx = 0;
    while idx + 1 < rest.len() {
        let op = rest[idx];
        let right = parse_term(rest[idx + 1]);
        result = match op {
            "+" => Box::new(Add { left: result, right }),
            "-" => Box::new(Subtract { left: result, right }),
            other => panic!("不支持的运算符: {other}"),
        };
        idx += 2;
    }

    result
}

// 把单个 token 解析成数字字面量或变量
fn parse_term(token: &str) -> Box<dyn Expression> {
    match token.parse::<i32>() {
        Ok(n) => Box::new(Number(n)),
        Err(_) => Box::new(Variable(token.to_string())),
    }
}

fn main() {
    println!("=== 解释器模式：算术表达式演示 ===\n");

    let empty_context: HashMap<String, i32> = HashMap::new();

    let expr1 = "5 + 3 - 2";
    let ast1 = parse(expr1);
    println!("表达式 \"{}\" = {}", expr1, ast1.interpret(&empty_context));

    let mut ctx2 = HashMap::new();
    ctx2.insert("x".to_string(), 10);
    ctx2.insert("y".to_string(), 4);
    let expr2 = "x + y - 3";
    let ast2 = parse(expr2);
    println!(
        "表达式 \"{}\"（x=10, y=4） = {}",
        expr2,
        ast2.interpret(&ctx2)
    );

    let expr3 = "100 - x + y";
    let ast3 = parse(expr3);
    println!(
        "表达式 \"{}\"（x=10, y=4） = {}",
        expr3,
        ast3.interpret(&ctx2)
    );
}
