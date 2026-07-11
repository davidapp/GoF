import Foundation

// 原型模式：克隆 Shape
// 场景：克隆 Circle / Rectangle，复制颜色、位置等属性

// MARK: - 颜色（值类型，天然支持拷贝）
struct Color: CustomStringConvertible {
    var r: Int
    var g: Int
    var b: Int
    var description: String { "RGB(\(r),\(g),\(b))" }
}

// MARK: - 原型基类：声明 clone() 接口
class Shape {
    var x: Int
    var y: Int
    var color: Color

    init(x: Int, y: Int, color: Color) {
        self.x = x
        self.y = y
        self.color = color
    }

    // 拷贝初始化：子类通过它复制父类部分的状态
    init(cloning other: Shape) {
        self.x = other.x
        self.y = other.y
        self.color = other.color
    }

    // 原型方法：子类必须覆盖，返回复制了自身完整状态的新实例
    func clone() -> Shape {
        Shape(cloning: self)
    }

    func describe() -> String {
        "位于(\(x), \(y))，颜色 \(color)"
    }
}

// MARK: - 具体原型：圆形
final class Circle: Shape {
    var radius: Int

    init(x: Int, y: Int, color: Color, radius: Int) {
        self.radius = radius
        super.init(x: x, y: y, color: color)
    }

    init(cloning other: Circle) {
        self.radius = other.radius
        super.init(cloning: other)
    }

    override func clone() -> Shape {
        Circle(cloning: self)
    }

    override func describe() -> String {
        "圆形[半径=\(radius)] \(super.describe())"
    }
}

// MARK: - 具体原型：矩形
final class Rectangle: Shape {
    var width: Int
    var height: Int

    init(x: Int, y: Int, color: Color, width: Int, height: Int) {
        self.width = width
        self.height = height
        super.init(x: x, y: y, color: color)
    }

    init(cloning other: Rectangle) {
        self.width = other.width
        self.height = other.height
        super.init(cloning: other)
    }

    override func clone() -> Shape {
        Rectangle(cloning: self)
    }

    override func describe() -> String {
        "矩形[宽=\(width) 高=\(height)] \(super.describe())"
    }
}

// MARK: - 顶层入口
print("=== 原型模式：克隆 Shape ===\n")

let originalCircle = Circle(x: 10, y: 20, color: Color(r: 255, g: 0, b: 0), radius: 5)
let clonedCircle = originalCircle.clone()
clonedCircle.x = 100
clonedCircle.color = Color(r: 0, g: 255, b: 0)

print("原始圆形: \(originalCircle.describe())")
print("克隆圆形: \(clonedCircle.describe())")
print("二者是否为同一实例: \(originalCircle === clonedCircle)")

print("\n批量克隆一组 Shape：")
let originalRect = Rectangle(x: 0, y: 0, color: Color(r: 0, g: 0, b: 255), width: 30, height: 40)
let shapes: [Shape] = [originalCircle, originalRect]
for shape in shapes {
    let copy = shape.clone()
    print("  原型: \(shape.describe())  ->  克隆: \(copy.describe())")
}
