// ============================================================
// 装饰器模式（Decorator）
// 场景：咖啡 —— 在 Espresso 上动态叠加 Milk/Sugar 装饰，计算价格与描述
// ============================================================

// ---- 抽象组件（Component）：饮料的统一接口 ----
class Beverage {
  cost() {
    throw new Error('子类必须实现 cost()');
  }
  describe() {
    throw new Error('子类必须实现 describe()');
  }
}

// ---- 具体组件：基础饮品 ----
class Espresso extends Beverage {
  cost() {
    return 18;
  }
  describe() {
    return '浓缩咖啡';
  }
}

class Americano extends Beverage {
  cost() {
    return 15;
  }
  describe() {
    return '美式咖啡';
  }
}

// ---- 抽象装饰器：本身也是 Beverage，持有一个被装饰的 Beverage ----
class BeverageDecorator extends Beverage {
  constructor(beverage) {
    super();
    if (new.target === BeverageDecorator) {
      throw new Error('BeverageDecorator 是抽象类，不能直接实例化');
    }
    this.beverage = beverage;
  }

  cost() {
    return this.beverage.cost();
  }
  describe() {
    return this.beverage.describe();
  }
}

// ---- 具体装饰器：牛奶 ----
class MilkDecorator extends BeverageDecorator {
  cost() {
    return this.beverage.cost() + 4;
  }
  describe() {
    return `${this.beverage.describe()} + 牛奶`;
  }
}

// ---- 具体装饰器：糖浆 ----
class SugarDecorator extends BeverageDecorator {
  cost() {
    return this.beverage.cost() + 2;
  }
  describe() {
    return `${this.beverage.describe()} + 糖浆`;
  }
}

// ---- 具体装饰器：奶泡（体现可无限叠加、任意顺序组合）----
class WhippedCreamDecorator extends BeverageDecorator {
  cost() {
    return this.beverage.cost() + 6;
  }
  describe() {
    return `${this.beverage.describe()} + 奶泡`;
  }
}

function printOrder(beverage) {
  console.log(`${beverage.describe()} —— 总价: ¥${beverage.cost()}`);
}

console.log('=== 装饰器模式：咖啡加料计价 ===\n');

console.log('-- 原味浓缩咖啡 --');
const plainEspresso = new Espresso();
printOrder(plainEspresso);

console.log('\n-- 浓缩咖啡 + 牛奶 --');
const latte = new MilkDecorator(new Espresso());
printOrder(latte);

console.log('\n-- 浓缩咖啡 + 牛奶 + 糖浆（动态叠加两层装饰）--');
const sweetLatte = new SugarDecorator(new MilkDecorator(new Espresso()));
printOrder(sweetLatte);

console.log('\n-- 美式咖啡 + 糖浆 + 奶泡 + 牛奶（三层装饰，顺序不同结果不同）--');
const fancyAmericano = new MilkDecorator(
  new WhippedCreamDecorator(new SugarDecorator(new Americano()))
);
printOrder(fancyAmericano);

console.log('\n-- 验证被装饰对象本身不受影响 --');
printOrder(plainEspresso);
