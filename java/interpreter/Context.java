import java.util.HashMap;
import java.util.Map;

/**
 * 上下文（Context）：保存解释过程中用到的变量取值，例如 "x" -> 10。
 * VariableExpression 在求值时会从这里查找变量的实际值。
 */
public class Context {
    private final Map<String, Integer> variables = new HashMap<>();

    public void setVariable(String name, int value) {
        variables.put(name, value);
    }

    public int getVariable(String name) {
        Integer value = variables.get(name);
        if (value == null) {
            throw new IllegalArgumentException("未定义的变量: " + name);
        }
        return value;
    }
}
