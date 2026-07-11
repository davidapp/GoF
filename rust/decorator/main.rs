// 装饰器模式（Decorator）—— 咖啡加料演示
//
// 每个装饰器都包裹一个 Box<dyn Beverage>，并实现同一个 Beverage
// 接口，从而可以层层叠加：Espresso -> +牛奶 -> +糖 -> +奶油 ...
// 每一层只关心“在被包裹对象的基础上增加什么”，无需修改原类。

// 组件接口：饮料
trait Beverage {
    fn cost(&self) -> f64;
    fn description(&self) -> String;
}

// 具体组件：意式浓缩（最基础的饮料，没有任何装饰）
struct Espresso;
impl Beverage for Espresso {
    fn cost(&self) -> f64 {
        15.0
    }
    fn description(&self) -> String {
        "Espresso".to_string()
    }
}

// 装饰器：加牛奶
struct MilkDecorator {
    inner: Box<dyn Beverage>,
}
impl Beverage for MilkDecorator {
    fn cost(&self) -> f64 {
        self.inner.cost() + 3.0
    }
    fn description(&self) -> String {
        format!("{} + 牛奶", self.inner.description())
    }
}

// 装饰器：加糖
struct SugarDecorator {
    inner: Box<dyn Beverage>,
}
impl Beverage for SugarDecorator {
    fn cost(&self) -> f64 {
        self.inner.cost() + 1.5
    }
    fn description(&self) -> String {
        format!("{} + 糖", self.inner.description())
    }
}

// 装饰器：加奶油
struct WhippedCreamDecorator {
    inner: Box<dyn Beverage>,
}
impl Beverage for WhippedCreamDecorator {
    fn cost(&self) -> f64 {
        self.inner.cost() + 4.0
    }
    fn description(&self) -> String {
        format!("{} + 奶油", self.inner.description())
    }
}

fn main() {
    println!("=== 装饰器模式：咖啡加料演示 ===\n");

    let plain: Box<dyn Beverage> = Box::new(Espresso);
    println!("{:<32} {:.1} 元", plain.description(), plain.cost());

    let with_milk: Box<dyn Beverage> = Box::new(MilkDecorator { inner: Box::new(Espresso) });
    println!("{:<32} {:.1} 元", with_milk.description(), with_milk.cost());

    // 动态叠加多层装饰：Espresso + 牛奶 + 糖 + 奶油
    let fancy: Box<dyn Beverage> = Box::new(WhippedCreamDecorator {
        inner: Box::new(SugarDecorator {
            inner: Box::new(MilkDecorator {
                inner: Box::new(Espresso),
            }),
        }),
    });
    println!("{:<32} {:.1} 元", fancy.description(), fancy.cost());
}
