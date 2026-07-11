# Abstract Factory 抽象工厂模式（TypeScript）

## 意图
提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们的具体类。客户端只面向抽象工厂与抽象产品编程，切换整套产品族（例如从 Windows 风格切换到 macOS 风格）只需替换具体工厂实现，无需改动客户端代码。

## 适用场景
- 系统需要独立于其产品的创建、组合和表示方式。
- 系统需要由多个产品族中的一个来配置（如按操作系统切换整套 UI 控件）。
- 需要保证同一产品族内的对象被一起使用，防止跨族混用（如 Windows 按钮配上了 macOS 复选框）。
- 想对客户端隐藏具体产品类，只暴露产品的抽象接口。

## 实现方式
定义 `Button`、`Checkbox` 两个抽象产品接口；`WindowsButton`/`MacButton`、`WindowsCheckbox`/`MacCheckbox` 是对应平台的具体产品。`GUIFactory` 是抽象工厂接口，声明 `createButton()` / `createCheckbox()`；`WindowsFactory`、`MacFactory` 是具体工厂，各自只生产本平台配套的控件。客户端函数 `renderUI(factory: GUIFactory)` 全程只依赖抽象接口：

```ts
// 抽象工厂：声明创建一族产品的接口
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// 具体工厂：只生产 Windows 风格的成套控件
class WindowsFactory implements GUIFactory {
  createButton(): Button { return new WindowsButton(); }
  createCheckbox(): Checkbox { return new WindowsCheckbox(); }
}
```

`main()` 中通过 `createFactory(platform)` 按平台名称选出具体工厂，再传入 `renderUI` 统一渲染，体现“同一套客户端代码 + 不同工厂 = 不同产品族”。

## 文件说明
| 文件 | 说明 |
|------|------|
| main.ts | 抽象工厂模式完整实现与运行示例（含 Windows / macOS 两套产品族） |

## 编译与运行
```bash
cd ts/abstract-factory
npx tsx main.ts
```

## 输出示例
```

=== 目标平台：windows ===
[Windows 按钮：方形边框]
Windows 按钮被点击（播放系统提示音）
[Windows 复选框：□]
Windows 复选框切换为 ☑

=== 目标平台：macos ===
[macOS 按钮：圆角边框]
macOS 按钮被点击（轻触反馈）
[macOS 复选框：圆形]
macOS 复选框切换为 ●
```

## 要点
1. 抽象工厂保证同一产品族内的对象始终配套使用，客户端不会意外混用不同风格的控件。
2. 新增产品族（如 Linux）只需新增一个实现 `GUIFactory` 的具体工厂类，符合开闭原则。
3. 新增产品等级结构（如再加一个 `Slider` 控件）则必须修改抽象工厂接口及所有具体工厂，这是该模式相对固定的代价。
4. 与工厂方法模式的区别：抽象工厂强调"一族"产品，工厂方法只关注单一产品的创建。
