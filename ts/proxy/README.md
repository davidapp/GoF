# Proxy 代理模式（TypeScript）

## 意图
为其他对象提供一种代理以控制对这个对象的访问。代理与真实对象实现同一接口，客户端持有的始终是代理，可以在不修改客户端代码的前提下，在代理内部加入懒加载、权限校验、缓存、日志等附加逻辑。

## 适用场景
- 创建开销较大的对象希望延迟到真正使用时才创建（懒加载/虚拟代理，如本例的图片加载）。
- 需要控制对原始对象的访问权限（保护代理）。
- 需要在访问真实对象前后插入额外逻辑，如日志、缓存、引用计数（智能引用代理）。

## 实现方式
`Image` 是抽象主题接口（`display()`）。`RealImage` 是真实主题，构造时就会立即从磁盘加载（模拟高开销操作）。`ImageProxy` 也实现 `Image`，但构造时不做任何加载，只有第一次调用 `display()` 时才真正创建 `RealImage` 并缓存，后续调用直接复用：

```ts
class ImageProxy implements Image {
  private realImage: RealImage | undefined;
  constructor(private readonly filename: string) {}

  display(): void {
    if (this.realImage === undefined) {
      this.realImage = new RealImage(this.filename); // 首次访问才真正加载
    }
    this.realImage.display();
  }
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| main.ts | 代理模式完整实现，演示图片懒加载与重复访问的缓存复用 |

## 编译与运行
```bash
cd ts/proxy
npx tsx main.ts
```

## 输出示例
```
=== 创建图片代理列表（此时并未真正加载图片） ===
代理对象已创建完毕，尚未发生任何磁盘 I/O

=== 第一次显示 photo1（触发真实加载） ===
[代理] 首次访问，触发真实加载: photo1.jpg
  [磁盘 I/O] 正在从磁盘加载图片: photo1.jpg（耗时操作）
显示图片: photo1.jpg

=== 再次显示 photo1（直接复用，不再加载） ===
[代理] 已缓存，直接复用: photo1.jpg
显示图片: photo1.jpg

=== 显示 photo2（首次加载） ===
[代理] 首次访问，触发真实加载: photo2.jpg
  [磁盘 I/O] 正在从磁盘加载图片: photo2.jpg（耗时操作）
显示图片: photo2.jpg
```

## 要点
1. 创建 3 个 `ImageProxy` 时没有发生任何磁盘 I/O，只有调用 `display()` 才会触发真实加载，验证了“懒加载”效果。
2. 第二次调用 `photo1.display()` 直接复用已缓存的 `RealImage`，不会重复触发加载。
3. 代理与真实对象实现同一接口是该模式的关键：客户端代码（`gallery: Image[]`）全程无需感知自己操作的是代理还是真实对象。
4. 与装饰器模式的区别：代理控制的是“能不能访问、何时访问”，通常不改变接口语义；装饰器关注“增加新的职责/行为”，且允许多层叠加。
