#pragma once

class Circle;     // 前置声明
class Rectangle;

// 抽象访问者：为每一种具体元素声明一个 visit 重载
class ShapeVisitor {
public:
    virtual ~ShapeVisitor() = default;
    virtual void visit(const Circle& circle) = 0;
    virtual void visit(const Rectangle& rectangle) = 0;
};

// 抽象元素：图形
class Shape {
public:
    virtual ~Shape() = default;
    virtual void accept(ShapeVisitor& visitor) const = 0;  // 双重分派的入口
};

// 具体元素：圆形
class Circle : public Shape {
public:
    explicit Circle(double radius) : radius_(radius) {}
    double radius() const { return radius_; }
    void accept(ShapeVisitor& visitor) const override;

private:
    double radius_;
};

// 具体元素：矩形
class Rectangle : public Shape {
public:
    Rectangle(double width, double height) : width_(width), height_(height) {}
    double width() const { return width_; }
    double height() const { return height_; }
    void accept(ShapeVisitor& visitor) const override;

private:
    double width_;
    double height_;
};

// 具体访问者：计算面积（新增操作，无需修改 Circle/Rectangle）
class AreaVisitor : public ShapeVisitor {
public:
    void visit(const Circle& circle) override;
    void visit(const Rectangle& rectangle) override;
    double total_area() const { return total_area_; }

private:
    double total_area_ = 0.0;
};

// 具体访问者：渲染图形（用文字模拟绘制，同样无需修改 Circle/Rectangle）
class DrawVisitor : public ShapeVisitor {
public:
    void visit(const Circle& circle) override;
    void visit(const Rectangle& rectangle) override;
};
