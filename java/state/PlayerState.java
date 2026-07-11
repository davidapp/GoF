/**
 * 抽象状态（State）：定义播放器在各个状态下都需要响应的操作。
 * 不同状态对同一操作的响应各不相同，具体行为下放给各个实现类。
 */
public interface PlayerState {
    void play(AudioPlayer player);

    void pause(AudioPlayer player);

    void stop(AudioPlayer player);

    String getName();
}
