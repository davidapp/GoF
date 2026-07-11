# Prototype 原型模式（Objective-C）

## 意图

通过复制现有对象（原型）来创建新对象，而不是通过 `new`/`init` 重新指定所有参数。当创建成本较高，或需要保留对象当前状态的一份独立副本时非常有用。

## 适用场景

- 对象的创建成本较高（初始化逻辑复杂、涉及大量属性）
- 需要一个与现有对象状态相同、但相互独立的新对象
- 希望在运行时动态指定要创建的对象类型（克隆一个已有实例，而不是写死类名）

## 实现方式

ObjC 中原型模式的惯用做法就是遵循 Foundation 内建的 `NSCopying` 协议，实现 `-copyWithZone:`，客户端统一调用 `-copy`。`Shape` 是抽象原型，`Circle`/`Rectangle` 是具体原型，各自在 `copyWithZone:` 中把自己特有的属性也复制一份：

```objc
@interface Shape : NSObject <NSCopying>
@end

@implementation Circle
- (id)copyWithZone:(NSZone *)zone {
    return [[Circle allocWithZone:zone] initWithColor:self.color x:self.x y:self.y radius:self.radius];
}
@end

// 客户端
Circle *clone = [originalCircle copy];
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `Prototype.h` | 抽象原型 `Shape`（遵循 `NSCopying`）、具体原型 `Circle`/`Rectangle` 声明 |
| `Prototype.m` | 上述类型的实现，包含各自的 `copyWithZone:` |
| `main.m` | 克隆图形、修改克隆体属性，验证与原对象互不影响 |
| `Makefile` | 编译与运行 |

## 编译与运行

```bash
make run    # 编译并运行
make        # 仅编译
make clean  # 清理
```

## 输出示例

```
=== 原型对象 ===
原始圆形: 圆形 | 颜色: 红色, 位置: (0.0, 0.0), 半径: 5.0
原始矩形: 矩形 | 颜色: 蓝色, 位置: (1.0, 1.0), 宽: 10.0, 高: 20.0

=== 克隆并修改后 ===
克隆圆形: 圆形 | 颜色: 绿色, 位置: (100.0, 0.0), 半径: 5.0
克隆矩形: 矩形 | 颜色: 黄色, 位置: (1.0, 1.0), 宽: 10.0, 高: 999.0

=== 验证原对象未受影响 ===
原始圆形: 圆形 | 颜色: 红色, 位置: (0.0, 0.0), 半径: 5.0
原始矩形: 矩形 | 颜色: 蓝色, 位置: (1.0, 1.0), 宽: 10.0, 高: 20.0

地址验证: original=0x600001c4c9a0, clone=0x600001c4cb10（不同实例）
```

（预期输出 —— 本机未安装 ObjC 工具链，未实机运行；具体地址每次运行都会变化）

## 要点

1. **复用 `NSCopying`** —— 不必自造 `clone` 协议，Foundation 已经提供了标准约定，`-copy` 是 ObjC 世界里"克隆"的标准词汇。
2. **每个具体类各自负责自己的字段** —— 子类的 `copyWithZone:` 先构造自身，再把父类字段通过初始化器带过去，避免遗漏。
3. **深浅拷贝需留意** —— 本例属性均为值类型或不可变字符串（`copy` 语义），浅拷贝已足够；若属性是可变容器或自定义可变对象，需要在 `copyWithZone:` 中递归调用其 `-copy`。
