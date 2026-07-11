# Composite 组合模式（Objective-C）

## 意图

将对象组合成树形结构以表示"部分-整体"的层次关系，使客户端对单个对象（叶子）和组合对象（容器）的使用具有一致性。

## 适用场景

- 数据本身就是树形/层次结构（文件系统、UI 视图树、组织架构）
- 希望客户端代码不必区分"处理的是单个对象还是一组对象"
- 需要对整棵树递归执行同一操作（求总大小、统一渲染）

## 实现方式

`FileSystemComponent` 协议统一声明 `size`/`printWithIndent:`。叶子 `File` 直接返回自身大小；组合 `Directory` 持有 `NSMutableArray<id<FileSystemComponent>>`，递归对每个子节点调用同名方法后求和 —— 调用者完全不需要判断子节点是文件还是子目录：

```objc
- (NSInteger)size {
    NSInteger total = 0;
    for (id<FileSystemComponent> child in _children) {
        total += [child size]; // 子节点是 File 还是 Directory 都一样调用
    }
    return total;
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `Composite.h` | `FileSystemComponent` 组件协议、叶子 `File`、组合 `Directory` 声明 |
| `Composite.m` | 上述类型的实现 |
| `main.m` | 搭建一棵包含子目录的文件树，打印结构并计算总大小 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
=== 目录树（文件与目录被统一对待） ===
+ project/ (5450 字节)
  - README.md (1200 字节)
  + src/ (4200 字节)
    - main.swift (3400 字节)
    - utils.swift (800 字节)
  - .gitignore (50 字节)
 
项目总大小: 5450 字节
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行）

## 要点

1. **统一接口** —— `File` 与 `Directory` 都遵循 `FileSystemComponent`，客户端代码 `[component size]` 无需 `if/else` 判断类型。
2. **递归结构** —— `Directory.size`/`printWithIndent:` 通过递归调用子节点的同名方法实现，天然契合树形数据。
3. **易于扩展** —— 新增一种叶子类型（如符号链接）只需实现协议，组合逻辑完全不用改。
