#include "filesystem.h"
#include <iostream>
#include <memory>

// 组合模式：客户端通过统一的 FileSystemNode 接口操作单个 File
// 或整棵 Directory 树，无需区分“叶子”与“容器”。
int main() {
    std::cout << "=== 组合模式：文件系统 ===\n" << std::endl;

    auto root = std::make_unique<Directory>("project");

    auto src = std::make_unique<Directory>("src");
    src->add(std::make_unique<File>("main.cpp", 1200));
    src->add(std::make_unique<File>("utils.cpp", 800));

    auto docs = std::make_unique<Directory>("docs");
    docs->add(std::make_unique<File>("README.md", 500));

    root->add(std::move(src));
    root->add(std::move(docs));
    root->add(std::make_unique<File>("Makefile", 300));

    root->print();

    std::cout << "\n项目总大小: " << root->size() << " 字节" << std::endl;

    return 0;
}
