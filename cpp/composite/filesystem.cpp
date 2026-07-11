#include "filesystem.h"
#include <iostream>

void File::print(int depth) const {
    std::cout << indent(depth) << "- " << name_ << " (" << size_bytes_ << " 字节)" << std::endl;
}

void Directory::add(std::unique_ptr<FileSystemNode> child) { children_.push_back(std::move(child)); }

long Directory::size() const {
    long total = 0;
    for (const auto& child : children_) {
        total += child->size();  // 递归调用：File 与 Directory 被一视同仁地对待
    }
    return total;
}

void Directory::print(int depth) const {
    std::cout << indent(depth) << "+ " << name_ << "/ (" << size() << " 字节)" << std::endl;
    for (const auto& child : children_) {
        child->print(depth + 1);
    }
}
