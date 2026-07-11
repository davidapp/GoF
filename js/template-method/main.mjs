// ============================================================
// 模板方法模式（Template Method）
// 场景：冲泡饮料 —— Beverage 定义骨架，Tea/Coffee 实现各步骤
// ============================================================

// ---- 抽象类：定义模板方法 prepare()，固定了算法骨架 ----
class Beverage {
  // 模板方法：final 语义（JS 没有 final 关键字，用注释约定不允许子类覆盖）
  // 规定了冲泡饮料的固定步骤顺序
  prepare() {
    this.boilWater();
    this.brew(); // 子类实现：具体冲泡方式不同
    this.pourInCup();
    if (this.wantsCondiments()) {
      // 钩子方法：子类可选择性覆盖，控制流程分支
      this.addCondiments(); // 子类实现：具体调料不同
    } else {
      console.log('  客户不需要调料，跳过');
    }
  }

  boilWater() {
    console.log('  烧开水');
  }

  pourInCup() {
    console.log('  倒入杯中');
  }

  brew() {
    throw new Error('子类必须实现 brew()');
  }

  addCondiments() {
    throw new Error('子类必须实现 addCondiments()');
  }

  // 钩子方法（Hook）：提供默认实现，子类可选择性覆盖
  wantsCondiments() {
    return true;
  }
}

// ---- 具体类：茶 ----
class Tea extends Beverage {
  brew() {
    console.log('  用沸水浸泡茶叶');
  }
  addCondiments() {
    console.log('  加入柠檬');
  }
}

// ---- 具体类：咖啡 ----
class Coffee extends Beverage {
  brew() {
    console.log('  用沸水冲泡咖啡粉');
  }
  addCondiments() {
    console.log('  加入糖和牛奶');
  }
}

// ---- 具体类：黑咖啡，覆盖钩子方法跳过调料步骤 ----
class BlackCoffee extends Coffee {
  wantsCondiments() {
    return false; // 通过钩子方法改变父类模板中的分支走向
  }
}

console.log('=== 模板方法模式：冲泡饮料 ===\n');

console.log('-- 冲泡茶 --');
new Tea().prepare();

console.log('\n-- 冲泡咖啡（默认加糖和牛奶）--');
new Coffee().prepare();

console.log('\n-- 冲泡黑咖啡（通过钩子方法跳过加调料步骤）--');
new BlackCoffee().prepare();

console.log('\n（三者都复用了 Beverage.prepare() 中固定的“烧水->冲泡->倒杯->加料”骨架）');
