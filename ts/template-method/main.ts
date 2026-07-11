/**
 * 模板方法模式（Template Method）
 * 场景：冲泡饮料 —— Beverage 定义算法骨架，Tea / Coffee 实现具体步骤。
 *
 * 核心思想：在父类中定义一个算法的骨架（模板方法），
 * 将某些步骤延迟到子类中实现，使子类可以在不改变算法结构的前提下
 * 重新定义算法的某些步骤。
 */

// ---------- 抽象类（AbstractClass）：定义模板方法与基本步骤 ----------
abstract class Beverage {
  // 模板方法：固定算法骨架，子类不应重写此方法（TS 无 final，约定通过注释体现）
  prepare(): void {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    } else {
      console.log("（顾客不需要加料，跳过）");
    }
  }

  // 具体方法：所有子类共用，无需重写
  private boilWater(): void {
    console.log("1. 把水烧开");
  }

  private pourInCup(): void {
    console.log("3. 把饮料倒入杯中");
  }

  // 抽象方法（Primitive Operation）：子类必须实现
  protected abstract brew(): void;
  protected abstract addCondiments(): void;

  // 钩子方法（Hook）：提供默认实现，子类可选择性覆盖以影响模板方法的流程
  protected customerWantsCondiments(): boolean {
    return true;
  }
}

// ---------- 具体类（Concrete Class）：Tea ----------
class Tea extends Beverage {
  protected brew(): void {
    console.log("2. 用沸水浸泡茶叶");
  }
  protected addCondiments(): void {
    console.log("4. 加入柠檬");
  }
}

// ---------- 具体类（Concrete Class）：Coffee ----------
class Coffee extends Beverage {
  protected brew(): void {
    console.log("2. 用沸水冲泡咖啡粉");
  }
  protected addCondiments(): void {
    console.log("4. 加入糖和牛奶");
  }
}

// ---------- 具体类：黑咖啡，通过覆盖钩子方法跳过加料步骤 ----------
class BlackCoffee extends Coffee {
  protected override customerWantsCondiments(): boolean {
    return false; // 黑咖啡不加糖和奶
  }
}

// ---------- 演示 ----------
function main(): void {
  console.log("=== 冲泡茶（默认加料） ===");
  new Tea().prepare();

  console.log("\n=== 冲泡咖啡（默认加料） ===");
  new Coffee().prepare();

  console.log("\n=== 冲泡黑咖啡（钩子方法关闭加料步骤） ===");
  new BlackCoffee().prepare();
}

main();
