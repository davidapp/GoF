/**
 * 同事类（Colleague）：聊天室里的用户。
 * 发消息时不直接调用其他 User，而是转交给中介者 ChatMediator 去分发，
 * User 之间互不知道彼此的存在，彼此解耦，新增/移除用户不影响其他用户的代码。
 */
public class User {
    private final String name;
    private final ChatMediator mediator;

    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
        mediator.register(this);
    }

    public String getName() {
        return name;
    }

    public void send(String message) {
        System.out.println("[" + name + " 发送]: " + message);
        mediator.sendMessage(this, message);
    }

    public void receive(String from, String message) {
        System.out.println("  [" + name + " 收到来自 " + from + " 的消息]: " + message);
    }
}
