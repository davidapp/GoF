#pragma once
#include <memory>
#include <string>

// 抽象主题：图片接口
class Image {
public:
    virtual ~Image() = default;
    virtual void display() = 0;
};

// 真实主题：加载成本很高的真实图片
class RealImage : public Image {
public:
    explicit RealImage(std::string filename);
    void display() override;

private:
    void load_from_disk() const;
    std::string filename_;
};

// 代理：虚拟代理，延迟到首次 display() 才真正创建 RealImage
class ImageProxy : public Image {
public:
    explicit ImageProxy(std::string filename) : filename_(std::move(filename)) {}
    void display() override;

private:
    std::string filename_;
    std::unique_ptr<RealImage> real_image_;  // 为空表示尚未加载
};
