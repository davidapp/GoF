#pragma once
#include <memory>
#include <string>

// 抽象原型：声明克隆自身的接口
class Shape {
public:
    Shape(std::string color, int x, int y) : color_(std::move(color)), x_(x), y_(y) {}
    virtual ~Shape() = default;

    virtual std::unique_ptr<Shape> clone() const = 0;  // 原型接口
    virtual std::string describe() const = 0;

    void move_to(int x, int y) { x_ = x; y_ = y; }
    void set_color(const std::string& color) { color_ = color; }

protected:
    // 供具体原型的拷贝构造函数使用（在 clone() 内部调用）
    Shape(const Shape&) = default;

    std::string color_;
    int x_;
    int y_;
};

// 具体原型：圆形
class Circle : public Shape {
public:
    Circle(std::string color, int x, int y, int radius);

    std::unique_ptr<Shape> clone() const override;
    std::string describe() const override;

private:
    Circle(const Circle&) = default;
    int radius_;
};

// 具体原型：矩形
class Rectangle : public Shape {
public:
    Rectangle(std::string color, int x, int y, int width, int height);

    std::unique_ptr<Shape> clone() const override;
    std::string describe() const override;

private:
    Rectangle(const Rectangle&) = default;
    int width_;
    int height_;
};
