/**
 * 具体状态（Concrete State）：已暂停。
 */
public class PausedState implements PlayerState {
    @Override
    public void play(AudioPlayer player) {
        System.out.println("[已暂停] 继续播放");
        player.setState(new PlayingState());
    }

    @Override
    public void pause(AudioPlayer player) {
        System.out.println("[已暂停] 已经是暂停状态了，忽略");
    }

    @Override
    public void stop(AudioPlayer player) {
        System.out.println("[已暂停] 停止播放");
        player.setState(new StoppedState());
    }

    @Override
    public String getName() {
        return "Paused";
    }
}
