#include "book_collection.h"
#include <iostream>

// 迭代器模式：BookCollection 内部用 vector 存储，但对外只暴露 Iterator，
// 客户端通过统一接口（乃至 range-for）顺序遍历，不依赖具体容器类型。
int main() {
    std::cout << "=== 迭代器模式：BookCollection ===\n" << std::endl;

    BookCollection collection;
    collection.add({"三体", "刘慈欣"});
    collection.add({"活着", "余华"});
    collection.add({"百年孤独", "加西亚·马尔克斯"});

    std::cout << "共 " << collection.size() << " 本书，用 range-for 顺序遍历:" << std::endl;
    for (const auto& book : collection) {
        std::cout << "  《" << book.title << "》 —— " << book.author << std::endl;
    }

    std::cout << "\n手动使用迭代器遍历:" << std::endl;
    for (auto it = collection.begin(); it != collection.end(); ++it) {
        std::cout << "  " << (*it).title << std::endl;
    }

    return 0;
}
