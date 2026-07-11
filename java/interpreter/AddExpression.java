/**
 * 非终结符表达式（Non-terminal Expression）：加法，组合左右两个子表达式。
 */
public class AddExpression implements Expression {
    private final Expression left;
    private final Expression right;

    public AddExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Context context) {
        return left.interpret(context) + right.interpret(context);
    }

    @Override
    public String toString() {
        return "(" + left + " + " + right + ")";
    }
}
