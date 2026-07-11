/**
 * 终结符表达式（Terminal Expression）：数字字面量，求值就是它本身，不依赖上下文。
 */
public class NumberExpression implements Expression {
    private final int value;

    public NumberExpression(int value) {
        this.value = value;
    }

    @Override
    public int interpret(Context context) {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }
}
