import Foundation

// 访问者模式：图形操作
// 场景：对 Circle/Rectangle 施加 AreaVisitor（求面积）/ DrawVisitor（渲染）等操作

// MARK: - 访问者协议：为每种具体元素声明一个重载的访问方法
protocol ShapeVisitor {
    func visit(_ circle: Circle) -> String
    func visit(_ rectangle: Rectangle) -> String
}

// MARK: - 元素协议：接受访问者（双重分派的第一跳：动态分派到具体元素的 accept）
protocol ShapeElement {
    func accept(_ visitor: ShapeVisitor) -> String
}

// MARK: - 具体元素：圆形
struct Circle: ShapeElement {
    let radius: Double

    func accept(_ visitor: ShapeVisitor) -> String {
        visitor.visit(self)   // 双重分派的第二跳：self 的静态类型 Circle 决定重载版本
    }
}

// MARK: - 具体元素：矩形
struct Rectangle: ShapeElement {
    let width: Double
    let height: Double

    func accept(_ visitor: ShapeVisitor) -> String {
        visitor.visit(self)
    }
}

// MARK: - 具体访问者：计算面积
struct AreaVisitor: ShapeVisitor {
    func visit(_ circle: Circle) -> String {
        let area = Double.pi * circle.radius * circle.radius
        return "圆形(半径=\(circle.radius)) 面积 = \(String(format: "%.2f", area))"
    }

    func visit(_ rectangle: Rectangle) -> String {
        let area = rectangle.width * rectangle.height
        return "矩形(\(rectangle.width) x \(rectangle.height)) 面积 = \(String(format: "%.2f", area))"
    }
}

// MARK: - 具体访问者：渲染图形（模拟绘制描述）
struct DrawVisitor: ShapeVisitor {
    func visit(_ circle: Circle) -> String {
        "画一个半径为 \(circle.radius) 的圆 ○"
    }

    func visit(_ rectangle: Rectangle) -> String {
        "画一个 \(rectangle.width) x \(rectangle.height) 的矩形 □"
    }
}

// MARK: - 顶层入口
print("=== 访问者模式：图形操作 ===\n")

let shapes: [ShapeElement] = [
    Circle(radius: 3),
    Rectangle(width: 4, height: 5),
    Circle(radius: 1.5)
]

let areaVisitor = AreaVisitor()
let drawVisitor = DrawVisitor()

print("[计算面积 - AreaVisitor]")
for shape in shapes {
    print(shape.accept(areaVisitor))
}

print("\n[渲染图形 - DrawVisitor]")
for shape in shapes {
    print(shape.accept(drawVisitor))
}
