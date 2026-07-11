package main

import "fmt"

// Observer 观察者接口：显示设备
type Observer interface {
	Update(temperature float64)
}

// Subject 主题接口：可被观察的对象
type Subject interface {
	Attach(observer Observer)
	Detach(observer Observer)
	Notify()
}

// WeatherStation 具体主题：气象站，温度变化时通知所有订阅的显示设备
type WeatherStation struct {
	observers   []Observer
	temperature float64
}

func NewWeatherStation() *WeatherStation {
	return &WeatherStation{}
}

func (w *WeatherStation) Attach(observer Observer) {
	w.observers = append(w.observers, observer)
}

func (w *WeatherStation) Detach(observer Observer) {
	for i, o := range w.observers {
		if o == observer {
			w.observers = append(w.observers[:i], w.observers[i+1:]...)
			break
		}
	}
}

func (w *WeatherStation) Notify() {
	for _, o := range w.observers {
		o.Update(w.temperature)
	}
}

// SetTemperature 更新温度并自动通知所有观察者
func (w *WeatherStation) SetTemperature(temp float64) {
	fmt.Printf("\n气象站: 温度更新为 %.1f°C\n", temp)
	w.temperature = temp
	w.Notify()
}

// PhoneDisplay 具体观察者：手机 App 显示屏
type PhoneDisplay struct {
	name string
}

func (p *PhoneDisplay) Update(temperature float64) {
	fmt.Printf("[%s] 手机推送: 当前温度 %.1f°C\n", p.name, temperature)
}

// BillboardDisplay 具体观察者：室外电子广告牌
type BillboardDisplay struct{}

func (b *BillboardDisplay) Update(temperature float64) {
	fmt.Printf("[电子广告牌] 显示温度: %.1f°C\n", temperature)
}

func main() {
	fmt.Println("=== 观察者模式：气象站 ===")

	station := NewWeatherStation()

	phone := &PhoneDisplay{name: "Alice 的手机"}
	billboard := &BillboardDisplay{}

	station.Attach(phone)
	station.Attach(billboard)

	station.SetTemperature(26.5)
	station.SetTemperature(31.2)

	fmt.Println("\n(手机取消订阅)")
	station.Detach(phone)
	station.SetTemperature(18.0)
}
