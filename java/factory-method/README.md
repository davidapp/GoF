# Factory Method 工厂方法模式（Java）

## 意图

定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。

## 适用场景

- 一个类不知道它所必须创建的对象的具体类
- 一个类希望由其子类来指定它所创建的对象
- 想把创建对象的职责委托给多个帮助子类中的某一个，又想将“是哪一个”这一信息局部化

## 实现方式

抽象类 `Logistics` 声明工厂方法 `createTransport()`，并在 `planDelivery()` 中调用它，
但并不知道具体返回的是哪种 `Transport`；子类 `RoadLogistics` / `SeaLogistics` 各自决定
产出 `Truck` 或 `Ship`：

```java
public abstract class Logistics {
    protected abstract Transport createTransport();   // 工厂方法

    public void planDelivery(String cargo) {
        Transport transport = createTransport();      // 只依赖抽象产品
        transport.deliver(cargo);
    }
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `Transport.java` | 抽象产品：运输工具接口 |
| `Truck.java` / `Ship.java` | 具体产品：卡车 / 轮船 |
| `Logistics.java` | 抽象创建者，声明工厂方法与业务逻辑 |
| `RoadLogistics.java` / `SeaLogistics.java` | 具体创建者，决定实例化哪种运输工具 |
| `Main.java` | 程序入口，演示两种物流各自的运输方式 |

## 编译与运行

```bash
cd java/factory-method
javac *.java
java Main
```

## 输出示例

```
=== 工厂方法模式：物流运输 ===

RoadLogistics 开始规划运输...
[卡车] 通过公路运输货物「一批电子元件」，预计 2 天送达

SeaLogistics 开始规划运输...
[轮船] 通过海运运输货物「一整柜家具」，预计 15 天送达
```

（预期输出：本机未安装 JDK，未实机运行）

## 要点

1. **延迟实例化** —— 具体创建什么产品的决定权下放给子类，父类只依赖抽象产品接口。
2. **符合开闭原则** —— 新增一种运输方式（如 `AirLogistics` + `Plane`）无需修改已有代码。
3. **与抽象工厂的区别** —— 工厂方法针对单一产品等级结构（这里只有 `Transport`），
   抽象工厂针对多个产品等级结构（一族产品）。
