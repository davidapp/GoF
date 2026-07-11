/**
 * 具体状态（Concrete State）：播放中。
 */
public class PlayingState implements PlayerState {
    @Override
    public void play(AudioPlayer player) {
        System.out.println("[播放中] 已经在播放了，忽略");
    }

    @Override
    public void pause(AudioPlayer player) {
        System.out.println("[播放中] 暂停播放");
        player.setState(new PausedState());
    }

    @Override
    public void stop(AudioPlayer player) {
        System.out.println("[播放中] 停止播放");
        player.setState(new StoppedState());
    }

    @Override
    public String getName() {
        return "Playing";
    }
}
