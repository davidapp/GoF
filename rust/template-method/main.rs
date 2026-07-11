// 模板方法模式（Template Method）—— 冲泡饮料演示
//
// trait 的默认方法 `prepare_recipe` 定义了冲泡流程的骨架（固定步骤
// + 可变步骤 + 钩子），具体类型只需要实现 brew/add_condiments 这些
// “变化点”，公共流程本身不需要在每个具体类型里重复。

// 抽象类：饮料冲泡模板
trait Beverage {
    // 模板方法：定义算法骨架，具体类型不能也不需要重新实现这个流程
    fn prepare_recipe(&self) {
        self.boil_water();
        self.brew();
        self.pour_in_cup();
        if self.wants_condiments() {
            self.add_condiments();
        }
    }

    // 公共步骤：所有饮料都一样，提供默认实现
    fn boil_water(&self) {
        println!("把水烧开");
    }
    fn pour_in_cup(&self) {
        println!("倒入杯中");
    }

    // 变化步骤：子类型必须实现
    fn brew(&self);
    fn add_condiments(&self);

    // 钩子方法：子类型可以选择性覆盖，默认认为都需要加调料
    fn wants_condiments(&self) -> bool {
        true
    }

    fn name(&self) -> &str;
}

// 具体类：茶
struct Tea;
impl Beverage for Tea {
    fn brew(&self) {
        println!("浸泡茶叶");
    }
    fn add_condiments(&self) {
        println!("加柠檬");
    }
    fn name(&self) -> &str {
        "茶"
    }
}

// 具体类：咖啡
struct Coffee;
impl Beverage for Coffee {
    fn brew(&self) {
        println!("冲泡咖啡粉");
    }
    fn add_condiments(&self) {
        println!("加糖和牛奶");
    }
    fn name(&self) -> &str {
        "咖啡"
    }
}

// 具体类：黑咖啡，通过覆盖钩子方法跳过“加调料”这一步
struct BlackCoffee;
impl Beverage for BlackCoffee {
    fn brew(&self) {
        println!("冲泡咖啡粉");
    }
    fn add_condiments(&self) {
        // 因为 wants_condiments 返回 false，这个方法实际不会被调用
        println!("加糖和牛奶");
    }
    fn wants_condiments(&self) -> bool {
        false
    }
    fn name(&self) -> &str {
        "黑咖啡"
    }
}

fn main() {
    println!("=== 模板方法模式：冲泡饮料演示 ===\n");

    let beverages: Vec<Box<dyn Beverage>> = vec![Box::new(Tea), Box::new(Coffee), Box::new(BlackCoffee)];

    for beverage in &beverages {
        println!("-- 冲泡{} --", beverage.name());
        beverage.prepare_recipe();
        println!();
    }
}
