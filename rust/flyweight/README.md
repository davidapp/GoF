# Flyweight 享元模式（Rust）

## 意图
通过共享技术高效支持大量细粒度对象，把对象状态拆分为可共享的“内在状态”和不可共享的“外在状态”，避免为每个逻辑对象都分配一份重复数据。

## 适用场景
- 应用需要创建海量相似对象（森林里成千上万棵树、地图上的瓦片、文本中的字符）
- 这些对象的大部分数据是相同的（内在状态），只有少量数据因对象而异（外在状态）
- 对象数量导致的内存开销已经成为明显瓶颈

## 实现方式
`TreeType`（名称/颜色/纹理）是可以被大量 `Tree` 共享的内在状态，`TreeFactory` 用
`HashMap<String, Rc<TreeType>>` 做缓存：相同参数第二次请求时直接返回已有的 `Rc`
克隆（只增加引用计数，不重新分配），不同参数才真正创建新的享元：

```rust
fn get_tree_type(&mut self, name: &str, color: &str, texture: &str) -> Rc<TreeType> {
    let key = format!("{name}-{color}-{texture}");
    if let Some(existing) = self.cache.get(&key) {
        Rc::clone(existing)
    } else {
        let tree_type = Rc::new(TreeType { .. });
        self.cache.insert(key, Rc::clone(&tree_type));
        tree_type
    }
}
```

`Tree` 只保存坐标（外在状态）和一份 `Rc<TreeType>`，`Forest` 里种多少棵树，`TreeType`
都只会按“不同参数组合数”创建，而不是按“树的棵数”创建。

## 文件说明
| 文件 | 说明 |
|------|------|
| `main.rs` | `TreeType` 享元、`TreeFactory` 享元工厂（`HashMap` 缓存）、`Tree`/`Forest`、`main()` 演示 |

## 编译与运行
```bash
rustc main.rs && ./main
```

## 输出示例
```
=== 享元模式：森林渲染演示 ===

(缓存未命中，创建新的 TreeType 享元: 橡树-绿色-粗糙树皮)
(缓存未命中，创建新的 TreeType 享元: 松树-深绿色-针叶纹理)

在 (  1,   2) 绘制一棵 [橡树]，颜色=绿色，纹理=粗糙树皮
在 (  5,   8) 绘制一棵 [橡树]，颜色=绿色，纹理=粗糙树皮
在 (  3,   9) 绘制一棵 [松树]，颜色=深绿色，纹理=针叶纹理
在 ( 12,   4) 绘制一棵 [橡树]，颜色=绿色，纹理=粗糙树皮
在 (  7,   1) 绘制一棵 [松树]，颜色=深绿色，纹理=针叶纹理

共种植 5 棵树，但只创建了 2 个 TreeType 享元对象
```
（预期输出（本机未安装 Rust，未实机运行）。）

## 要点
1. **`Rc<TreeType>` 是共享的关键** —— `Rc::clone` 只增加引用计数、不复制数据，
   5 棵树里有 3 棵“橡树”实际共用同一块 `TreeType` 内存。
2. **内在状态 vs 外在状态划分清楚** —— `TreeType`（不随对象而变）与坐标
   （每棵树各不相同）被分别放进两个不同的结构体，是享元模式成立的前提。
3. **工厂负责去重** —— 客户端 `Forest::plant_tree` 不需要关心某种树是否已经存在，
   一律调用 `factory.get_tree_type(...)`，去重逻辑完全封装在 `TreeFactory` 内部。
4. Rust 中 `Rc` 是单线程共享所有权的标准选择；若需要跨线程共享享元，
   把 `Rc` 换成 `Arc` 即可，其余结构不变。
