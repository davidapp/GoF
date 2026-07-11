// ============================================================
// 组合模式（Composite）
// 场景：文件系统 —— File 与 Directory 统一计算总大小 / 打印树
// ============================================================

// ---- 组件（Component）：文件与目录的统一抽象 ----
class FileSystemEntry {
  constructor(name) {
    this.name = name;
  }

  getSize() {
    throw new Error('子类必须实现 getSize()');
  }

  print(indent = '') {
    throw new Error('子类必须实现 print()');
  }
}

// ---- 叶子（Leaf）：文件，没有子节点 ----
class FileEntry extends FileSystemEntry {
  constructor(name, sizeInKB) {
    super(name);
    this.sizeInKB = sizeInKB;
  }

  getSize() {
    return this.sizeInKB;
  }

  print(indent = '') {
    console.log(`${indent}- ${this.name} (${this.sizeInKB} KB)`);
  }
}

// ---- 组合（Composite）：目录，可以包含文件或子目录 ----
class DirectoryEntry extends FileSystemEntry {
  #children = [];

  constructor(name) {
    super(name);
  }

  add(entry) {
    this.#children.push(entry);
    return this; // 支持链式添加
  }

  remove(entry) {
    this.#children = this.#children.filter((child) => child !== entry);
  }

  // 递归求和：子节点既可能是文件也可能是目录，调用方无需区分
  getSize() {
    return this.#children.reduce((total, child) => total + child.getSize(), 0);
  }

  print(indent = '') {
    console.log(`${indent}+ ${this.name}/ (${this.getSize()} KB)`);
    for (const child of this.#children) {
      child.print(indent + '  ');
    }
  }
}

console.log('=== 组合模式：文件系统树形结构 ===\n');

// 构建一棵文件系统树
const root = new DirectoryEntry('project');

const srcDir = new DirectoryEntry('src');
srcDir.add(new FileEntry('index.js', 12));
srcDir.add(new FileEntry('utils.js', 8));

const testsDir = new DirectoryEntry('tests');
testsDir.add(new FileEntry('index.test.js', 5));

const assetsDir = new DirectoryEntry('assets');
const imagesDir = new DirectoryEntry('images');
imagesDir.add(new FileEntry('logo.png', 240));
imagesDir.add(new FileEntry('banner.png', 512));
assetsDir.add(imagesDir);

root.add(srcDir).add(testsDir).add(assetsDir).add(new FileEntry('README.md', 3));

console.log('-- 打印整个目录树（大小为该节点下所有内容的总和）--');
root.print();

console.log(`\n项目总大小: ${root.getSize()} KB`);
console.log(`仅 assets 目录大小: ${assetsDir.getSize()} KB`);

console.log('\n-- 统一处理：无论是文件还是目录，调用方式完全一致 --');
const items = [srcDir, new FileEntry('LICENSE', 1), imagesDir];
for (const item of items) {
  console.log(`${item.name} 的大小 = ${item.getSize()} KB`);
}
