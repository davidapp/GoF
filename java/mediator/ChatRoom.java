import java.util.ArrayList;
import java.util.List;

/**
 * 具体中介者（Concrete Mediator）：聊天室。
 * 持有所有注册用户，负责把某个用户发送的消息转发给其余所有用户，
 * 用户增多也只需要在这里维护一份列表，不会造成 User 之间 N×N 的直接引用。
 */
public class ChatRoom implements ChatMediator {
    private final List<User> users = new ArrayList<>();

    @Override
    public void register(User user) {
        users.add(user);
    }

    @Override
    public void sendMessage(User sender, String message) {
        for (User user : users) {
            if (user != sender) {
                user.receive(sender.getName(), message);
            }
        }
    }
}
