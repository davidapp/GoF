package main

import "fmt"

// Book 聚合元素：书籍
type Book struct {
	Title  string
	Author string
}

// Iterator 迭代器接口：顺序访问聚合对象中的元素，而不暴露其内部表示
type Iterator interface {
	HasNext() bool
	Next() *Book
}

// BookCollection 具体聚合：书籍集合
type BookCollection struct {
	books []*Book
}

func NewBookCollection() *BookCollection {
	return &BookCollection{}
}

func (c *BookCollection) AddBook(book *Book) {
	c.books = append(c.books, book)
}

// CreateIterator 返回一个新的迭代器，用于顺序遍历集合，
// 调用方无需了解 BookCollection 内部用切片存储。
func (c *BookCollection) CreateIterator() Iterator {
	return &bookIterator{collection: c, index: 0}
}

// bookIterator 具体迭代器：维护遍历的当前位置
type bookIterator struct {
	collection *BookCollection
	index      int
}

func (it *bookIterator) HasNext() bool {
	return it.index < len(it.collection.books)
}

func (it *bookIterator) Next() *Book {
	book := it.collection.books[it.index]
	it.index++
	return book
}

func main() {
	fmt.Println("=== 迭代器模式：书籍集合 ===")

	collection := NewBookCollection()
	collection.AddBook(&Book{Title: "三体", Author: "刘慈欣"})
	collection.AddBook(&Book{Title: "活着", Author: "余华"})
	collection.AddBook(&Book{Title: "百年孤独", Author: "加西亚·马尔克斯"})

	iterator := collection.CreateIterator()
	for iterator.HasNext() {
		book := iterator.Next()
		fmt.Printf("《%s》 —— %s\n", book.Title, book.Author)
	}
}
