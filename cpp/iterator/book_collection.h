#pragma once
#include <string>
#include <vector>

// 领域对象：书籍
struct Book {
    std::string title;
    std::string author;
};

// 聚合类：书籍集合，隐藏内部存储结构，对外提供统一的迭代能力
class BookCollection {
public:
    void add(Book book);
    size_t size() const { return books_.size(); }

    // 自定义迭代器：满足最基本的前向迭代器接口，可用于 range-for 与手动遍历
    class Iterator {
    public:
        explicit Iterator(std::vector<Book>::const_iterator it) : it_(it) {}

        const Book& operator*() const { return *it_; }
        Iterator& operator++() {
            ++it_;
            return *this;
        }
        bool operator!=(const Iterator& other) const { return it_ != other.it_; }

    private:
        std::vector<Book>::const_iterator it_;
    };

    Iterator begin() const { return Iterator(books_.begin()); }
    Iterator end() const { return Iterator(books_.end()); }

private:
    std::vector<Book> books_;
};
