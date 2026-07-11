/**
 * 非终结符表达式（Non-terminal Expression）：减法，组合左右两个子表达式。
 */
public class SubtractExpression implements Expression {
    private final Expression left;
    private final Expression right;

    public SubtractExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Context context) {
        return left.interpret(context) - right.interpret(context);
    }

    @Override
    public String toString() {
        return "(" + left + " - " + right + ")";
    }
}
