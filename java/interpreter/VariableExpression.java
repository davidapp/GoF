/**
 * 终结符表达式（Terminal Expression）：变量，具体数值需要在 Context 中查找。
 */
public class VariableExpression implements Expression {
    private final String name;

    public VariableExpression(String name) {
        this.name = name;
    }

    @Override
    public int interpret(Context context) {
        return context.getVariable(name);
    }

    @Override
    public String toString() {
        return name;
    }
}
