# Observer 观察者模式（Rust）

## 意图
定义对象间一种一对多的依赖关系，使得每当一个对象（主题）改变状态时，所有依赖它的对象（观察者）都会自动得到通知并更新。

## 适用场景
- 一个对象状态改变需要联动更新多个其他对象，且更新对象的数量/类型运行时才能确定
- 希望主题和观察者松耦合：主题只知道观察者实现了某个接口，不知道具体是谁
- 需要支持动态增加/移除观察者

## 实现方式
`WeatherStation`（主题）持有一组 `Rc<RefCell<dyn Observer>>`；状态变化时遍历这组观察者，
逐个调用其 `update`。因为显示屏既要被 `WeatherStation` 持有用于广播通知，又希望主程序
能在广播之外单独读取其状态，这里用 `Rc<RefCell<dyn Observer>>` 实现共享可变：

```rust
fn notify_observers(&self) {
    for observer in self.observers.iter() {
        observer.borrow_mut().update(self.temperature, self.humidity);
    }
}
```

注册时需要把具体类型（如 `Rc<RefCell<CurrentConditionsDisplay>>`）转成
`Rc<RefCell<dyn Observer>>`，用 `as` 显式做 trait 对象强转：

```rust
station.register(Rc::clone(&current_display) as Rc<RefCell<dyn Observer>>);
```

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.rs` | `Observer` 接口、`CurrentConditionsDisplay`/`StatisticsDisplay` 具体观察者、`WeatherStation` 主题、`main()` 演示 |

## 编译与运行
```bash
rustc main.rs && ./main
```

## 输出示例
```
=== 观察者模式：气象站演示 ===

-- 气象站更新: 温度 25.0°C, 湿度 65.0% --
[实时状况显示屏] 当前温度: 25.0°C, 湿度: 65.0%
[统计显示屏] 最高: 25.0°C, 最低: 25.0°C, 平均: 25.0°C

-- 气象站更新: 温度 28.0°C, 湿度 70.0% --
[实时状况显示屏] 当前温度: 28.0°C, 湿度: 70.0%
[统计显示屏] 最高: 28.0°C, 最低: 25.0°C, 平均: 26.5°C

-- 气象站更新: 温度 22.0°C, 湿度 55.0% --
[实时状况显示屏] 当前温度: 22.0°C, 湿度: 55.0%
[统计显示屏] 最高: 28.0°C, 最低: 22.0°C, 平均: 25.0°C

[主程序独立读取] 统计显示屏累计读数次数: 3
```
（预期输出（本机未安装 Rust，未实机运行）。）

## 要点
1. **`Rc<RefCell<dyn Observer>>` 兼顾共享与独立访问** —— 主程序在广播循环之外，
   仍能通过 `stats_display.borrow().readings` 单独读取某个观察者的最新状态。
2. **`as Rc<RefCell<dyn Observer>>` 完成 trait 对象强转** —— 具体类型到 trait 对象的
   强转是标准的“非固定大小类型转换”，写明目标类型可以避免依赖隐式推断带来的歧义。
3. **观察者之间互不感知** —— `CurrentConditionsDisplay` 和 `StatisticsDisplay`
   互相不知道对方存在，新增第三种显示屏只需要实现 `Observer` 并注册，无需改动主题。
4. **每次 `borrow_mut()` 都在同一条语句内完成** —— 循环体中每次只对一个观察者
   做短暂的可变借用，不会与其他观察者或后续读取（如 `stats_display.borrow()`）产生冲突。
