# Factory Method 工厂方法模式（TypeScript）

## 意图
定义一个用于创建对象的接口，但让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类，客户端只依赖抽象产品与抽象创建者，无需知道具体创建了哪个类。

## 适用场景
- 一个类无法预知它必须创建的对象的类（例如具体运输方式由业务子类决定）。
- 一个类希望由其子类来指定它所创建的对象。
- 想把“对象创建”这部分逻辑集中管理并延迟到子类，复用父类中与产品无关的公共逻辑。

## 实现方式
`Transport` 是抽象产品接口，`Truck`、`Ship` 是具体产品。`Logistics` 是抽象创建者，声明抽象工厂方法 `createTransport()`，并在公共方法 `planDelivery()` 中调用它完成与具体运输方式无关的业务流程；`RoadLogistics`、`SeaLogistics` 分别重写工厂方法返回不同的运输实现：

```ts
abstract class Logistics {
  protected abstract createTransport(): Transport; // 工厂方法，交给子类实现

  planDelivery(): string {
    const transport = this.createTransport();
    return `[规划配送] ${transport.deliver()}`;
  }
}

class SeaLogistics extends Logistics {
  protected createTransport(): Transport { return new Ship(); }
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| main.ts | 工厂方法模式完整实现，演示陆运/海运两条路线 |

## 编译与运行
```bash
cd ts/factory-method
npx tsx main.ts
```

## 输出示例
```

=== 陆运路线（北京 -> 上海） ===
[规划配送] 使用卡车经陆路运输货物

=== 海运路线（上海 -> 洛杉矶） ===
[规划配送] 使用轮船经海路运输货物
```

## 要点
1. `planDelivery()` 是典型的“模板逻辑 + 可变创建步骤”组合，与模板方法模式常常配合使用。
2. 新增一种运输方式（如 `AirLogistics`/`Plane`）只需新增一对“产品 + 创建者”子类，不需要修改既有代码。
3. 与抽象工厂的区别：工厂方法通过继承（子类重写方法）定制单一产品；抽象工厂通过组合（持有工厂对象）定制一整族产品。
