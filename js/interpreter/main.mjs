// ============================================================
// 解释器模式（Interpreter）
// 场景：算术表达式 —— 解析并求值 "5 + 3 - 2"（数字、加、减，支持上下文变量）
// ============================================================

// ---- 上下文（Context）：保存变量名到数值的映射 ----
class Context {
  #variables = new Map();

  setVariable(name, value) {
    this.#variables.set(name, value);
    return this;
  }

  getVariable(name) {
    if (!this.#variables.has(name)) {
      throw new Error(`未定义的变量: ${name}`);
    }
    return this.#variables.get(name);
  }
}

// ---- 抽象表达式（AbstractExpression）----
class Expression {
  interpret(context) {
    throw new Error('子类必须实现 interpret()');
  }
}

// ---- 终结符表达式（Terminal Expression）：数字字面量 ----
class NumberExpression extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
  interpret(_context) {
    return this.value;
  }
  toString() {
    return `${this.value}`;
  }
}

// ---- 终结符表达式：变量引用，需要从上下文中查值 ----
class VariableExpression extends Expression {
  constructor(name) {
    super();
    this.name = name;
  }
  interpret(context) {
    return context.getVariable(this.name);
  }
  toString() {
    return this.name;
  }
}

// ---- 非终结符表达式（NonTerminal Expression）：加法 ----
class AddExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
  interpret(context) {
    return this.left.interpret(context) + this.right.interpret(context);
  }
  toString() {
    return `(${this.left} + ${this.right})`;
  }
}

// ---- 非终结符表达式：减法 ----
class SubtractExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
  interpret(context) {
    return this.left.interpret(context) - this.right.interpret(context);
  }
  toString() {
    return `(${this.left} - ${this.right})`;
  }
}

// ---- 语法解析器：把形如 "5 + 3 - 2" 或 "x + y - 2" 的字符串
//      构建成一棵由 Expression 组成的抽象语法树（AST）----
// 文法（左结合、从左到右求值）:
//   expression := term (('+' | '-') term)*
//   term       := NUMBER | IDENTIFIER
class ExpressionParser {
  #tokens;
  #pos = 0;

  constructor(sentence) {
    // 简单分词：按空白切分，要求表达式书写时数字/变量/运算符之间用空格隔开
    this.#tokens = sentence.trim().split(/\s+/);
  }

  parse() {
    let expression = this.#parseTerm();
    while (this.#pos < this.#tokens.length) {
      const operator = this.#tokens[this.#pos++];
      const right = this.#parseTerm();
      if (operator === '+') {
        expression = new AddExpression(expression, right);
      } else if (operator === '-') {
        expression = new SubtractExpression(expression, right);
      } else {
        throw new Error(`无法识别的运算符: ${operator}`);
      }
    }
    return expression;
  }

  #parseTerm() {
    const token = this.#tokens[this.#pos++];
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      return new NumberExpression(Number(token));
    }
    return new VariableExpression(token);
  }
}

function evaluate(sentence, context = new Context()) {
  const ast = new ExpressionParser(sentence).parse();
  const result = ast.interpret(context);
  console.log(`表达式 "${sentence}"  =>  语法树 ${ast}  =>  结果 = ${result}`);
  return result;
}

console.log('=== 解释器模式：算术表达式求值 ===\n');

console.log('-- 纯数字表达式 --');
evaluate('5 + 3 - 2');

console.log('\n-- 含变量的表达式（上下文提供变量值）--');
const context = new Context().setVariable('x', 10).setVariable('y', 4);
evaluate('x + y - 3', context);

console.log('\n-- 同一上下文，变量值变化后重新求值 --');
context.setVariable('x', 100);
evaluate('x - y + 1', context);

console.log('\n-- 未定义变量会抛出异常 --');
try {
  evaluate('x + z', context);
} catch (err) {
  console.log('捕获到异常:', err.message);
}
