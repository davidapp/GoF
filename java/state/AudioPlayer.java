/**
 * 上下文（Context）：音频播放器。
 * 把 play/pause/stop 请求委托给当前状态对象处理，自身不含状态判断的 if/else 分支；
 * 状态的切换由具体状态类主动调用 player.setState(...) 完成。
 */
public class AudioPlayer {
    private PlayerState state;

    public AudioPlayer() {
        this.state = new StoppedState(); // 初始状态：停止
    }

    public void setState(PlayerState state) {
        System.out.println("  (状态切换: " + this.state.getName() + " -> " + state.getName() + ")");
        this.state = state;
    }

    public PlayerState getState() {
        return state;
    }

    public void pressPlay() {
        state.play(this);
    }

    public void pressPause() {
        state.pause(this);
    }

    public void pressStop() {
        state.stop(this);
    }
}
