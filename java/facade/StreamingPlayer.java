/**
 * 子系统类（Subsystem）：流媒体播放器。
 */
public class StreamingPlayer {
    public void on() {
        System.out.println("[流媒体播放器] 已开启");
    }

    public void play(String movie) {
        System.out.println("[流媒体播放器] 正在播放《" + movie + "》");
    }

    public void stop() {
        System.out.println("[流媒体播放器] 已停止播放");
    }

    public void off() {
        System.out.println("[流媒体播放器] 已关闭");
    }
}
