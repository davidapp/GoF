# Template Method 模板方法模式（Python）

## 意图

在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中实现。模板方法使得
子类可以在不改变算法结构的情况下，重新定义算法中的某些特定步骤。

## 适用场景

- 多个类的算法流程相似，只是其中一部分步骤的具体实现不同
- 希望通过集中管理算法骨架来避免代码重复，同时把可变部分留给子类
- 需要控制子类的扩展点：只允许子类改写指定的几个步骤，而不是整个流程

## 实现方式

`Beverage.prepare()` 是模板方法，固定了"烧水 → 冲泡 → 倒杯 → （可选）加料"的流程；
`_brew()`/`_add_condiments()` 是抽象步骤，必须由子类实现；`_wants_condiments()`
是**钩子方法**（Hook），提供默认实现但允许子类重写以介入流程：

```python
class Beverage(ABC):
    def prepare(self) -> None:
        """模板方法：固定了算法骨架"""
        self._boil_water()
        self._brew()
        self._pour_in_cup()
        if self._wants_condiments():   # 钩子方法，决定是否执行加料这一步
            self._add_condiments()

    def _wants_condiments(self) -> bool:
        return True  # 默认加料，子类可重写


class BlackCoffee(Coffee):
    def _wants_condiments(self) -> bool:
        return False  # 黑咖啡跳过加料这一步
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.py` | `Beverage` 抽象类（含模板方法与钩子）、`Tea`/`Coffee`/`BlackCoffee` 具体类、`main()` 演示 |

## 编译与运行

```bash
python main.py
```

## 输出示例

```
=== 开始冲泡 茶 ===
  烧开水
  用沸水浸泡茶叶
  倒入杯中
  加柠檬
=== 茶 冲泡完成 ===

=== 开始冲泡 咖啡 ===
  烧开水
  用沸水冲煮咖啡粉
  倒入杯中
  加糖和牛奶
=== 咖啡 冲泡完成 ===

=== 开始冲泡 黑咖啡 ===
  烧开水
  用沸水冲煮咖啡粉
  倒入杯中
  （跳过加料，客人要求原味）
=== 黑咖啡 冲泡完成 ===
```

## 要点

1. **好莱坞原则（"别调用我们，我们会调用你"）** —— 子类只需实现 `_brew`/`_add_condiments` 这两个"空位"，由父类的 `prepare()` 在恰当的时机反过来调用它们。
2. **钩子方法提供可选扩展点** —— `_wants_condiments()` 让 `BlackCoffee` 无需重写整个 `prepare()` 流程，只需重写一个布尔判断即可跳过某一步。
3. **`BlackCoffee` 复用 `Coffee` 的冲泡步骤** —— 体现模板方法与继承结合的典型用法：先复用大部分实现，再对个别环节做二次定制。
4. Python 没有语言层面的 `final` 关键字来强制"模板方法不可被子类重写"，本例通过命名约定（子类只重写以 `_` 开头的"步骤"方法，不重写 `prepare`）来表达这层设计意图。
