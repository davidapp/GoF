# Observer 观察者模式（Objective-C）

## 意图

定义对象间一对多的依赖关系，当一个对象（主题）的状态发生变化时，所有依赖它的对象（观察者）都会自动收到通知并更新。

## 适用场景

- 一个对象的状态变化需要同步反映到多个其他对象上，且数量、种类在编译期不确定
- 希望发布者与订阅者之间松耦合，互不知道对方的具体类型
- 需要支持运行时动态增删观察者

## 实现方式

`WeatherStation` 是主题，维护 `id<Observer>` 列表；`setTemperature:` 一旦被调用，就遍历列表逐一通知，自己完全不知道 `PhoneDisplay`/`TVDisplay` 的存在：

```objc
@protocol Observer <NSObject>
- (void)updateTemperature:(double)temperature;
@end

- (void)setTemperature:(double)temperature {
    _temperature = temperature;
    for (id<Observer> observer in _observers) {
        [observer updateTemperature:temperature]; // 只依赖协议，不关心具体类型
    }
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `Observer.h` | 观察者协议 `Observer`、主题 `WeatherStation`、具体观察者 `PhoneDisplay`/`TVDisplay` 声明 |
| `Observer.m` | 上述类型的实现 |
| `main.m` | 两个显示器订阅气象站，更新温度；随后电视退订，再次更新验证只剩手机收到通知 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
[气象站] 温度更新为 23.5°C，通知全部 2 个观察者
  [手机 App] 当前温度: 23.5°C
  [电视天气频道] 当前温度: 23.5°C
 
=== 电视显示器退订 ===
[气象站] 温度更新为 19.0°C，通知全部 1 个观察者
  [手机 App] 当前温度: 19.0°C
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **一对多通知** —— 增加新的显示器类型只需实现 `Observer` 协议并订阅，`WeatherStation` 不必修改。
2. **松耦合** —— 主题只依赖 `Observer` 协议，不持有具体类的引用；具体观察者也不知道主题内部如何存储数据。
3. **与 Cocoa 内建机制的关系** —— Foundation 本身提供 `NSNotificationCenter`（一对多广播）和 KVO（属性级观察），思路与本例完全一致；本例手写协议版本是为了更直观地展示模式结构。
