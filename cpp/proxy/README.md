# Proxy 代理模式（C++）

## 意图

为其他对象提供一种代理以控制对这个对象的访问。代理与真实对象实现同一接口，可以在访问真实对象前后附加额外逻辑（如延迟创建、权限校验、缓存）。

<!-- gof-architecture-diagram -->
## 架构图

> **生活类比**：相册先摆三张空相框。点开才从仓库搬出真照片；没点开的那张，磁盘加载一次都不会发生。

```mermaid
flowchart LR
    classDef client fill:#C2E5FF,stroke:#007AD2,color:#1E1E1E
    classDef abs fill:#DCCCFF,stroke:#874FFF,color:#1E1E1E
    classDef concrete fill:#CDF4D3,stroke:#3E9B4B,color:#1E1E1E
    classDef extra fill:#FFE0C2,stroke:#EB7500,color:#1E1E1E
    classDef shared fill:#FFECBD,stroke:#E8A302,color:#1E1E1E
    classDef hub fill:#C6FAF6,stroke:#5AD8CC,color:#1E1E1E
    album["相册 display"]
    p1["代理 photo1 占位"]
    p2["代理 photo2 占位"]
    p3["代理 photo3 从未点开"]
    real1["真图 磁盘加载"]
    real2["真图 磁盘加载"]
    skip["从未加载"]
    album --> p1
    album --> p2
    album --> p3
    p1 -->|"第一次 display"| real1
    p2 -->|"第一次 display"| real2
    p3 --x skip
    class album client
    class p1,p2,p3 extra
    class real1,real2 concrete
    class skip shared
```

| 图中角色 | 本仓库示例 |
|---------|-----------|
| 相册 | 客户端，只认 Image.display |
| 空相框 | ImageProxy 虚拟代理 |
| 仓库真图 | RealImage，构造时才加载 |

23 张图的完整图鉴见 [`docs/README.md`](../../docs/README.md#proxy-代理)。

## 适用场景

- 需要延迟创建开销较大的对象，直到真正需要时才创建（虚拟代理）
- 需要控制对原始对象的访问权限，或在访问前后附加逻辑（保护代理/日志代理）
- 需要为远程对象提供本地代表（远程代理）

## 实现方式

`Image` 是抽象主题；`RealImage` 在构造时就执行昂贵的 `load_from_disk()`；`ImageProxy` 同样实现 `Image`，但把 `RealImage` 的创建推迟到第一次 `display()` 调用：

```cpp
void ImageProxy::display() {
    if (!real_image_) {                              // 尚未加载
        real_image_ = std::make_unique<RealImage>(filename_);  // 此刻才真正加载
    }
    real_image_->display();
}
```

客户端持有的是 `Image*`，全程感知不到背后到底是代理还是真实对象，也感知不到加载究竟发生在何时。

## 文件说明

| 文件 | 说明 |
|------|------|
| `image.h` | 抽象主题 `Image`、真实主题 `RealImage`、代理 `ImageProxy` 的声明 |
| `image.cpp` | 加载与显示的具体实现 |
| `main.cpp` | 创建相册后不立即加载，第一次浏览触发加载，第二次浏览复用缓存 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make        # 编译
make run    # 编译并运行
make clean  # 清理
```

## 输出示例

```
=== 代理模式：图片懒加载 ===

相册已创建，但尚未加载任何图片（RealImage 还未创建）

--- 第一次浏览 ---
[ImageProxy] 首次访问 风景.jpg，触发真实加载
  [RealImage] 正在从磁盘加载 风景.jpg ...（耗时操作）
  [RealImage] 显示 风景.jpg
[ImageProxy] 首次访问 人像.jpg，触发真实加载
  [RealImage] 正在从磁盘加载 人像.jpg ...（耗时操作）
  [RealImage] 显示 人像.jpg

--- 第二次浏览（应直接复用已加载的图片） ---
[ImageProxy] 风景.jpg 已缓存，直接复用 RealImage
  [RealImage] 显示 风景.jpg
[ImageProxy] 人像.jpg 已缓存，直接复用 RealImage
  [RealImage] 显示 人像.jpg
```

## 要点

1. **接口一致** — `ImageProxy` 与 `RealImage` 都实现 `Image`，客户端代码无需区分
2. **懒加载/虚拟代理** — 只有真正调用 `display()` 时才创建开销较大的 `RealImage`
3. **透明缓存** — 一旦加载过，后续调用直接复用已创建的 `RealImage`，不会重复加载
4. **与装饰器的区别** — 代理控制对对象的访问（可以拒绝或延迟），装饰器则专注于功能增强，二者结构相似但意图不同
