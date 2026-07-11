// ============================================================
// 代理模式（Proxy）
// 场景：图片懒加载 —— ImageProxy 延迟到首次 display() 才加载 RealImage
// ============================================================

// ---- 抽象主题（Subject）：图片的统一接口 ----
class Image {
  display() {
    throw new Error('子类必须实现 display()');
  }
}

// ---- 真实主题（RealSubject）：加载开销较大的真实图片 ----
class RealImage extends Image {
  #filename;

  constructor(filename) {
    super();
    this.#filename = filename;
    this.#loadFromDisk(); // 构造时就立即加载（开销大）
  }

  #loadFromDisk() {
    console.log(`  [RealImage] 正在从磁盘加载高清图片: ${this.#filename} ...（耗时较长）`);
  }

  display() {
    console.log(`  [RealImage] 显示图片: ${this.#filename}`);
  }
}

// ---- 代理（Proxy）：控制对 RealImage 的访问，实现懒加载 ----
class ImageProxy extends Image {
  #filename;
  #realImage = null; // 真正的图片对象，首次需要时才创建

  constructor(filename) {
    super();
    this.#filename = filename;
    console.log(`[ImageProxy] 创建代理对象: ${this.#filename}（此时尚未真正加载）`);
  }

  display() {
    if (!this.#realImage) {
      console.log(`[ImageProxy] 首次调用 display()，触发真实加载...`);
      this.#realImage = new RealImage(this.#filename);
    } else {
      console.log(`[ImageProxy] 已加载过，直接复用缓存的 RealImage`);
    }
    this.#realImage.display();
  }
}

console.log('=== 代理模式：图片懒加载 ===\n');

console.log('-- 创建一批图片代理（此时不会真正加载任何图片）--');
const gallery = [
  new ImageProxy('photo1.jpg'),
  new ImageProxy('photo2.jpg'),
  new ImageProxy('photo3.jpg'),
];

console.log('\n-- 用户只浏览到 photo1，只有它会被真正加载 --');
gallery[0].display();

console.log('\n-- 再次显示 photo1，直接复用已加载的图片，不会重复加载 --');
gallery[0].display();

console.log('\n-- 用户滚动到 photo2，此时才触发它的加载 --');
gallery[1].display();

console.log('\n（photo3.jpg 全程未被访问，因此从未被加载，节省了资源）');
