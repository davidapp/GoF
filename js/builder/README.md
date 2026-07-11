# Builder 建造者模式（JavaScript）

## 意图
将一个复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。适用于对象
需要分步骤设置多个可选部件，且不希望构造函数出现大量参数（“望远镜构造函数”问题）的场景。

## 适用场景
- 创建复杂对象的算法应该独立于该对象的组成部分及其装配方式。
- 同一个构建过程需要产生多种不同的表示（如游戏本、办公本、定制本）。
- 需要在构建过程中对最终对象的内部状态进行精细控制（分步设置、可选步骤）。

## 实现方式
`ComputerBuilder` 提供 `setCPU/setRAM/setStorage/setGPU` 等链式方法，逐步填充内部的
`Computer` 实例，最终由 `build()` 返回构建完成的产品（并重置内部状态以支持复用同一个
builder 构建下一台）。`ComputerDirector` 把常见配置封装成静态方法，隐藏具体的调用顺序：

```js
class ComputerBuilder {
  #computer = new Computer();
  setCPU(cpu) { this.#computer.cpu = cpu; return this; }
  build() {
    const result = this.#computer;
    this.#computer = new Computer();
    return result;
  }
}

class ComputerDirector {
  static gamingPC(builder) {
    return builder.setCPU('Intel Core i9-14900K').setRAM('32GB DDR5 6000MHz')
      .setStorage('2TB NVMe SSD').setGPU('NVIDIA RTX 4090').build();
  }
}
```

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.mjs` | 建造者模式完整示例：`Computer` 产品、`ComputerBuilder` 建造者、`ComputerDirector` 指挥者及自定义配置演示 |

## 编译与运行
```bash
node main.mjs
```

## 输出示例
```
=== 建造者模式：分步组装电脑 ===

-- 游戏主机预设 --
电脑配置清单:
  CPU   : Intel Core i9-14900K
  内存  : 32GB DDR5 6000MHz
  存储  : 2TB NVMe SSD
  显卡  : NVIDIA RTX 4090

-- 办公主机预设 --
电脑配置清单:
  CPU   : Intel Core i5-13400
  内存  : 16GB DDR4 3200MHz
  存储  : 512GB NVMe SSD
  显卡  : 集成显卡

-- 自定义配置（不经过 Director）--
电脑配置清单:
  CPU   : Apple M3 Max
  内存  : 128GB 统一内存
  存储  : 8TB SSD
  显卡  : 无独立显卡
```

## 要点
1. 链式方法（返回 `this`）是 JS 中实现 Builder 最惯用的写法，可读性接近声明式配置。
2. `build()` 后重置内部 `#computer`，避免同一个 builder 实例被复用时污染已构建的产品。
3. Director 不是必需的，它只是把“常见配置组合”封装成可复用的步骤序列；客户端也可以绕过
   Director 直接调用 builder 做完全自定义的组装（如示例中的 Apple M3 Max 配置）。
4. 相比构造函数传一个大参数对象，Builder 能表达“分步骤、可选步骤、每步有校验”的构建过程。
