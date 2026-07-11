// 工厂方法模式（Factory Method）—— 物流运输演示
//
// 抽象创建者（Logistics）声明一个“工厂方法”，具体创建者
// （RoadLogistics / SeaLogistics）决定实例化哪种具体产品。

// 抽象产品：运输工具
trait Transport {
    fn deliver(&self) -> String;
}

// 具体产品：卡车
struct Truck;
impl Transport for Truck {
    fn deliver(&self) -> String {
        "使用卡车经陆路运输货物".to_string()
    }
}

// 具体产品：轮船
struct Ship;
impl Transport for Ship {
    fn deliver(&self) -> String {
        "使用轮船经海路运输货物".to_string()
    }
}

// 抽象创建者：声明工厂方法，并提供依赖该方法的业务逻辑
trait Logistics {
    // 工厂方法：交给子类型决定具体产出什么运输工具
    fn create_transport(&self) -> Box<dyn Transport>;

    // 依赖工厂方法的骨架逻辑，对调用者屏蔽了具体产品类型
    fn plan_delivery(&self) -> String {
        let transport = self.create_transport();
        format!("规划运输方案 -> {}", transport.deliver())
    }
}

// 具体创建者：陆路物流
struct RoadLogistics;
impl Logistics for RoadLogistics {
    fn create_transport(&self) -> Box<dyn Transport> {
        Box::new(Truck)
    }
}

// 具体创建者：海路物流
struct SeaLogistics;
impl Logistics for SeaLogistics {
    fn create_transport(&self) -> Box<dyn Transport> {
        Box::new(Ship)
    }
}

fn main() {
    println!("=== 工厂方法模式：物流运输演示 ===\n");

    let logistics_list: Vec<(&str, Box<dyn Logistics>)> = vec![
        ("陆路物流公司", Box::new(RoadLogistics)),
        ("海路物流公司", Box::new(SeaLogistics)),
    ];

    for (name, logistics) in &logistics_list {
        println!("[{}] {}", name, logistics.plan_delivery());
    }
}
