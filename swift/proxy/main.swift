import Foundation

// 代理模式：图片懒加载
// 场景：ImageProxy 延迟到首次 display() 才加载 RealImage

// MARK: - 抽象主题：图片接口
protocol Image {
    func display() -> String
}

// MARK: - 真实主题：加载开销较大的真实图片
final class RealImage: Image {
    private let filename: String

    // 构造时即完成"昂贵"的加载操作
    init(filename: String) {
        self.filename = filename
        loadFromDisk()
    }

    private func loadFromDisk() {
        print("  [磁盘] 正在加载图片文件: \(filename) ...")
    }

    func display() -> String {
        "显示图片: \(filename)"
    }
}

// MARK: - 代理：控制对 RealImage 的访问，实现懒加载
final class ImageProxy: Image {
    private let filename: String
    private var realImage: RealImage?

    init(filename: String) {
        self.filename = filename
    }

    func display() -> String {
        // 首次调用 display() 时才真正创建 RealImage（延迟加载），此后复用已缓存的实例
        let image = realImage ?? RealImage(filename: filename)
        realImage = image
        return image.display()
    }
}

// MARK: - 顶层入口
print("=== 代理模式：图片懒加载 ===\n")

print("创建图片代理对象（此时不会加载磁盘文件）：")
let image: Image = ImageProxy(filename: "vacation.jpg")
print("代理对象创建完成")

print("\n第一次调用 display()：")
print(image.display())

print("\n第二次调用 display()（已缓存，不再重新加载）：")
print(image.display())
