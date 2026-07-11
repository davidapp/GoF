/**
 * 中介者模式示例入口。
 * 场景：聊天室 —— User 通过 ChatRoom 中介收发消息，用户之间彼此解耦。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 中介者模式：聊天室 ===\n");

        ChatMediator chatRoom = new ChatRoom();

        User alice = new User("Alice", chatRoom);
        User bob = new User("Bob", chatRoom);
        User carol = new User("Carol", chatRoom);

        alice.send("大家好，我是 Alice");
        System.out.println();
        bob.send("Alice 你好，我是 Bob");
        System.out.println();
        carol.send("欢迎两位～");
    }
}
