// ============================================================
// 访问者模式（Visitor）
// 场景：图形 —— 对 Circle/Rectangle 施加 AreaVisitor（求面积）/
//       DrawVisitor（渲染）等操作，且不修改图形类本身
// ============================================================

// ---- 抽象元素（Element）：约定 accept() 接口，接纳访问者 ----
class Shape {
  accept(visitor) {
    throw new Error('子类必须实现 accept()');
  }
}

// ---- 具体元素：圆形 ----
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  // 双重分派（Double Dispatch）的关键：
  // 具体调用哪个 visit 方法，由 Circle 自己决定（visitCircle），
  // 而非由 visitor 通过 if/instanceof 判断类型。
  accept(visitor) {
    return visitor.visitCircle(this);
  }
}

// ---- 具体元素：矩形 ----
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  accept(visitor) {
    return visitor.visitRectangle(this);
  }
}

// ---- 具体元素：三角形（新增一种图形，验证“对扩展开放”）----
class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  accept(visitor) {
    return visitor.visitTriangle(this);
  }
}

// ---- 抽象访问者（Visitor）：为每一种具体元素声明一个 visit 方法 ----
class ShapeVisitor {
  visitCircle(circle) {
    throw new Error('子类必须实现 visitCircle()');
  }
  visitRectangle(rectangle) {
    throw new Error('子类必须实现 visitRectangle()');
  }
  visitTriangle(triangle) {
    throw new Error('子类必须实现 visitTriangle()');
  }
}

// ---- 具体访问者：计算面积 ----
class AreaVisitor extends ShapeVisitor {
  visitCircle(circle) {
    const area = Math.PI * circle.radius ** 2;
    return `圆形(半径=${circle.radius}) 面积 = ${area.toFixed(2)}`;
  }
  visitRectangle(rectangle) {
    const area = rectangle.width * rectangle.height;
    return `矩形(${rectangle.width}x${rectangle.height}) 面积 = ${area.toFixed(2)}`;
  }
  visitTriangle(triangle) {
    const area = (triangle.base * triangle.height) / 2;
    return `三角形(底=${triangle.base}, 高=${triangle.height}) 面积 = ${area.toFixed(2)}`;
  }
}

// ---- 具体访问者：渲染为字符画描述 ----
class DrawVisitor extends ShapeVisitor {
  visitCircle(circle) {
    return `画一个半径为 ${circle.radius} 的 ○`;
  }
  visitRectangle(rectangle) {
    return `画一个 ${rectangle.width}x${rectangle.height} 的 □`;
  }
  visitTriangle(triangle) {
    return `画一个底 ${triangle.base}、高 ${triangle.height} 的 △`;
  }
}

console.log('=== 访问者模式：对图形施加不同操作 ===\n');

const shapes = [new Circle(3), new Rectangle(4, 5), new Triangle(6, 4)];

console.log('-- 使用 AreaVisitor 计算所有图形的面积 --');
const areaVisitor = new AreaVisitor();
for (const shape of shapes) {
  console.log(' ', shape.accept(areaVisitor));
}

console.log('\n-- 使用 DrawVisitor 渲染所有图形（同一批对象，切换新操作无需修改 Shape 类）--');
const drawVisitor = new DrawVisitor();
for (const shape of shapes) {
  console.log(' ', shape.accept(drawVisitor));
}
