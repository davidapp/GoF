/**
 * 解释器模式示例入口。
 * 场景：解析并求值算术表达式 "5 + 3 - 2"（数字、加、减，支持上下文变量）。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 解释器模式：算术表达式求值 ===\n");

        Context context = new Context();

        String expr1 = "5 + 3 - 2";
        Expression tree1 = parse(expr1);
        System.out.println("表达式  : " + expr1);
        System.out.println("语法树  : " + tree1);
        System.out.println("求值结果: " + tree1.interpret(context));

        System.out.println();

        context.setVariable("x", 10);
        context.setVariable("y", 4);
        String expr2 = "x + 3 - y";
        Expression tree2 = parse(expr2);
        System.out.println("表达式  : " + expr2 + "  (上下文: x=10, y=4)");
        System.out.println("语法树  : " + tree2);
        System.out.println("求值结果: " + tree2.interpret(context));
    }

    /**
     * 简易递归下降解析器：把 "5 + 3 - 2" 这样按空格分词的字符串解析成表达式语法树。
     * 只支持数字/变量、+、- ，且从左到右结合（不处理优先级和括号），足以演示解释器模式。
     */
    private static Expression parse(String input) {
        String[] tokens = input.trim().split("\\s+");
        Expression result = parseOperand(tokens[0]);

        int i = 1;
        while (i < tokens.length) {
            String operator = tokens[i];
            Expression next = parseOperand(tokens[i + 1]);
            result = switch (operator) {
                case "+" -> new AddExpression(result, next);
                case "-" -> new SubtractExpression(result, next);
                default -> throw new IllegalArgumentException("不支持的运算符: " + operator);
            };
            i += 2;
        }
        return result;
    }

    private static Expression parseOperand(String token) {
        if (Character.isDigit(token.charAt(0))) {
            return new NumberExpression(Integer.parseInt(token));
        }
        return new VariableExpression(token);
    }
}
