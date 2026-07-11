# Builder 建造者模式（Java）

## 意图

将一个复杂对象的构建过程与其表示分离，使同样的构建过程可以创建不同的表示；
把“分步设置参数”与“最终产出不可变对象”解耦。

## 适用场景

- 对象的构造需要多个步骤、多个可选参数，构造函数参数列表会过长（“伸缩构造函数”问题）
- 希望构造出的对象是不可变（immutable）的
- 相同的构建过程需要创建不同的产品表示（如办公机 / 游戏主机 / 服务器）

## 实现方式

`Computer` 的构造函数私有，只能通过内部静态类 `Computer.Builder` 链式设置参数，
最后调用 `build()` 产出不可变对象：

```java
Computer gaming = new Computer.Builder()
        .cpu("Intel i9-14900K")
        .memoryGb(32)
        .gpu("NVIDIA RTX 4090")
        .build();
```

`ComputerDirector` 把几种常见搭配（办公机/游戏主机/服务器）封装成预设方法，
客户端也可以不经过 Director、直接使用 Builder 完全自定义配置。

## 文件说明

| 文件 | 说明 |
|------|------|
| `Computer.java` | 产品类，内部包含静态 `Builder` 类 |
| `ComputerDirector.java` | 指挥者，封装几种预设组装流程 |
| `Main.java` | 程序入口，演示预设配置与自定义配置两种用法 |

## 编译与运行

```bash
cd java/builder
javac *.java
java Main
```

## 输出示例

```
=== 建造者模式：分步组装 Computer ===

[预设：办公用机]
Computer 配置清单:
  CPU  : Intel i3-13100
  内存 : 8GB
  存储 : 256GB
  GPU  : 集成显卡

[预设：游戏主机]
Computer 配置清单:
  CPU  : Intel i9-14900K
  内存 : 32GB
  存储 : 1024GB
  GPU  : NVIDIA RTX 4090

[预设：服务器]
Computer 配置清单:
  CPU  : AMD EPYC 9654
  内存 : 128GB
  存储 : 4096GB
  GPU  : 集成显卡

[自定义配置：不经过 Director，直接用 Builder 链式调用]
Computer 配置清单:
  CPU  : Apple M3 Max
  内存 : 64GB
  存储 : 2048GB
  GPU  : Apple 40-core GPU
```

（预期输出：本机未安装 JDK，未实机运行）

## 要点

1. **不可变产品** —— `Computer` 只有私有构造函数，一旦 `build()` 完成就不能再修改，线程安全。
2. **链式调用** —— `Builder` 每个 setter 都返回 `this`，可以流畅地连续设置多个参数。
3. **Director 是可选的** —— Director 只是封装了几种常见搭配，本质上仍是在调用 Builder；
   需要完全自定义时可以绕开 Director。
