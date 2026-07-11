// 组合模式（Composite）—— 文件系统演示
//
// File（叶子节点）与 Directory（容器节点）实现同一个
// FileSystemComponent 接口，客户端可以用完全一致的方式
// 处理单个文件和整棵目录树（计算总大小、打印结构）。

// 组件接口：文件系统节点
trait FileSystemComponent {
    fn size(&self) -> u64;
    fn print(&self, indent: usize);
}

// 叶子节点：文件
struct File {
    name: String,
    size: u64,
}

impl FileSystemComponent for File {
    fn size(&self) -> u64 {
        self.size
    }

    fn print(&self, indent: usize) {
        println!("{}- {} ({} 字节)", "  ".repeat(indent), self.name, self.size);
    }
}

// 容器节点：目录，可以包含文件或子目录
struct Directory {
    name: String,
    children: Vec<Box<dyn FileSystemComponent>>,
}

impl Directory {
    fn new(name: &str) -> Self {
        Directory {
            name: name.to_string(),
            children: Vec::new(),
        }
    }

    fn add(&mut self, component: Box<dyn FileSystemComponent>) {
        self.children.push(component);
    }
}

impl FileSystemComponent for Directory {
    // 目录大小 = 所有子节点大小之和（递归下降到叶子节点）
    fn size(&self) -> u64 {
        self.children.iter().map(|c| c.size()).sum()
    }

    fn print(&self, indent: usize) {
        println!(
            "{}+ {}/ (共 {} 字节)",
            "  ".repeat(indent),
            self.name,
            self.size()
        );
        for child in &self.children {
            child.print(indent + 1);
        }
    }
}

fn main() {
    println!("=== 组合模式：文件系统演示 ===\n");

    let mut root = Directory::new("root");

    let mut docs = Directory::new("docs");
    docs.add(Box::new(File { name: "简历.pdf".to_string(), size: 200 }));
    docs.add(Box::new(File { name: "笔记.txt".to_string(), size: 50 }));

    let mut src = Directory::new("src");
    src.add(Box::new(File { name: "main.rs".to_string(), size: 1200 }));
    src.add(Box::new(File { name: "lib.rs".to_string(), size: 800 }));

    // 目录可以嵌套目录，组合结构可以任意深
    let mut utils = Directory::new("utils");
    utils.add(Box::new(File { name: "helper.rs".to_string(), size: 300 }));
    src.add(Box::new(utils));

    root.add(Box::new(docs));
    root.add(Box::new(src));
    root.add(Box::new(File { name: "README.md".to_string(), size: 100 }));

    root.print(0);
    println!("\n总大小: {} 字节", root.size());
}
