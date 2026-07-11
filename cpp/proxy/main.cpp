#include "image.h"
#include <iostream>
#include <memory>
#include <vector>

// 代理模式：ImageProxy 与 RealImage 实现同一个 Image 接口，
// 客户端全程只操作 Image，感知不到懒加载发生的时机。
int main() {
    std::cout << "=== 代理模式：图片懒加载 ===\n" << std::endl;

    std::vector<std::unique_ptr<Image>> gallery;
    gallery.push_back(std::make_unique<ImageProxy>("风景.jpg"));
    gallery.push_back(std::make_unique<ImageProxy>("人像.jpg"));

    std::cout << "相册已创建，但尚未加载任何图片（RealImage 还未创建）\n" << std::endl;

    std::cout << "--- 第一次浏览 ---" << std::endl;
    for (auto& image : gallery) {
        image->display();
    }

    std::cout << "\n--- 第二次浏览（应直接复用已加载的图片） ---" << std::endl;
    for (auto& image : gallery) {
        image->display();
    }

    return 0;
}
