/**
 * 指挥者（Director）：封装几种常见的预设组装流程。
 * 客户端不必了解每种机型该如何搭配部件，直接调用对应预设方法即可；
 * 若想要完全自定义配置，客户端也可以绕开 Director 直接操作 Builder。
 */
public class ComputerDirector {
    /** 办公用机：够用即可，不需要独立显卡 */
    public Computer buildOfficeComputer(Computer.Builder builder) {
        return builder.cpu("Intel i3-13100")
                .memoryGb(8)
                .storageGb(256)
                .build();
    }

    /** 游戏主机：高性能 CPU + 独立显卡 */
    public Computer buildGamingComputer(Computer.Builder builder) {
        return builder.cpu("Intel i9-14900K")
                .memoryGb(32)
                .storageGb(1024)
                .gpu("NVIDIA RTX 4090")
                .build();
    }

    /** 服务器：大内存大存储，不需要独立显卡 */
    public Computer buildServerComputer(Computer.Builder builder) {
        return builder.cpu("AMD EPYC 9654")
                .memoryGb(128)
                .storageGb(4096)
                .build();
    }
}
