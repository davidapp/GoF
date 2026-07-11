/**
 * 命令接口（Command）：把一个请求封装成对象，从而可以用不同的请求参数化调用者，
 * 并且统一支持撤销（undo）操作。
 */
public interface Command {
    void execute();

    void undo();
}
