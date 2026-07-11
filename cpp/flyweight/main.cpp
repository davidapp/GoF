#include "forest.h"
#include <iostream>

// 享元模式：森林里成千上万棵树，但只有少数几种「树种」，
// 把名称/颜色/纹理这些内在状态共享出来，坐标等外在状态由 Tree 自己持有。
int main() {
    std::cout << "=== 享元模式：森林 ===\n" << std::endl;

    Forest forest;
    forest.plant_tree(1, 1, "松树", "深绿色", "松树纹理.png");
    forest.plant_tree(2, 5, "松树", "深绿色", "松树纹理.png");
    forest.plant_tree(8, 3, "枫树", "红色", "枫树纹理.png");
    forest.plant_tree(4, 9, "松树", "深绿色", "松树纹理.png");
    forest.plant_tree(6, 2, "枫树", "红色", "枫树纹理.png");

    std::cout << "\n开始渲染森林（共 " << forest.tree_count() << " 棵树）:" << std::endl;
    forest.render();

    std::cout << "\n实际创建的 TreeType 共享对象数: " << TreeTypeFactory::type_count()
              << "（远小于树的总数 " << forest.tree_count() << "，内在状态被成功复用）" << std::endl;

    return 0;
}
