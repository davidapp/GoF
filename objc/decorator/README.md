# Decorator 装饰器模式（Objective-C）

## 意图

动态地给一个对象添加额外的职责，且不改变其类定义。相比继承，装饰器可以在运行时按需、按顺序自由叠加行为。

## 适用场景

- 需要给对象动态添加职责，且这些职责可以自由组合（加奶、加糖可任意搭配）
- 用继承来扩展会导致子类数量爆炸（Espresso、EspressoWithMilk、EspressoWithMilkAndSugar…）
- 希望在不修改原始类的前提下扩展功能

## 实现方式

`Espresso` 是具体构件；`BeverageDecorator` 是抽象装饰器，同时"是一个" `Beverage`（遵循协议）又"持有一个" `Beverage`（组合），默认把调用转发给被包装对象。`MilkDecorator`/`SugarDecorator` 重写方法，在调用 `[super cost]` 转发的基础上叠加自己的价格：

```objc
@interface BeverageDecorator : NSObject <Beverage>
- (instancetype)initWithBeverage:(id<Beverage>)beverage;
@end

@implementation MilkDecorator
- (double)cost { return [super cost] + 5.0; }  // super 转发给被包装对象，再加价
@end

// 客户端：像剥洋葱一样层层包裹
id<Beverage> drink = [[Espresso alloc] init];
drink = [[MilkDecorator alloc] initWithBeverage:drink];
drink = [[SugarDecorator alloc] initWithBeverage:drink];
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `Decorator.h` | `Beverage` 抽象构件协议、`Espresso` 具体构件、`BeverageDecorator` 抽象装饰器、`MilkDecorator`/`SugarDecorator` 具体装饰器声明 |
| `Decorator.m` | 上述类型的实现 |
| `main.m` | 依次给 Espresso 叠加牛奶、糖、再加一份糖，观察价格与描述的变化 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
Espresso 浓缩咖啡 - 单价: 20.0 元
Espresso 浓缩咖啡 + 牛奶 - 单价: 25.0 元
Espresso 浓缩咖啡 + 牛奶 + 糖 - 单价: 27.0 元
Espresso 浓缩咖啡 + 牛奶 + 糖 + 糖 - 单价: 29.0 元
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **装饰器与被装饰对象实现同一协议** —— 这是能够"层层包裹"的关键，装饰后的对象仍可以被再次装饰。
2. **组合 + 转发** —— `BeverageDecorator` 持有 `id<Beverage>` 并默认转发调用，具体装饰器只需关注自己新增的那部分逻辑。
3. **比子类继承更灵活** —— 加料的组合数是指数级的，用装饰器只需 N 个装饰类即可任意组合，而不是 2^N 个子类。
