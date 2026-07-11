// 享元模式（Flyweight）—— 森林渲染演示
//
// 大量 Tree 共享同一份 TreeType（名称/颜色/纹理等“内在状态”），
// 只有坐标这种“外在状态”是每棵树独有的。TreeFactory 用缓存保证
// 相同参数的 TreeType 只会被创建一次，用 Rc 在多棵树之间共享。

use std::collections::HashMap;
use std::rc::Rc;

// 享元：树的内在状态（可被大量对象共享，创建成本较高）
struct TreeType {
    name: String,
    color: String,
    texture: String,
}

impl TreeType {
    fn render(&self, x: i32, y: i32) {
        println!(
            "在 ({:>3}, {:>3}) 绘制一棵 [{}]，颜色={}，纹理={}",
            x, y, self.name, self.color, self.texture
        );
    }
}

// 享元工厂：缓存并复用 TreeType，相同参数只创建一次
struct TreeFactory {
    cache: HashMap<String, Rc<TreeType>>,
}

impl TreeFactory {
    fn new() -> Self {
        TreeFactory { cache: HashMap::new() }
    }

    fn get_tree_type(&mut self, name: &str, color: &str, texture: &str) -> Rc<TreeType> {
        let key = format!("{name}-{color}-{texture}");
        if let Some(existing) = self.cache.get(&key) {
            Rc::clone(existing)
        } else {
            println!("(缓存未命中，创建新的 TreeType 享元: {key})");
            let tree_type = Rc::new(TreeType {
                name: name.to_string(),
                color: color.to_string(),
                texture: texture.to_string(),
            });
            self.cache.insert(key, Rc::clone(&tree_type));
            tree_type
        }
    }

    fn cached_count(&self) -> usize {
        self.cache.len()
    }
}

// 外在状态：树在森林中的坐标 + 共享的享元引用
struct Tree {
    x: i32,
    y: i32,
    tree_type: Rc<TreeType>,
}

impl Tree {
    fn render(&self) {
        self.tree_type.render(self.x, self.y);
    }
}

// 客户端：森林，持有大量 Tree
struct Forest {
    trees: Vec<Tree>,
}

impl Forest {
    fn new() -> Self {
        Forest { trees: Vec::new() }
    }

    fn plant_tree(
        &mut self,
        factory: &mut TreeFactory,
        x: i32,
        y: i32,
        name: &str,
        color: &str,
        texture: &str,
    ) {
        let tree_type = factory.get_tree_type(name, color, texture);
        self.trees.push(Tree { x, y, tree_type });
    }

    fn render(&self) {
        for tree in &self.trees {
            tree.render();
        }
    }
}

fn main() {
    println!("=== 享元模式：森林渲染演示 ===\n");

    let mut factory = TreeFactory::new();
    let mut forest = Forest::new();

    forest.plant_tree(&mut factory, 1, 2, "橡树", "绿色", "粗糙树皮");
    forest.plant_tree(&mut factory, 5, 8, "橡树", "绿色", "粗糙树皮");
    forest.plant_tree(&mut factory, 3, 9, "松树", "深绿色", "针叶纹理");
    forest.plant_tree(&mut factory, 12, 4, "橡树", "绿色", "粗糙树皮");
    forest.plant_tree(&mut factory, 7, 1, "松树", "深绿色", "针叶纹理");

    println!();
    forest.render();

    println!(
        "\n共种植 {} 棵树，但只创建了 {} 个 TreeType 享元对象",
        forest.trees.len(),
        factory.cached_count()
    );
}
