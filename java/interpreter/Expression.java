/**
 * 抽象表达式（Abstract Expression）：声明解释操作 interpret()。
 * 数字、变量、加法、减法都实现这个接口，语法树可以递归求值。
 */
public interface Expression {
    int interpret(Context context);
}
