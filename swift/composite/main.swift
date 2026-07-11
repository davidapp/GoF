import Foundation

// 组合模式：文件系统
// 场景：File 与 Directory 统一计算总大小 / 打印树

// MARK: - 组件协议：文件和目录的统一接口
protocol FileSystemComponent {
    var name: String { get }
    func size() -> Int
    func printTree(indent: String)
}

// MARK: - 叶子节点：文件，没有子节点
struct File: FileSystemComponent {
    let name: String
    let fileSize: Int

    func size() -> Int {
        fileSize
    }

    func printTree(indent: String) {
        print("\(indent)- \(name) (\(fileSize) B)")
    }
}

// MARK: - 容器节点：目录，可包含文件或子目录，与叶子节点实现同一协议
final class Directory: FileSystemComponent {
    let name: String
    private var children: [FileSystemComponent] = []

    init(name: String) {
        self.name = name
    }

    func add(_ component: FileSystemComponent) {
        children.append(component)
    }

    // 递归计算总大小：目录大小 = 所有子节点大小之和
    func size() -> Int {
        children.reduce(0) { $0 + $1.size() }
    }

    // 递归打印整棵树，客户端无需区分当前节点是文件还是目录
    func printTree(indent: String) {
        print("\(indent)+ \(name)/ (\(size()) B)")
        for child in children {
            child.printTree(indent: indent + "  ")
        }
    }
}

// MARK: - 顶层入口
print("=== 组合模式：文件系统 ===\n")

let root = Directory(name: "project")
let srcDir = Directory(name: "src")
let docsDir = Directory(name: "docs")

srcDir.add(File(name: "main.swift", fileSize: 1200))
srcDir.add(File(name: "utils.swift", fileSize: 800))

docsDir.add(File(name: "README.md", fileSize: 300))

root.add(srcDir)
root.add(docsDir)
root.add(File(name: ".gitignore", fileSize: 50))

root.printTree(indent: "")

print("\n项目总大小: \(root.size()) 字节")
