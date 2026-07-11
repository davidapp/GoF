// ============================================================
// 原型模式（Prototype）
// 场景：克隆 Shape（Circle/Rectangle），复制其颜色、位置等属性
// ============================================================

// ---- 抽象原型：约定 clone() 接口 ----
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  // 子类必须实现 clone，返回“自身类型”的深拷贝
  clone() {
    throw new Error('子类必须实现 clone()');
  }

  describe() {
    throw new Error('子类必须实现 describe()');
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
}

// ---- 具体原型：圆形 ----
class Circle extends Shape {
  constructor(x, y, color, radius) {
    super(x, y, color);
    this.radius = radius;
  }

  clone() {
    // 用当前实例的字段值构造一个新对象，实现“复制”而非“共享引用”
    return new Circle(this.x, this.y, this.color, this.radius);
  }

  describe() {
    return `圆形 [位置=(${this.x}, ${this.y}), 颜色=${this.color}, 半径=${this.radius}]`;
  }
}

// ---- 具体原型：矩形 ----
class Rectangle extends Shape {
  constructor(x, y, color, width, height) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  clone() {
    return new Rectangle(this.x, this.y, this.color, this.width, this.height);
  }

  describe() {
    return `矩形 [位置=(${this.x}, ${this.y}), 颜色=${this.color}, 宽=${this.width}, 高=${this.height}]`;
  }
}

console.log('=== 原型模式：克隆图形对象 ===\n');

// 原始对象：一个红色圆
const originalCircle = new Circle(10, 10, '红色', 5);
console.log('原始圆形     :', originalCircle.describe());

// 克隆并修改克隆体，验证两者互不影响
const clonedCircle = originalCircle.clone();
clonedCircle.moveTo(50, 50);
clonedCircle.color = '蓝色';

console.log('克隆并修改后 :', clonedCircle.describe());
console.log('原始圆形不变 :', originalCircle.describe());

console.log();

const originalRect = new Rectangle(0, 0, '绿色', 100, 40);
console.log('原始矩形     :', originalRect.describe());

const clonedRect = originalRect.clone();
clonedRect.width = 200;

console.log('克隆并修改后 :', clonedRect.describe());
console.log('原始矩形不变 :', originalRect.describe());

// ---- 原型注册表：按名称保存一批预设原型，按需克隆 ----
class ShapeRegistry {
  #prototypes = new Map();

  register(key, prototype) {
    this.#prototypes.set(key, prototype);
  }

  create(key) {
    const prototype = this.#prototypes.get(key);
    if (!prototype) throw new Error(`未注册的原型: ${key}`);
    return prototype.clone();
  }
}

console.log('\n-- 使用原型注册表按需克隆 --');
const registry = new ShapeRegistry();
registry.register('small-red-circle', new Circle(0, 0, '红色', 2));
registry.register('big-blue-rect', new Rectangle(0, 0, '蓝色', 300, 150));

const shapeA = registry.create('small-red-circle');
const shapeB = registry.create('small-red-circle');
console.log('两次克隆结果是否为同一对象:', shapeA === shapeB); // false，各自独立
console.log('shapeA:', shapeA.describe());
console.log('shapeB:', shapeB.describe());
