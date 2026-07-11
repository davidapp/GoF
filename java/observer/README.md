# Observer 观察者模式（Java）

## 意图

定义对象间一种一对多的依赖关系，当一个对象的状态发生改变时，
所有依赖它的对象都会得到通知并自动更新。

## 适用场景

- 一个对象状态的变化需要联动更新其他若干个对象，而且不知道具体有多少个、是哪些对象
- 需要在不使各类紧密耦合的前提下，实现这种联动
- 一个抽象模型有两个方面，其中一个方面依赖于另一个方面（数据 与 展示分离）

## 实现方式

`WeatherStation`（具体目标）维护 `Observer` 列表，温度变化时遍历列表逐个回调
`update()`；两块显示板各自独立实现 `Observer`，互不知道对方的存在：

```java
public class WeatherStation implements Subject {
    private final List<Observer> observers = new ArrayList<>();

    public void setTemperature(double temperature) {
        this.temperature = temperature;
        notifyObservers();          // 状态变化后统一通知
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature);
        }
    }
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `Observer.java` | 观察者接口 |
| `Subject.java` | 抽象目标接口：注册/移除/通知 |
| `WeatherStation.java` | 具体目标：气象站 |
| `CurrentConditionsDisplay.java` | 具体观察者：实时气温显示板 |
| `StatisticsDisplay.java` | 具体观察者：统计显示板（最高/最低/平均） |
| `Main.java` | 程序入口，演示注册、多次通知、以及取消订阅 |

## 编译与运行

```bash
cd java/observer
javac *.java
java Main
```

## 输出示例

```
=== 观察者模式：气象站 ===

[WeatherStation] 气温更新为 25.0°C
[实时显示板] 当前气温: 25.0°C
[统计显示板] 最高 25.0°C / 最低 25.0°C / 平均 25.0°C

[WeatherStation] 气温更新为 28.5°C
[实时显示板] 当前气温: 28.5°C
[统计显示板] 最高 28.5°C / 最低 25.0°C / 平均 26.8°C

-- 取消订阅实时显示板 --

[WeatherStation] 气温更新为 19.0°C
[统计显示板] 最高 28.5°C / 最低 19.0°C / 平均 24.2°C
```

（预期输出：本机未安装 JDK，未实机运行）

## 要点

1. **一对多的松耦合通知** —— `WeatherStation` 只依赖 `Observer` 接口，
   不需要知道具体订阅者的类型和数量。
2. **可动态订阅/取消订阅** —— `removeObserver()` 之后，`currentDisplay` 就不再收到通知，
   而 `statisticsDisplay` 完全不受影响。
3. **与 Java 内建机制的关系** —— JDK 早期提供过 `java.util.Observer`/`Observable`
   （已在新版本中废弃），如今更常见的做法是像本例这样自定义接口，
   或使用响应式编程库（如 RxJava）实现更强大的事件流。
