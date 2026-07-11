// ============================================================
// 享元模式（Flyweight）
// 场景：森林中存在大量 Tree，共享 TreeType（名称/颜色/纹理）的内在状态
// ============================================================

// ---- 享元（Flyweight）：只保存“内在状态”（可共享、与位置无关）----
class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  // 渲染时才传入“外在状态”（每棵树各自不同的位置）
  draw(x, y) {
    console.log(
      `绘制 [${this.name}] 颜色=${this.color} 纹理=${this.texture} 于坐标(${x}, ${y})`
    );
  }
}

// ---- 享元工厂：保证相同参数只创建一份 TreeType 实例并缓存复用 ----
class TreeTypeFactory {
  static #cache = new Map();

  static getTreeType(name, color, texture) {
    const key = `${name}_${color}_${texture}`;
    if (!TreeTypeFactory.#cache.has(key)) {
      console.log(`  [工厂] 缓存未命中，创建新的 TreeType: ${key}`);
      TreeTypeFactory.#cache.set(key, new TreeType(name, color, texture));
    } else {
      console.log(`  [工厂] 命中缓存，复用已有 TreeType: ${key}`);
    }
    return TreeTypeFactory.#cache.get(key);
  }

  static get cachedCount() {
    return TreeTypeFactory.#cache.size;
  }
}

// ---- 使用享元的对象：Tree 只保存“外在状态”（位置），内在状态引用共享的 TreeType ----
class Tree {
  constructor(x, y, treeType) {
    this.x = x;
    this.y = y;
    this.type = treeType; // 引用共享对象，不复制
  }

  draw() {
    this.type.draw(this.x, this.y);
  }
}

// ---- 森林：管理大量 Tree 实例 ----
class Forest {
  #trees = [];

  plantTree(x, y, name, color, texture) {
    const type = TreeTypeFactory.getTreeType(name, color, texture);
    this.#trees.push(new Tree(x, y, type));
  }

  draw() {
    for (const tree of this.#trees) {
      tree.draw();
    }
  }

  get treeCount() {
    return this.#trees.length;
  }
}

console.log('=== 享元模式：森林中共享树木类型 ===\n');

const forest = new Forest();

console.log('-- 种植 6 棵树（只有 2 种类型：橡树、松树）--');
forest.plantTree(1, 2, '橡树', '深绿色', '粗糙树皮纹理');
forest.plantTree(5, 8, '松树', '墨绿色', '针叶纹理');
forest.plantTree(3, 9, '橡树', '深绿色', '粗糙树皮纹理');
forest.plantTree(12, 4, '松树', '墨绿色', '针叶纹理');
forest.plantTree(7, 1, '橡树', '深绿色', '粗糙树皮纹理');
forest.plantTree(20, 15, '松树', '墨绿色', '针叶纹理');

console.log('\n-- 绘制整片森林 --');
forest.draw();

console.log(`\n森林中树木总数: ${forest.treeCount}`);
console.log(`实际创建的 TreeType 共享对象数: ${TreeTypeFactory.cachedCount}`);
console.log('（若不使用享元，将需要为每棵树都创建一份重复的名称/颜色/纹理数据）');
