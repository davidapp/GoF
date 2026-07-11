/**
 * 访问者模式（Visitor）
 * 场景：图形 —— 对 Circle / Rectangle 施加 AreaVisitor（求面积）/
 *       DrawVisitor（渲染）等不同操作，且不修改图形类本身。
 *
 * 核心思想：将作用于某对象结构中各元素的操作封装到独立的访问者对象中，
 * 使得可以在不改变各元素类的前提下定义新的操作（双分派：
 * element.accept(visitor) 内部再调用 visitor.visitXxx(this)）。
 */

// ---------- 访问者接口（Visitor）：为每种具体元素声明一个 visit 方法 ----------
interface ShapeVisitor {
  visitCircle(circle: Circle): void;
  visitRectangle(rectangle: Rectangle): void;
}

// ---------- 元素接口（Element） ----------
interface Shape {
  accept(visitor: ShapeVisitor): void;
}

// ---------- 具体元素（Concrete Element） ----------
class Circle implements Shape {
  constructor(public readonly radius: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this); // 双分派：把自身类型交给 visitor 决定具体行为
  }
}

class Rectangle implements Shape {
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitRectangle(this);
  }
}

// ---------- 具体访问者（Concrete Visitor）：求面积 ----------
class AreaVisitor implements ShapeVisitor {
  private totalArea = 0;

  visitCircle(circle: Circle): void {
    const area = Math.PI * circle.radius ** 2;
    console.log(`  圆形(半径=${circle.radius}) 面积 = ${area.toFixed(2)}`);
    this.totalArea += area;
  }

  visitRectangle(rectangle: Rectangle): void {
    const area = rectangle.width * rectangle.height;
    console.log(`  矩形(${rectangle.width}x${rectangle.height}) 面积 = ${area.toFixed(2)}`);
    this.totalArea += area;
  }

  getTotalArea(): number {
    return this.totalArea;
  }
}

// ---------- 具体访问者（Concrete Visitor）：渲染绘制 ----------
class DrawVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    console.log(`  绘制 ○ 圆形，半径=${circle.radius}`);
  }
  visitRectangle(rectangle: Rectangle): void {
    console.log(`  绘制 □ 矩形，${rectangle.width}x${rectangle.height}`);
  }
}

// ---------- 对象结构（Object Structure）+ 演示 ----------
function main(): void {
  const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(4, 6),
    new Circle(2),
    new Rectangle(10, 3),
  ];

  console.log("=== 使用 DrawVisitor 渲染所有图形 ===");
  const drawVisitor = new DrawVisitor();
  for (const shape of shapes) {
    shape.accept(drawVisitor);
  }

  console.log("\n=== 使用 AreaVisitor 计算所有图形面积（无需修改 Shape 类） ===");
  const areaVisitor = new AreaVisitor();
  for (const shape of shapes) {
    shape.accept(areaVisitor);
  }
  console.log(`总面积 = ${areaVisitor.getTotalArea().toFixed(2)}`);
}

main();
