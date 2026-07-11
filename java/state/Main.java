/**
 * 状态模式示例入口。
 * 场景：音频播放器在 Playing/Paused/Stopped 状态下，play/pause/stop 行为各不相同。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 状态模式：音频播放器 ===\n");

        AudioPlayer player = new AudioPlayer();
        System.out.println("初始状态: " + player.getState().getName());

        System.out.println("\n-- 按下播放 --");
        player.pressPlay();

        System.out.println("\n-- 按下暂停 --");
        player.pressPause();

        System.out.println("\n-- 再按一次暂停（无效操作）--");
        player.pressPause();

        System.out.println("\n-- 按下播放（从暂停恢复）--");
        player.pressPlay();

        System.out.println("\n-- 按下停止 --");
        player.pressStop();

        System.out.println("\n-- 停止状态下按下暂停（无效操作）--");
        player.pressPause();
    }
}
