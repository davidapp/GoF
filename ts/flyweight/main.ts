/**
 * 享元模式（Flyweight）
 * 场景：森林 —— 大量 Tree 共享 TreeType（名称/颜色/纹理）内在状态。
 *
 * 核心思想：将对象的状态拆分为
 *   - 内在状态（intrinsic）：可共享、不随环境变化，如树种、颜色、纹理；
 *   - 外在状态（extrinsic）：不可共享、随上下文变化，如坐标；
 * 通过工厂缓存并复用内在状态对象，大幅减少对象数量、节省内存。
 */

// ---------- 享元（Flyweight）：内在状态，可被多个 Tree 共享 ----------
class TreeType {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly texture: string,
  ) {}

  draw(x: number, y: number): string {
    return `在 (${x}, ${y}) 绘制一棵【${this.name}】(颜色=${this.color}, 纹理=${this.texture})`;
  }
}

// ---------- 享元工厂（Flyweight Factory）：缓存并复用 TreeType ----------
class TreeFactory {
  private static readonly cache = new Map<string, TreeType>();

  static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}_${color}_${texture}`;
    let type = TreeFactory.cache.get(key);
    if (type === undefined) {
      type = new TreeType(name, color, texture);
      TreeFactory.cache.set(key, type);
      console.log(`  [工厂] 创建新的 TreeType: ${key}`);
    }
    return type;
  }

  static getCreatedTypeCount(): number {
    return TreeFactory.cache.size;
  }
}

// ---------- 使用享元的对象：Tree 只保存外在状态（坐标）+ 共享的内在状态引用 ----------
class Tree {
  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly type: TreeType, // 共享的内在状态
  ) {}

  draw(): string {
    return this.type.draw(this.x, this.y);
  }
}

// ---------- 客户端：森林管理大量树木 ----------
class Forest {
  private readonly trees: Tree[] = [];

  plantTree(x: number, y: number, name: string, color: string, texture: string): void {
    const type = TreeFactory.getTreeType(name, color, texture);
    this.trees.push(new Tree(x, y, type));
  }

  draw(): void {
    for (const tree of this.trees) {
      console.log(tree.draw());
    }
  }

  getTreeCount(): number {
    return this.trees.length;
  }
}

// ---------- 演示 ----------
function main(): void {
  const forest = new Forest();

  console.log("=== 种植 6 棵树（只有 2 种树种） ===");
  forest.plantTree(1, 1, "橡树", "深绿色", "粗糙树皮");
  forest.plantTree(2, 5, "橡树", "深绿色", "粗糙树皮");
  forest.plantTree(3, 8, "白桦", "浅绿色", "光滑树皮");
  forest.plantTree(10, 2, "橡树", "深绿色", "粗糙树皮");
  forest.plantTree(15, 6, "白桦", "浅绿色", "光滑树皮");
  forest.plantTree(20, 9, "橡树", "深绿色", "粗糙树皮");

  console.log("\n=== 绘制森林 ===");
  forest.draw();

  console.log("\n=== 内存效果统计 ===");
  console.log(`树木总数（外在状态对象）: ${forest.getTreeCount()}`);
  console.log(`实际创建的 TreeType 数（内在状态/共享对象）: ${TreeFactory.getCreatedTypeCount()}`);
}

main();
