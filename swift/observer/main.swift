import Foundation

// 观察者模式：气象站
// 场景：WeatherStation 通知多个 Display 更新温度

// MARK: - 观察者协议：气象数据变化时被通知（class 约束以支持 weak 引用）
protocol WeatherObserver: AnyObject {
    var name: String { get }
    func update(temperature: Double, humidity: Double)
}

// MARK: - 主题协议：管理观察者的注册与通知
protocol WeatherSubject: AnyObject {
    func attach(_ observer: WeatherObserver)
    func detach(_ observer: WeatherObserver)
    func notifyObservers()
}

// MARK: - 具体主题：气象站
final class WeatherStation: WeatherSubject {
    // 用 weak 包装每个观察者，避免主题强引用观察者导致其无法释放（防止循环引用）
    private final class WeakObserverBox {
        weak var observer: WeatherObserver?
        init(_ observer: WeatherObserver) { self.observer = observer }
    }

    private var observerBoxes: [WeakObserverBox] = []
    private(set) var temperature: Double = 0
    private(set) var humidity: Double = 0

    func attach(_ observer: WeatherObserver) {
        observerBoxes.append(WeakObserverBox(observer))
        print("[气象站] \(observer.name) 已订阅")
    }

    func detach(_ observer: WeatherObserver) {
        observerBoxes.removeAll { $0.observer === observer }
        print("[气象站] \(observer.name) 已取消订阅")
    }

    func notifyObservers() {
        observerBoxes.removeAll { $0.observer == nil }   // 顺带清理已被释放的弱引用
        for box in observerBoxes {
            box.observer?.update(temperature: temperature, humidity: humidity)
        }
    }

    // 气象数据更新，触发通知（Subject 状态变化 -> 自动通知所有 Observer）
    func setMeasurements(temperature: Double, humidity: Double) {
        self.temperature = temperature
        self.humidity = humidity
        print("\n[气象站] 数据更新：温度=\(temperature)℃ 湿度=\(humidity)%")
        notifyObservers()
    }
}

// MARK: - 具体观察者：手机 App 显示板
final class PhoneDisplay: WeatherObserver {
    let name = "手机App"

    func update(temperature: Double, humidity: Double) {
        print("  [\(name)] 当前温度 \(temperature)℃，湿度 \(humidity)%")
    }
}

// MARK: - 具体观察者：电视显示板
final class TVDisplay: WeatherObserver {
    let name = "电视显示板"

    func update(temperature: Double, humidity: Double) {
        print("  [\(name)] 温度: \(temperature)℃ | 湿度: \(humidity)%")
    }
}

// MARK: - 顶层入口
print("=== 观察者模式：气象站 ===\n")

let station = WeatherStation()
let phone = PhoneDisplay()
let tv = TVDisplay()

station.attach(phone)
station.attach(tv)

station.setMeasurements(temperature: 26.5, humidity: 60)
station.setMeasurements(temperature: 28.0, humidity: 55)

station.detach(tv)
station.setMeasurements(temperature: 30.2, humidity: 50)
