# Visitor 访问者模式（Java）

## 意图

表示一个作用于某对象结构中各元素的操作，使得可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

## 适用场景

- 一个对象结构（如一批图形）相对稳定，但经常需要在其上定义新的、不相关的操作
  （求面积、渲染、导出、序列化……），不希望每加一个操作就去改一遍所有元素类
- 元素类的种类很少变化，但操作的种类经常增加
- 需要对结构中各元素做的操作依赖于它们的具体类型（需要区分 Circle 还是 Rectangle）

## 实现方式

利用 **双分派**：`Shape.accept(visitor)` 第一次分派（多态调用到具体子类的 `accept`），
子类内部 `visitor.visit(this)` 第二次分派（编译期已知 `this` 的具体类型，精确匹配到
`ShapeVisitor` 对应的重载方法）：

```java
public sealed interface Shape permits Circle, Rectangle {
    void accept(ShapeVisitor visitor);
}

public final class Circle implements Shape {
    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);      // this 是 Circle，分派到 visit(Circle)
    }
}

public interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}
```

新增一种操作（如计算周长）只需新增一个 `ShapeVisitor` 实现类，`Shape`/`Circle`/`Rectangle`
都不需要改动；但反过来，新增一种图形（如 `Triangle`）就需要修改 `ShapeVisitor` 接口
及其所有实现类——这是访问者模式典型的取舍。`Shape` 用 Java 17 的 `sealed interface`
搭配 `permits Circle, Rectangle` 显式封闭了元素类型的集合，恰好把这种“类型集合稳定”
的假设从注释里的约定变成了编译器可以校验的事实。

## 文件说明

| 文件 | 说明 |
|------|------|
| `Shape.java` | 抽象元素接口 |
| `Circle.java` / `Rectangle.java` | 具体元素 |
| `ShapeVisitor.java` | 抽象访问者接口 |
| `AreaVisitor.java` | 具体访问者：计算面积 |
| `DrawVisitor.java` | 具体访问者：渲染图形 |
| `Main.java` | 程序入口，对同一组图形分别应用两种访问者 |

## 编译与运行

```bash
cd java/visitor
javac *.java
java Main
```

## 输出示例

```
=== 访问者模式：图形操作 ===

-- 使用 DrawVisitor 渲染 --
画一个半径为 2.0 的圆 ○
画一个 3.0 x 4.0 的矩形 □
画一个半径为 1.5 的圆 ○

-- 使用 AreaVisitor 求面积 --
圆形(半径=2.0) 面积 = 12.57
矩形(3.0 x 4.0) 面积 = 12.00
圆形(半径=1.5) 面积 = 7.07
总面积 = 31.63
```

（预期输出：本机未安装 JDK，未实机运行；浮点数末位以实际运行为准）

## 要点

1. **双分派** —— `accept()` + `visit()` 两次方法派发，让操作能够精确识别出元素的具体类型，
   而不需要在 Visitor 内部写 `instanceof` 判断。
2. **操作与数据结构分离** —— 图形的数据结构（Circle/Rectangle）与作用于它们的算法
   （求面积/渲染）分别维护，符合单一职责原则。
3. **权衡** —— 访问者模式让“新增操作”很容易，但“新增元素类型”很麻烦
   （需要改 `ShapeVisitor` 接口及所有实现类），适用于元素种类稳定、操作种类多变的场景。
4. **sealed 加固封闭性** —— `permits Circle, Rectangle` 意味着任何人都无法在别处偷偷新增一个
   实现 `Shape` 的类却忘记同步更新 `ShapeVisitor`，编译器会在 `permits` 之外的实现处直接报错。
