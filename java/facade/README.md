# Facade 外观模式（Java）

## 意图

为子系统中的一组接口提供一个一致的高层接口，外观模式定义了一个高层接口，使得子系统更容易使用。

## 适用场景

- 子系统日趋复杂，包含许多类，客户端只想要一个简单的入口
- 需要将子系统与客户端、以及未来可能加入的其他子系统解耦，减少依赖
- 希望分层设计：每一层通过一个外观类作为进出该层子系统的统一入口

## 实现方式

`HomeTheaterFacade` 持有投影仪、功放、播放器、灯光四个子系统对象，
把“观影”这一完整流程涉及的多个步骤、正确的调用顺序封装起来：

```java
public class HomeTheaterFacade {
    public void watchMovie(String movie) {
        lights.dim(10);
        projector.on();
        projector.setInput("HDMI-1");
        amplifier.on();
        amplifier.setVolume(60);
        player.on();
        player.play(movie);
    }
}
```

客户端只需要调用 `facade.watchMovie(...)` 一行代码，不需要知道投影仪要先开机、
后设置输入源，也不需要知道功放和播放器的先后顺序。

## 文件说明

| 文件 | 说明 |
|------|------|
| `Projector.java` | 子系统：投影仪 |
| `Amplifier.java` | 子系统：功放 |
| `StreamingPlayer.java` | 子系统：流媒体播放器 |
| `TheaterLights.java` | 子系统：灯光 |
| `HomeTheaterFacade.java` | 外观类，提供 `watchMovie()` / `endMovie()` 统一入口 |
| `Main.java` | 程序入口，演示一键开始/结束观影 |

## 编译与运行

```bash
cd java/facade
javac *.java
java Main
```

## 输出示例

```
=== 外观模式：家庭影院 ===

准备观影《星际穿越》...
[灯光] 调暗至 10%
[投影仪] 已开启
[投影仪] 切换输入源为 HDMI-1
[功放] 已开启
[功放] 音量设置为 60
[流媒体播放器] 已开启
[流媒体播放器] 正在播放《星际穿越》

结束观影，恢复房间状态...
[流媒体播放器] 已停止播放
[流媒体播放器] 已关闭
[功放] 已关闭
[投影仪] 已关闭
[灯光] 恢复全亮
```

（预期输出：本机未安装 JDK，未实机运行）

## 要点

1. **简化客户端调用** —— 客户端只依赖 `HomeTheaterFacade` 一个类，
   无需了解四个子系统各自的接口和正确的调用顺序。
2. **不封锁子系统** —— 外观模式不会阻止需要精细控制的高级用户直接访问子系统对象，
   `Projector`、`Amplifier` 等类的 public 方法依旧可以单独调用。
3. **降低耦合** —— 客户端与子系统之间增加了一层外观，子系统内部重构（如替换播放器实现）
   不会影响客户端代码。
