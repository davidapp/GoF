#pragma once
#include <memory>
#include <string>
#include <vector>

// 抽象构件：文件系统节点，File（叶子）与 Directory（容器）的公共接口
class FileSystemNode {
public:
    explicit FileSystemNode(std::string name) : name_(std::move(name)) {}
    virtual ~FileSystemNode() = default;

    virtual long size() const = 0;               // 统一计算大小：叶子直接返回，容器递归求和
    virtual void print(int depth = 0) const = 0;  // 统一打印树形结构

    const std::string& name() const { return name_; }

protected:
    std::string indent(int depth) const { return std::string(static_cast<size_t>(depth) * 2, ' '); }

    std::string name_;
};

// 叶子节点：文件，没有子节点
class File : public FileSystemNode {
public:
    File(std::string name, long size_bytes) : FileSystemNode(std::move(name)), size_bytes_(size_bytes) {}

    long size() const override { return size_bytes_; }
    void print(int depth = 0) const override;

private:
    long size_bytes_;
};

// 容器节点：目录，可包含任意数量的 File 或 Directory
class Directory : public FileSystemNode {
public:
    explicit Directory(std::string name) : FileSystemNode(std::move(name)) {}

    void add(std::unique_ptr<FileSystemNode> child);

    long size() const override;
    void print(int depth = 0) const override;

private:
    std::vector<std::unique_ptr<FileSystemNode>> children_;
};
