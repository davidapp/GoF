// 代理模式（Proxy）—— 图片懒加载演示
//
// ImageProxy 与 RealImage 实现同一个 Image 接口，客户端统一
// 通过 Image::display() 使用图片，代理会拖延到第一次真正需要
// 显示时，才创建开销较大的 RealImage（虚代理 / 懒加载）。

// 主题接口：图片
trait Image {
    fn display(&mut self);
}

// 真实主体：创建代价较高（这里用打印模拟耗时的磁盘加载）
struct RealImage {
    filename: String,
}

impl RealImage {
    fn new(filename: &str) -> Self {
        let image = RealImage { filename: filename.to_string() };
        image.load_from_disk();
        image
    }

    fn load_from_disk(&self) {
        println!("  (耗时操作) 正在从磁盘加载图片: {}", self.filename);
    }
}

impl Image for RealImage {
    fn display(&mut self) {
        println!("  显示图片: {}", self.filename);
    }
}

// 代理：持有文件名，真正需要显示时才创建 RealImage
struct ImageProxy {
    filename: String,
    real_image: Option<RealImage>,
}

impl ImageProxy {
    fn new(filename: &str) -> Self {
        ImageProxy {
            filename: filename.to_string(),
            real_image: None,
        }
    }
}

impl Image for ImageProxy {
    fn display(&mut self) {
        // 懒加载：第一次调用才真正创建 RealImage，后续直接复用
        if self.real_image.is_none() {
            self.real_image = Some(RealImage::new(&self.filename));
        }
        if let Some(image) = self.real_image.as_mut() {
            image.display();
        }
    }
}

fn main() {
    println!("=== 代理模式：图片懒加载演示 ===\n");

    let mut images: Vec<ImageProxy> = vec![
        ImageProxy::new("photo1.jpg"),
        ImageProxy::new("photo2.jpg"),
    ];
    println!("(两个 ImageProxy 已创建，但图片尚未真正从磁盘加载)\n");

    println!("第一次显示 photo1:");
    images[0].display();

    println!("\n再次显示 photo1（应直接复用，不再重新加载）:");
    images[0].display();

    println!("\n第一次显示 photo2:");
    images[1].display();
}
