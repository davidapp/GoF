/**
 * 具体状态（Concrete State）：已停止。
 */
public class StoppedState implements PlayerState {
    @Override
    public void play(AudioPlayer player) {
        System.out.println("[已停止] 开始播放");
        player.setState(new PlayingState());
    }

    @Override
    public void pause(AudioPlayer player) {
        System.out.println("[已停止] 尚未播放，无法暂停");
    }

    @Override
    public void stop(AudioPlayer player) {
        System.out.println("[已停止] 已经是停止状态了，忽略");
    }

    @Override
    public String getName() {
        return "Stopped";
    }
}
