# Composite 组合模式（Go）

## 意图

将对象组合成树形结构以表示"部分-整体"的层次关系，使客户端可以统一处理单个对象（叶子）和对象组合（容器）。

## 适用场景

- 数据天然是树形结构：文件系统、组织架构、UI 控件树
- 希望客户端代码无需区分"这是一个叶子节点还是一个容器节点"
- 需要对整棵树递归执行同一操作（如统计总大小、统一打印）

## 实现方式

`FileSystemNode` 接口统一了 `File`（叶子）与 `Directory`（容器）：两者都实现
`Name()/Size()/Print()`。`Directory.Size()` 递归累加子节点大小，不关心子节点具体类型：

```go
// 组件接口：文件与目录的统一抽象，客户端无需区分叶子节点还是容器节点
type FileSystemNode interface {
	Name() string
	Size() int64
	Print(indent string)
}

// Size 递归累加所有子节点大小，调用者无需关心子节点是文件还是目录
func (d *Directory) Size() int64 {
	var total int64
	for _, child := range d.children {
		total += child.Size()
	}
	return total
}
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `main.go` | `FileSystemNode` 接口、`File` 叶子、`Directory` 容器、`main` 演示入口 |

## 编译与运行

```bash
cd go/composite
go run .
```

## 输出示例

预期输出（本机未安装 Go 工具链，未实机运行）：

```
=== 组合模式：文件系统 ===
+ project/ (2350 字节)
  + src/ (2000 字节)
    - main.go (1200 字节)
    - utils.go (800 字节)
  + docs/ (300 字节)
    - README.md (300 字节)
  - go.mod (50 字节)
------------------------------
项目总大小: 2350 字节
```

## 要点

1. **递归结构** — `Directory` 的子节点既可以是 `File` 也可以是另一个 `Directory`，天然形成任意深度的树。
2. **统一接口** — 客户端（`main`）通过 `FileSystemNode` 接口操作节点，无需 `switch` 判断具体类型。
3. **链式 Add** — `Add` 返回 `*Directory` 自身，方便连续挂载多个子节点。
