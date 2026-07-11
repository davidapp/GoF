// 访问者模式（Visitor）—— 图形操作演示
//
// 想给 Circle/Rectangle 增加新操作（求面积、渲染……）又不想每加一种
// 操作就去改一遍所有图形类型，于是把“操作”抽成 Visitor，图形只需要
// 提供一个 accept 方法做“双重分派”：先分派到具体图形类型，
// 再由图形调用 visitor 对应的 visit_xxx 方法分派到具体操作。

// 元素接口：图形
trait Shape {
    fn accept(&self, visitor: &mut dyn Visitor);
}

// 访问者接口：每种具体图形对应一个 visit 方法
trait Visitor {
    fn visit_circle(&mut self, circle: &Circle);
    fn visit_rectangle(&mut self, rectangle: &Rectangle);
}

// 具体元素：圆形
struct Circle {
    radius: f64,
}
impl Shape for Circle {
    fn accept(&self, visitor: &mut dyn Visitor) {
        visitor.visit_circle(self);
    }
}

// 具体元素：矩形
struct Rectangle {
    width: f64,
    height: f64,
}
impl Shape for Rectangle {
    fn accept(&self, visitor: &mut dyn Visitor) {
        visitor.visit_rectangle(self);
    }
}

// 具体访问者：计算面积
struct AreaVisitor {
    total_area: f64,
}
impl AreaVisitor {
    fn new() -> Self {
        AreaVisitor { total_area: 0.0 }
    }
}
impl Visitor for AreaVisitor {
    fn visit_circle(&mut self, circle: &Circle) {
        let area = std::f64::consts::PI * circle.radius * circle.radius;
        println!("圆形（半径={}）面积 = {:.2}", circle.radius, area);
        self.total_area += area;
    }
    fn visit_rectangle(&mut self, rectangle: &Rectangle) {
        let area = rectangle.width * rectangle.height;
        println!(
            "矩形（{}x{}）面积 = {:.2}",
            rectangle.width, rectangle.height, area
        );
        self.total_area += area;
    }
}

// 具体访问者：渲染图形（示意）
struct DrawVisitor;
impl Visitor for DrawVisitor {
    fn visit_circle(&mut self, circle: &Circle) {
        println!("绘制一个半径为 {} 的圆 ○", circle.radius);
    }
    fn visit_rectangle(&mut self, rectangle: &Rectangle) {
        println!("绘制一个 {}x{} 的矩形 □", rectangle.width, rectangle.height);
    }
}

fn main() {
    println!("=== 访问者模式：图形操作演示 ===\n");

    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle { radius: 3.0 }),
        Box::new(Rectangle { width: 4.0, height: 5.0 }),
        Box::new(Circle { radius: 1.5 }),
    ];

    println!("-- 使用 AreaVisitor 计算面积 --");
    let mut area_visitor = AreaVisitor::new();
    for shape in &shapes {
        shape.accept(&mut area_visitor);
    }
    println!("总面积 = {:.2}\n", area_visitor.total_area);

    println!("-- 使用 DrawVisitor 渲染图形 --");
    let mut draw_visitor = DrawVisitor;
    for shape in &shapes {
        shape.accept(&mut draw_visitor);
    }
}
