/**
 * 装饰器模式（Decorator）
 * 场景：咖啡 —— 在 Espresso 上动态叠加 Milk / Sugar 装饰，计算价格与描述。
 *
 * 核心思想：动态地给对象添加职责，比继承更灵活。
 * 装饰器与被装饰对象实现同一接口，并持有该接口的引用，可以层层包裹。
 *
 * 注：这里的 Decorator 是 GoF 结构型模式，与 TypeScript 的 `@decorator`
 * 语法特性只是同名，实现方式不同，本例采用经典的组合包装方式。
 */

// ---------- 组件接口（Component） ----------
interface Coffee {
  cost(): number;
  description(): string;
}

// ---------- 具体组件（Concrete Component） ----------
class Espresso implements Coffee {
  cost(): number {
    return 18;
  }
  description(): string {
    return "Espresso";
  }
}

// ---------- 装饰器抽象基类（Decorator）：持有被装饰对象的引用 ----------
abstract class CoffeeDecorator implements Coffee {
  constructor(protected readonly coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }
  description(): string {
    return this.coffee.description();
  }
}

// ---------- 具体装饰器（Concrete Decorator） ----------
class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 4;
  }
  description(): string {
    return `${super.description()} + 牛奶`;
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 2;
  }
  description(): string {
    return `${super.description()} + 糖浆`;
  }
}

class WhippedCreamDecorator extends CoffeeDecorator {
  cost(): number {
    return super.cost() + 6;
  }
  description(): string {
    return `${super.description()} + 奶油`;
  }
}

// ---------- 演示 ----------
function printOrder(coffee: Coffee): void {
  console.log(`${coffee.description()} => ¥${coffee.cost().toFixed(2)}`);
}

function main(): void {
  console.log("=== 逐步叠加装饰 ===");
  let order: Coffee = new Espresso();
  printOrder(order);

  order = new MilkDecorator(order);
  printOrder(order);

  order = new SugarDecorator(order);
  printOrder(order);

  order = new WhippedCreamDecorator(order);
  printOrder(order);

  console.log("\n=== 不同组合互不影响 ===");
  const plainEspresso = new Espresso();
  const sweetEspresso = new SugarDecorator(new SugarDecorator(plainEspresso));
  printOrder(plainEspresso);
  printOrder(sweetEspresso);
}

main();
