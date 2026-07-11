// 原型模式（Prototype）—— 克隆 Shape 演示
//
// Rust 的 `Clone` trait 本身就是原型模式的直接体现，但 `Box<dyn Shape>`
// 这样的 trait 对象无法直接 `#[derive(Clone)]`（因为大小不确定、也不
// 知道具体类型），这里用“clone_box”这一经典技巧让 trait 对象也能克隆。

// 抽象原型：图形。要求同时实现 ShapeClone 才能被克隆
trait Shape: ShapeClone {
    fn area(&self) -> f64;
    fn set_position(&mut self, x: f64, y: f64);
    fn describe(&self) -> String;
}

// 辅助 trait：把“克隆出一个新的 Box<dyn Shape>”这件事对象安全化
trait ShapeClone {
    fn clone_box(&self) -> Box<dyn Shape>;
}

// 只要具体类型实现了 Clone，就自动获得 clone_box 能力
impl<T> ShapeClone for T
where
    T: 'static + Shape + Clone,
{
    fn clone_box(&self) -> Box<dyn Shape> {
        Box::new(self.clone())
    }
}

// 让 Box<dyn Shape> 自身也满足 Clone，克隆时委托给 clone_box
impl Clone for Box<dyn Shape> {
    fn clone(&self) -> Box<dyn Shape> {
        self.clone_box()
    }
}

// 具体原型：圆形
#[derive(Clone)]
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
    color: String,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
    fn set_position(&mut self, x: f64, y: f64) {
        self.x = x;
        self.y = y;
    }
    fn describe(&self) -> String {
        format!(
            "圆形[颜色={}, 位置=({}, {}), 半径={}, 面积={:.2}]",
            self.color, self.x, self.y, self.radius, self.area()
        )
    }
}

// 具体原型：矩形
#[derive(Clone)]
struct Rectangle {
    x: f64,
    y: f64,
    width: f64,
    height: f64,
    color: String,
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }
    fn set_position(&mut self, x: f64, y: f64) {
        self.x = x;
        self.y = y;
    }
    fn describe(&self) -> String {
        format!(
            "矩形[颜色={}, 位置=({}, {}), 宽={}, 高={}, 面积={:.2}]",
            self.color, self.x, self.y, self.width, self.height, self.area()
        )
    }
}

fn main() {
    println!("=== 原型模式：Shape 克隆演示 ===\n");

    let original_circle: Box<dyn Shape> = Box::new(Circle {
        x: 0.0,
        y: 0.0,
        radius: 5.0,
        color: "红色".to_string(),
    });
    println!("原型圆 : {}", original_circle.describe());

    // 克隆原型，修改副本的位置，验证原型本身不受影响
    let mut cloned_circle = original_circle.clone();
    cloned_circle.set_position(10.0, 20.0);
    println!("克隆圆 : {}", cloned_circle.describe());
    println!("原型圆（未变）: {}", original_circle.describe());

    println!();

    let original_rect: Box<dyn Shape> = Box::new(Rectangle {
        x: 1.0,
        y: 1.0,
        width: 4.0,
        height: 3.0,
        color: "蓝色".to_string(),
    });
    let mut cloned_rect = original_rect.clone();
    cloned_rect.set_position(100.0, 200.0);
    println!("原型矩形: {}", original_rect.describe());
    println!("克隆矩形: {}", cloned_rect.describe());
}
