// 建造者模式（Builder）—— 分步组装 Computer 演示
//
// 使用 Rust 惯用的“消费型建造者”（consuming builder）：
// 每个设置方法都拿走 self 的所有权并返回 Self，可以链式调用，
// 完全不涉及借用检查问题。

// 产品：电脑
#[derive(Debug)]
struct Computer {
    cpu: String,
    memory_gb: u32,
    storage_gb: u32,
    gpu: Option<String>,
}

impl Computer {
    fn describe(&self) -> String {
        format!(
            "CPU: {} | 内存: {}GB | 存储: {}GB | 显卡: {}",
            self.cpu,
            self.memory_gb,
            self.storage_gb,
            self.gpu.as_deref().unwrap_or("集成显卡")
        )
    }
}

// 建造者：逐步收集参数，最后 build() 出不可变的 Computer
struct ComputerBuilder {
    cpu: String,
    memory_gb: u32,
    storage_gb: u32,
    gpu: Option<String>,
}

impl ComputerBuilder {
    fn new() -> Self {
        ComputerBuilder {
            cpu: "未指定 CPU".to_string(),
            memory_gb: 8,
            storage_gb: 256,
            gpu: None,
        }
    }

    fn cpu(mut self, cpu: &str) -> Self {
        self.cpu = cpu.to_string();
        self
    }

    fn memory_gb(mut self, gb: u32) -> Self {
        self.memory_gb = gb;
        self
    }

    fn storage_gb(mut self, gb: u32) -> Self {
        self.storage_gb = gb;
        self
    }

    fn gpu(mut self, gpu: &str) -> Self {
        self.gpu = Some(gpu.to_string());
        self
    }

    fn build(self) -> Computer {
        Computer {
            cpu: self.cpu,
            memory_gb: self.memory_gb,
            storage_gb: self.storage_gb,
            gpu: self.gpu,
        }
    }
}

// 指挥者：封装几套“预设配置”，客户端无需了解组装细节
struct Director;

impl Director {
    fn gaming_pc() -> Computer {
        ComputerBuilder::new()
            .cpu("Intel i9-14900K")
            .memory_gb(32)
            .storage_gb(2000)
            .gpu("NVIDIA RTX 4090")
            .build()
    }

    fn office_pc() -> Computer {
        ComputerBuilder::new()
            .cpu("Intel i5-13400")
            .memory_gb(16)
            .storage_gb(512)
            .build()
    }
}

fn main() {
    println!("=== 建造者模式：Computer 组装演示 ===\n");

    let gaming = Director::gaming_pc();
    println!("[预设-游戏主机] {}", gaming.describe());

    let office = Director::office_pc();
    println!("[预设-办公主机] {}", office.describe());

    // 也可以绕开 Director，自由组合
    let custom = ComputerBuilder::new()
        .cpu("AMD Ryzen 9 7950X")
        .memory_gb(64)
        .storage_gb(4000)
        .gpu("AMD RX 7900 XTX")
        .build();
    println!("[自定义主机] {}", custom.describe());
}
