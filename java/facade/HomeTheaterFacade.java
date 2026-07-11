/**
 * 外观（Facade）：为投影仪/功放/播放器/灯光等子系统提供统一的高层接口。
 * 客户端只需调用 watchMovie()/endMovie()，无需了解各子系统之间的调用顺序与协作细节。
 */
public class HomeTheaterFacade {
    private final Projector projector;
    private final Amplifier amplifier;
    private final StreamingPlayer player;
    private final TheaterLights lights;

    public HomeTheaterFacade(Projector projector, Amplifier amplifier,
                              StreamingPlayer player, TheaterLights lights) {
        this.projector = projector;
        this.amplifier = amplifier;
        this.player = player;
        this.lights = lights;
    }

    /** 一键开始观影：协调所有子系统按正确顺序启动 */
    public void watchMovie(String movie) {
        System.out.println("准备观影《" + movie + "》...");
        lights.dim(10);
        projector.on();
        projector.setInput("HDMI-1");
        amplifier.on();
        amplifier.setVolume(60);
        player.on();
        player.play(movie);
    }

    /** 一键结束观影：按相反顺序依次关闭，恢复房间状态 */
    public void endMovie() {
        System.out.println("结束观影，恢复房间状态...");
        player.stop();
        player.off();
        amplifier.off();
        projector.off();
        lights.on();
    }
}
