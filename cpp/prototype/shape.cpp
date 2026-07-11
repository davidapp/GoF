#include "shape.h"
#include <sstream>

Circle::Circle(std::string color, int x, int y, int radius)
    : Shape(std::move(color), x, y), radius_(radius) {}

std::unique_ptr<Shape> Circle::clone() const {
    // 调用私有拷贝构造函数，一次性复制颜色、坐标、半径等全部状态
    return std::unique_ptr<Shape>(new Circle(*this));
}

std::string Circle::describe() const {
    std::ostringstream oss;
    oss << "圆形 [颜色=" << color_ << ", 位置=(" << x_ << "," << y_
        << "), 半径=" << radius_ << "]";
    return oss.str();
}

Rectangle::Rectangle(std::string color, int x, int y, int width, int height)
    : Shape(std::move(color), x, y), width_(width), height_(height) {}

std::unique_ptr<Shape> Rectangle::clone() const {
    return std::unique_ptr<Shape>(new Rectangle(*this));
}

std::string Rectangle::describe() const {
    std::ostringstream oss;
    oss << "矩形 [颜色=" << color_ << ", 位置=(" << x_ << "," << y_
        << "), 宽=" << width_ << ", 高=" << height_ << "]";
    return oss.str();
}
