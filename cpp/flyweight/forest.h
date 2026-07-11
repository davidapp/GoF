#pragma once
#include <memory>
#include <string>
#include <unordered_map>
#include <vector>

// 享元：树的内在状态（可共享）——名称/颜色/纹理相同的树只创建一份
class TreeType {
public:
    TreeType(std::string name, std::string color, std::string texture)
        : name_(std::move(name)), color_(std::move(color)), texture_(std::move(texture)) {}

    void render(int x, int y) const;

private:
    std::string name_;
    std::string color_;
    std::string texture_;  // 假设是一大块纹理数据，重复创建代价很高
};

// 享元工厂：确保相同参数的 TreeType 只被创建一次并被所有 Tree 共享
class TreeTypeFactory {
public:
    static TreeType& get_tree_type(const std::string& name, const std::string& color,
                                    const std::string& texture);
    static size_t type_count();  // 用于观察实际创建了多少个共享对象

private:
    static std::unordered_map<std::string, std::unique_ptr<TreeType>> pool_;
};

// 树：外在状态（坐标）+ 对共享内在状态的引用
class Tree {
public:
    Tree(int x, int y, TreeType& type) : x_(x), y_(y), type_(type) {}
    void render() const { type_.render(x_, y_); }

private:
    int x_;
    int y_;
    TreeType& type_;  // 指向共享的享元对象，而非持有独立副本
};

// 森林：管理大量 Tree 对象
class Forest {
public:
    void plant_tree(int x, int y, const std::string& name, const std::string& color,
                     const std::string& texture);
    void render() const;
    size_t tree_count() const { return trees_.size(); }

private:
    std::vector<Tree> trees_;
};
