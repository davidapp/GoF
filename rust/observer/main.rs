// 观察者模式（Observer）—— 气象站演示
//
// WeatherStation（主题）状态变化时，自动通知所有注册的 Observer
// （显示屏）。多个显示屏需要被主题共享持有、同时又可能被主程序
// 单独访问，这里用 Rc<RefCell<dyn Observer>> 实现共享可变状态。

use std::cell::RefCell;
use std::rc::Rc;

// 观察者接口
trait Observer {
    fn update(&mut self, temperature: f64, humidity: f64);
}

// 具体观察者：实时状况显示屏
struct CurrentConditionsDisplay {
    temperature: f64,
    humidity: f64,
}

impl CurrentConditionsDisplay {
    fn new() -> Self {
        CurrentConditionsDisplay { temperature: 0.0, humidity: 0.0 }
    }
}

impl Observer for CurrentConditionsDisplay {
    fn update(&mut self, temperature: f64, humidity: f64) {
        self.temperature = temperature;
        self.humidity = humidity;
        // 读回字段而非直接用参数打印，确保“当前状态”确实来自对象自身状态
        println!(
            "[实时状况显示屏] 当前温度: {:.1}°C, 湿度: {:.1}%",
            self.temperature, self.humidity
        );
    }
}

// 具体观察者：统计显示屏，记录历史最高/最低/平均温度
struct StatisticsDisplay {
    max_temp: f64,
    min_temp: f64,
    readings: u32,
    sum_temp: f64,
}

impl StatisticsDisplay {
    fn new() -> Self {
        StatisticsDisplay {
            max_temp: f64::MIN,
            min_temp: f64::MAX,
            readings: 0,
            sum_temp: 0.0,
        }
    }
}

impl Observer for StatisticsDisplay {
    fn update(&mut self, temperature: f64, _humidity: f64) {
        self.max_temp = self.max_temp.max(temperature);
        self.min_temp = self.min_temp.min(temperature);
        self.readings += 1;
        self.sum_temp += temperature;
        println!(
            "[统计显示屏] 最高: {:.1}°C, 最低: {:.1}°C, 平均: {:.1}°C",
            self.max_temp,
            self.min_temp,
            self.sum_temp / self.readings as f64
        );
    }
}

// 主题：气象站
struct WeatherStation {
    observers: Vec<Rc<RefCell<dyn Observer>>>,
    temperature: f64,
    humidity: f64,
}

impl WeatherStation {
    fn new() -> Self {
        WeatherStation { observers: Vec::new(), temperature: 0.0, humidity: 0.0 }
    }

    fn register(&mut self, observer: Rc<RefCell<dyn Observer>>) {
        self.observers.push(observer);
    }

    fn set_measurements(&mut self, temperature: f64, humidity: f64) {
        self.temperature = temperature;
        self.humidity = humidity;
        self.notify_observers();
    }

    fn notify_observers(&self) {
        println!(
            "-- 气象站更新: 温度 {:.1}°C, 湿度 {:.1}% --",
            self.temperature, self.humidity
        );
        for observer in self.observers.iter() {
            observer.borrow_mut().update(self.temperature, self.humidity);
        }
    }
}

fn main() {
    println!("=== 观察者模式：气象站演示 ===\n");

    let mut station = WeatherStation::new();
    let current_display = Rc::new(RefCell::new(CurrentConditionsDisplay::new()));
    let stats_display = Rc::new(RefCell::new(StatisticsDisplay::new()));

    station.register(Rc::clone(&current_display) as Rc<RefCell<dyn Observer>>);
    station.register(Rc::clone(&stats_display) as Rc<RefCell<dyn Observer>>);

    station.set_measurements(25.0, 65.0);
    println!();
    station.set_measurements(28.0, 70.0);
    println!();
    station.set_measurements(22.0, 55.0);

    // 主程序也能独立读取某个具体显示屏的状态（因为是共享所有权而非独占）
    println!(
        "\n[主程序独立读取] 统计显示屏累计读数次数: {}",
        stats_display.borrow().readings
    );
}
