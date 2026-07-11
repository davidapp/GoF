/**
 * 抽象中介者（Mediator）：定义与各个 User（同事对象）通信的接口。
 */
public interface ChatMediator {
    void register(User user);

    void sendMessage(User sender, String message);
}
