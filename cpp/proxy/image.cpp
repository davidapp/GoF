#include "image.h"
#include <iostream>

RealImage::RealImage(std::string filename) : filename_(std::move(filename)) { load_from_disk(); }

void RealImage::load_from_disk() const {
    std::cout << "  [RealImage] 正在从磁盘加载 " << filename_ << " ...（耗时操作）" << std::endl;
}

void RealImage::display() { std::cout << "  [RealImage] 显示 " << filename_ << std::endl; }

void ImageProxy::display() {
    if (!real_image_) {
        std::cout << "[ImageProxy] 首次访问 " << filename_ << "，触发真实加载" << std::endl;
        real_image_ = std::make_unique<RealImage>(filename_);
    } else {
        std::cout << "[ImageProxy] " << filename_ << " 已缓存，直接复用 RealImage" << std::endl;
    }
    real_image_->display();
}
