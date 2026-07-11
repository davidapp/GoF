/**
 * 原型模式（Prototype）
 * 场景：克隆 Shape（Circle/Rectangle），复制其颜色、位置等属性。
 *
 * 核心思想：通过复制现有实例来创建新对象，而不是通过 new 调用构造函数，
 * 适合创建成本较高或结构复杂的对象。
 */

// ---------- 原型接口（Prototype） ----------
interface Prototype<T> {
  clone(): T;
}

// ---------- 抽象产品：Shape，实现克隆的公共部分 ----------
abstract class Shape implements Prototype<Shape> {
  constructor(
    public color: string,
    public x: number,
    public y: number,
  ) {}

  abstract clone(): Shape;
  abstract describe(): string;
}

// ---------- 具体原型：Circle ----------
class Circle extends Shape {
  constructor(
    color: string,
    x: number,
    y: number,
    public radius: number,
  ) {
    super(color, x, y);
  }

  // 浅拷贝即可满足本例需求：所有字段均为值类型
  clone(): Circle {
    return new Circle(this.color, this.x, this.y, this.radius);
  }

  describe(): string {
    return `圆形(颜色=${this.color}, 位置=(${this.x}, ${this.y}), 半径=${this.radius})`;
  }
}

// ---------- 具体原型：Rectangle ----------
class Rectangle extends Shape {
  constructor(
    color: string,
    x: number,
    y: number,
    public width: number,
    public height: number,
  ) {
    super(color, x, y);
  }

  clone(): Rectangle {
    return new Rectangle(this.color, this.x, this.y, this.width, this.height);
  }

  describe(): string {
    return `矩形(颜色=${this.color}, 位置=(${this.x}, ${this.y}), 宽=${this.width}, 高=${this.height})`;
  }
}

// ---------- 演示 ----------
function main(): void {
  const originalCircle = new Circle("红色", 10, 20, 5);
  const clonedCircle = originalCircle.clone();
  clonedCircle.x = 100; // 修改克隆体不影响原型
  clonedCircle.color = "蓝色";

  console.log("=== 圆形原型克隆 ===");
  console.log("原型:", originalCircle.describe());
  console.log("克隆:", clonedCircle.describe());
  console.log("是否为同一实例:", originalCircle === clonedCircle);

  const originalRect = new Rectangle("绿色", 0, 0, 30, 15);
  const clonedRect = originalRect.clone();
  clonedRect.width = 60;

  console.log("\n=== 矩形原型克隆 ===");
  console.log("原型:", originalRect.describe());
  console.log("克隆:", clonedRect.describe());

  // 原型注册表：按类型缓存原型，需要时直接克隆而非重新构造
  console.log("\n=== 原型注册表批量克隆 ===");
  const registry = new Map<string, Shape>([
    ["small-circle", new Circle("黑色", 0, 0, 1)],
    ["big-rect", new Rectangle("白色", 0, 0, 100, 50)],
  ]);
  for (const [key, prototype] of registry) {
    const copy = prototype.clone();
    console.log(`从注册表 "${key}" 克隆 ->`, copy.describe());
  }
}

main();
