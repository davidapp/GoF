/**
 * 代理模式（Proxy）
 * 场景：图片懒加载 —— ImageProxy 延迟到首次 display() 才加载 RealImage。
 *
 * 核心思想：为目标对象提供一个替身以控制对它的访问，
 * 可以在不改变客户端代码的前提下加入懒加载、权限校验、日志等附加逻辑。
 */

// ---------- 抽象主题（Subject） ----------
interface Image {
  display(): void;
}

// ---------- 真实主题（Real Subject）：创建成本较高 ----------
class RealImage implements Image {
  constructor(private readonly filename: string) {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(`  [磁盘 I/O] 正在从磁盘加载图片: ${this.filename}（耗时操作）`);
  }

  display(): void {
    console.log(`显示图片: ${this.filename}`);
  }
}

// ---------- 代理（Proxy）：延迟创建 RealImage，直到真正需要显示 ----------
class ImageProxy implements Image {
  private realImage: RealImage | undefined;

  constructor(private readonly filename: string) {}

  display(): void {
    if (this.realImage === undefined) {
      console.log(`[代理] 首次访问，触发真实加载: ${this.filename}`);
      this.realImage = new RealImage(this.filename);
    } else {
      console.log(`[代理] 已缓存，直接复用: ${this.filename}`);
    }
    this.realImage.display();
  }
}

// ---------- 演示 ----------
function main(): void {
  console.log("=== 创建图片代理列表（此时并未真正加载图片） ===");
  const gallery: Image[] = [
    new ImageProxy("photo1.jpg"),
    new ImageProxy("photo2.jpg"),
    new ImageProxy("photo3.jpg"),
  ];
  console.log("代理对象已创建完毕，尚未发生任何磁盘 I/O\n");

  console.log("=== 第一次显示 photo1（触发真实加载） ===");
  gallery[0]?.display();

  console.log("\n=== 再次显示 photo1（直接复用，不再加载） ===");
  gallery[0]?.display();

  console.log("\n=== 显示 photo2（首次加载） ===");
  gallery[1]?.display();
}

main();
