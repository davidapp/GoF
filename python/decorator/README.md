# Decorator 装饰器模式（Python）

## 意图

动态地给一个对象添加额外的职责，就增加功能而言，装饰器模式比生成子类更为灵活。
装饰器与被装饰对象实现相同接口，因此可以层层嵌套包裹，运行时自由组合职责。

## 适用场景

- 需要在不影响其他对象的前提下，动态、透明地给单个对象添加职责
- 职责的组合数量很多，如果都用继承实现会产生大量子类（如"加奶+加糖+加奶油"排列组合）
- 希望这些职责可以在运行时动态撤销，而不是编译期固定

## 实现方式

`Coffee` 是抽象构件；`Espresso`/`Americano` 是具体构件；`CoffeeDecorator` 是装饰器基类，
持有一个 `Coffee` 引用并转发调用；具体装饰器在转发的基础上叠加自己的职责：

```python
class CoffeeDecorator(Coffee):
    """装饰器基类：持有一个 Coffee 引用，与被装饰对象实现同一接口"""

    def __init__(self, coffee: Coffee) -> None:
        self._coffee = coffee

    def cost(self) -> float:
        return self._coffee.cost()


class MilkDecorator(CoffeeDecorator):
    """具体装饰器：加牛奶，+4 元"""

    def cost(self) -> float:
        return super().cost() + 4.0
```

`main()` 中通过 `coffee = MilkDecorator(coffee)` 这种"用装饰器包裹自身引用"的写法，
逐层叠加出任意组合的咖啡。

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.py` | `Coffee` 抽象构件、`Espresso`/`Americano` 具体构件、`CoffeeDecorator` 及三种具体装饰器、`main()` 演示 |

## 编译与运行

```bash
python main.py
```

## 输出示例

```
--- 基础款 ---
Espresso                                      单价: 18.0 元

--- 逐层叠加装饰 ---
Espresso                                      单价: 18.0 元
Espresso + Milk                               单价: 22.0 元
Espresso + Milk + Sugar                       单价: 24.0 元
Espresso + Milk + Sugar + WhippedCream        单价: 30.0 元

--- 换一种基础咖啡，同样可以自由叠加 ---
Americano + Milk + Sugar + Sugar              单价: 23.0 元
```

## 要点

1. **接口一致，可无限嵌套** —— 装饰器与被装饰者实现同一抽象类型，因此 `MilkDecorator(SugarDecorator(Espresso()))` 这种嵌套永远合法。
2. **职责可自由排列组合** —— 加糖两次、先加奶再加糖，都是同一套装饰器类的不同组合，不需要新增类。
3. **与继承的对比** —— 若用继承实现"加奶的加糖美式"，需要 `SugaredMilkAmericano` 这样的具体子类；装饰器把每种职责拆成独立的一层，按需组合。
4. 与 Python 内建 `@decorator` 语法的关系：语言层面的函数装饰器是"装饰器模式"思想在语法糖上的应用，但本例聚焦 GoF 原始的对象组合结构，二者可对照理解。
