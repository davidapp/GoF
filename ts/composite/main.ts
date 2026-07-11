/**
 * 组合模式（Composite）
 * 场景：文件系统 —— File 与 Directory 统一计算总大小 / 打印树形结构。
 *
 * 核心思想：将对象组合成树形结构以表示“部分-整体”层次结构，
 * 使得客户端对单个对象（叶子）和组合对象（容器）的使用具有一致性。
 */

// ---------- 组件接口（Component）：叶子与容器的公共接口 ----------
interface FileSystemNode {
  getName(): string;
  getSize(): number;
  print(indent: string): void;
}

// ---------- 叶子节点（Leaf） ----------
class FileLeaf implements FileSystemNode {
  constructor(
    private readonly name: string,
    private readonly size: number, // 单位：字节
  ) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  print(indent: string): void {
    console.log(`${indent}- ${this.name} (${this.size} B)`);
  }
}

// ---------- 容器节点（Composite） ----------
class Directory implements FileSystemNode {
  private readonly children: FileSystemNode[] = [];

  constructor(private readonly name: string) {}

  add(node: FileSystemNode): this {
    this.children.push(node);
    return this;
  }

  getName(): string {
    return this.name;
  }

  // 递归汇总：目录大小 = 所有子节点大小之和
  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }

  print(indent: string): void {
    console.log(`${indent}+ ${this.name}/ (${this.getSize()} B)`);
    for (const child of this.children) {
      child.print(indent + "  ");
    }
  }
}

// ---------- 演示 ----------
function main(): void {
  const root = new Directory("project");

  const srcDir = new Directory("src");
  srcDir.add(new FileLeaf("index.ts", 1200)).add(new FileLeaf("utils.ts", 800));

  const assetsDir = new Directory("assets");
  assetsDir
    .add(new FileLeaf("logo.png", 4096))
    .add(new FileLeaf("style.css", 500));

  root
    .add(srcDir)
    .add(assetsDir)
    .add(new FileLeaf("README.md", 300))
    .add(new FileLeaf("package.json", 150));

  console.log("=== 文件系统树 ===");
  root.print("");

  console.log(`\n项目总大小: ${root.getSize()} B`);
  console.log(`src 目录大小: ${srcDir.getSize()} B`);
  console.log(`单个文件大小 (README.md): ${new FileLeaf("README.md", 300).getSize()} B`);
}

main();
