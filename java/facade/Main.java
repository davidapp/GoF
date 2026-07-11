/**
 * 外观模式示例入口。
 * 场景：HomeTheaterFacade 一键 watchMovie()，内部协调投影仪/功放/灯光/播放器。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 外观模式：家庭影院 ===\n");

        var facade = new HomeTheaterFacade(
                new Projector(), new Amplifier(), new StreamingPlayer(), new TheaterLights());

        facade.watchMovie("星际穿越");
        System.out.println();
        facade.endMovie();
    }
}
