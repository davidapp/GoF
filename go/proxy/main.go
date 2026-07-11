package main

import "fmt"

// 主题接口：图片
type Image interface {
	Display() string
}

// 真实主题：真实图片，创建代价较高（模拟从磁盘加载的耗时操作）
type RealImage struct {
	filename string
}

// NewRealImage 在构造时就完成"加载"，模拟创建开销较大的过程
func NewRealImage(filename string) *RealImage {
	img := &RealImage{filename: filename}
	img.loadFromDisk()
	return img
}

func (r *RealImage) loadFromDisk() {
	fmt.Println("  (从磁盘加载图片:", r.filename, ")")
}

func (r *RealImage) Display() string {
	return "显示图片: " + r.filename
}

// 代理：持有真实图片的引用，延迟到首次 Display() 才真正创建 RealImage
type ImageProxy struct {
	filename  string
	realImage *RealImage
}

func NewImageProxy(filename string) *ImageProxy {
	return &ImageProxy{filename: filename}
}

// Display 实现 Image 接口：懒加载，仅在首次访问时创建真实对象
func (p *ImageProxy) Display() string {
	if p.realImage == nil {
		p.realImage = NewRealImage(p.filename)
	}
	return p.realImage.Display()
}

func main() {
	fmt.Println("=== 代理模式：图片懒加载 ===")

	images := []Image{
		NewImageProxy("photo1.jpg"),
		NewImageProxy("photo2.jpg"),
	}

	fmt.Println("图片代理已创建，但尚未加载实际图片数据")

	fmt.Println("\n首次显示 photo1:")
	fmt.Println(images[0].Display())

	fmt.Println("\n再次显示 photo1（代理复用已加载的图片，无需重新加载）:")
	fmt.Println(images[0].Display())

	fmt.Println("\n首次显示 photo2:")
	fmt.Println(images[1].Display())
}
