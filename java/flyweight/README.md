# Flyweight 享元模式（Java）

## 意图

运用共享技术有效地支持大量细粒度的对象，把可以共享的“内在状态”抽取出来集中存储，
避免为每个对象都保存一份重复数据，从而节省内存。

## 适用场景

- 系统中存在大量相似对象，造成很大的内存开销（如森林中成千上万棵树、文本编辑器里的每个字符）
- 对象的大部分状态都可以抽取为“内在状态”（可共享），只有少量“外在状态”因对象而异
- 剥离外在状态后，可以用相对较少的共享对象取代大量对象

## 实现方式

`TreeType`（内在状态：名称/颜色/纹理）用 `record` 表示，天然不可变、自带
`equals()`/`hashCode()`，适合作为共享的享元对象；`TreeFactory` 用 `Map` 做缓存池，
相同参数只创建一次：

```java
public class TreeFactory {
    private static final Map<String, TreeType> CACHE = new HashMap<>();

    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + "-" + color + "-" + texture;
        return CACHE.computeIfAbsent(key, k -> new TreeType(name, color, texture));
    }
}
```

`Tree` 只保存外在状态——坐标 `(x, y)`——以及一个指向共享 `TreeType` 的引用，
森林中即使种了成千上万棵树，具体的“松树/深绿色/粗糙树皮”这份数据也只会存在一份。

## 文件说明

| 文件 | 说明 |
|------|------|
| `TreeType.java` | 享元：树的内在状态（名称/颜色/纹理），可被共享 |
| `TreeFactory.java` | 享元工厂，用 Map 缓存池保证相同参数只创建一次 |
| `Tree.java` | 享元的使用者，持有外在状态（坐标）+ 共享的 TreeType 引用 |
| `Main.java` | 程序入口，种植多棵树并验证共享效果 |

## 编译与运行

```bash
cd java/flyweight
javac *.java
java Main
```

## 输出示例

```
=== 享元模式：森林种树 ===

开始种植 6 棵树：
  [TreeFactory] 缓存未命中，创建新的 TreeType: 松树-深绿色-粗糙树皮
  [TreeFactory] 缓存未命中，创建新的 TreeType: 白桦树-浅绿色-光滑树皮
  [TreeFactory] 缓存未命中，创建新的 TreeType: 枫树-红色-斑驳树皮

遍历整片森林并绘制：
在 (1, 1) 绘制一棵【松树】，颜色=深绿色，纹理=粗糙树皮
在 (2, 5) 绘制一棵【松树】，颜色=深绿色，纹理=粗糙树皮
在 (8, 3) 绘制一棵【白桦树】，颜色=浅绿色，纹理=光滑树皮
在 (3, 9) 绘制一棵【松树】，颜色=深绿色，纹理=粗糙树皮
在 (6, 2) 绘制一棵【白桦树】，颜色=浅绿色，纹理=光滑树皮
在 (9, 9) 绘制一棵【枫树】，颜色=红色，纹理=斑驳树皮

共种植 6 棵树，但只创建了 3 个 TreeType 共享对象
```

（预期输出：本机未安装 JDK，未实机运行）

## 要点

1. **内在状态 vs 外在状态** —— 名称/颜色/纹理与坐标无关，可以共享；坐标因树而异，
   必须由调用方（`Tree`）在使用时传入。
2. **工厂集中管理共享池** —— `TreeFactory` 是获取享元对象的唯一入口，
   客户端不会绕过它直接 `new TreeType(...)`。
3. **用 record 表达享元** —— `record` 默认不可变，恰好满足享元对象“一旦共享就不应被修改”的要求。
