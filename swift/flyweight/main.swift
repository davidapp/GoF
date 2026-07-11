import Foundation

// 享元模式：森林
// 场景：大量 Tree 共享 TreeType（名称/颜色/纹理）内在状态

// MARK: - 享元对象：树的内在状态（可共享：名称、颜色、纹理），与具体坐标无关
final class TreeType {
    let name: String
    let color: String
    let texture: String

    init(name: String, color: String, texture: String) {
        self.name = name
        self.color = color
        self.texture = texture
    }

    func draw(x: Int, y: Int) -> String {
        "在(\(x), \(y))绘制一棵[\(color)\(name)]，纹理=\(texture)"
    }
}

// MARK: - 享元工厂：缓存并复用已创建的 TreeType，避免重复创建相同对象
enum TreeTypeFactory {
    private static var cache: [String: TreeType] = [:]

    static func getTreeType(name: String, color: String, texture: String) -> TreeType {
        let key = "\(name)_\(color)_\(texture)"
        if let existing = cache[key] {
            return existing
        }
        let newType = TreeType(name: name, color: color, texture: texture)
        cache[key] = newType
        print("  [工厂] 创建新的 TreeType: \(key)")
        return newType
    }

    static var createdCount: Int {
        cache.count
    }
}

// MARK: - 树：外在状态（坐标）+ 指向共享内在状态的引用；struct 包一层引用，二者各司其职
struct Tree {
    let x: Int
    let y: Int
    let type: TreeType

    func draw() -> String {
        type.draw(x: x, y: y)
    }
}

// MARK: - 森林：管理大量 Tree
final class Forest {
    private var trees: [Tree] = []

    func plantTree(x: Int, y: Int, name: String, color: String, texture: String) {
        let type = TreeTypeFactory.getTreeType(name: name, color: color, texture: texture)
        trees.append(Tree(x: x, y: y, type: type))
    }

    func draw() {
        for tree in trees {
            print(tree.draw())
        }
    }

    var count: Int { trees.count }
}

// MARK: - 顶层入口
print("=== 享元模式：森林中的树 ===\n")

let forest = Forest()

print("种植 6 棵树（只有 2 种 TreeType：松树/橡树）：")
forest.plantTree(x: 1, y: 1, name: "松树", color: "深绿色", texture: "粗糙树皮")
forest.plantTree(x: 2, y: 5, name: "松树", color: "深绿色", texture: "粗糙树皮")
forest.plantTree(x: 3, y: 2, name: "橡树", color: "浅绿色", texture: "光滑树皮")
forest.plantTree(x: 8, y: 4, name: "松树", color: "深绿色", texture: "粗糙树皮")
forest.plantTree(x: 6, y: 7, name: "橡树", color: "浅绿色", texture: "光滑树皮")
forest.plantTree(x: 9, y: 9, name: "松树", color: "深绿色", texture: "粗糙树皮")

print("\n绘制森林：")
forest.draw()

print("\n共种植 \(forest.count) 棵树，但只创建了 \(TreeTypeFactory.createdCount) 个共享 TreeType 对象")
