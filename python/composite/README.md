# Composite 组合模式（Python）

## 意图

将对象组合成树形结构以表示"部分-整体"的层次关系，使客户端对单个对象（叶子）和
组合对象（容器）的使用具有一致性——调用同一个接口，无需在代码里写 `isinstance` 判断。

## 适用场景

- 需要表示对象的"部分-整体"层次结构（文件系统、组织架构、UI 控件树等）
- 希望客户端忽略组合对象与单个对象的差异，统一处理
- 结构可能递归嵌套，且层数不固定

## 实现方式

`FileSystemNode` 是抽象构件，声明 `size` 属性与 `display()` 方法；`File` 是叶子节点，
直接返回自身大小；`Directory` 是组合节点，持有子节点列表，`size` 递归求和：

```python
class Directory(FileSystemNode):
    """组合构件：目录，可包含文件或子目录（递归结构）"""

    @property
    def size(self) -> int:
        # 递归汇总所有子节点的大小，调用者无需关心子节点是文件还是子目录
        return sum(child.size for child in self._children)

    def display(self, indent: int = 0) -> None:
        print("  " * indent + f"+ {self.name}/ ({self.size} B)")
        for child in self._children:
            child.display(indent + 1)
```

调用方统一通过 `FileSystemNode.size` / `display()` 访问，无论节点是文件还是目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.py` | `FileSystemNode` 抽象构件、`File` 叶子、`Directory` 组合、`main()` 构建并打印目录树 |

## 编译与运行

```bash
python main.py
```

## 输出示例

```
--- 目录树结构 ---
+ project/ (8704 B)
  - README.md (2048 B)
  + src/ (5632 B)
    - main.py (4096 B)
    - utils.py (1536 B)
  + tests/ (1024 B)
    - test_main.py (1024 B)

project 总大小 : 8704 B
src 子目录大小 : 5632 B

--- 删除 tests 目录后 ---
+ project/ (7680 B)
  - README.md (2048 B)
  + src/ (5632 B)
    - main.py (4096 B)
    - utils.py (1536 B)
project 总大小 : 7680 B
```

## 要点

1. **统一接口** —— `File` 与 `Directory` 都实现 `size`/`display()`，客户端代码完全一致，无需区分类型。
2. **递归天然契合组合结构** —— `Directory.size` 与 `display()` 都通过递归调用子节点的同名方法完成聚合，代码量不随树的深度增加。
3. **透明式组合** —— `add()`/`remove()` 定义在 `Directory` 上而非抽象基类，是"安全式"组合（叶子节点不会意外拥有增删子节点的方法）；如需"透明式"可将其上提到 `FileSystemNode`，两种取舍各有场景。
4. 与装饰器的区别：组合模式强调"整体-部分"的树形聚合，装饰器强调"单一链条"上逐层增强职责。
