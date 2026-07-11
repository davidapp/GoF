/**
 * 建造者模式示例入口。
 * 场景：分步组装 Computer（CPU/内存/存储/GPU），Director 提供预设配置，
 * 同时也允许客户端跳过 Director、直接用 Builder 链式调用来自定义配置。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 建造者模式：分步组装 Computer ===\n");

        var director = new ComputerDirector();

        System.out.println("[预设：办公用机]");
        var office = director.buildOfficeComputer(new Computer.Builder());
        System.out.println(office);

        System.out.println("[预设：游戏主机]");
        var gaming = director.buildGamingComputer(new Computer.Builder());
        System.out.println(gaming);

        System.out.println("[预设：服务器]");
        var server = director.buildServerComputer(new Computer.Builder());
        System.out.println(server);

        System.out.println("[自定义配置：不经过 Director，直接用 Builder 链式调用]");
        var custom = new Computer.Builder()
                .cpu("Apple M3 Max")
                .memoryGb(64)
                .storageGb(2048)
                .gpu("Apple 40-core GPU")
                .build();
        System.out.println(custom);
    }
}
