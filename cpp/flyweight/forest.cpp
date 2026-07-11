#include "forest.h"
#include <iostream>

std::unordered_map<std::string, std::unique_ptr<TreeType>> TreeTypeFactory::pool_;

void TreeType::render(int x, int y) const {
    std::cout << "  在 (" << x << "," << y << ") 绘制 " << color_ << name_ << " [纹理: " << texture_
              << "]" << std::endl;
}

TreeType& TreeTypeFactory::get_tree_type(const std::string& name, const std::string& color,
                                          const std::string& texture) {
    std::string key = name + "-" + color + "-" + texture;
    auto it = pool_.find(key);
    if (it == pool_.end()) {
        std::cout << "  [享元工厂] 池中没有，创建新的 TreeType: " << key << std::endl;
        it = pool_.emplace(key, std::make_unique<TreeType>(name, color, texture)).first;
    } else {
        std::cout << "  [享元工厂] 复用已有 TreeType: " << key << std::endl;
    }
    return *it->second;
}

size_t TreeTypeFactory::type_count() { return pool_.size(); }

void Forest::plant_tree(int x, int y, const std::string& name, const std::string& color,
                         const std::string& texture) {
    TreeType& type = TreeTypeFactory::get_tree_type(name, color, texture);
    trees_.emplace_back(x, y, type);
}

void Forest::render() const {
    for (const auto& tree : trees_) {
        tree.render();
    }
}
