// ============================================================
// 观察者模式（Observer）
// 场景：气象站 WeatherStation 通知多个 Display 更新温度
// ============================================================

// ---- 抽象观察者（Observer）----
class WeatherObserver {
  update(weatherData) {
    throw new Error('子类必须实现 update()');
  }
}

// ---- 抽象主题（Subject）：维护观察者列表，提供订阅/退订/通知能力 ----
class Subject {
  #observers = [];

  subscribe(observer) {
    this.#observers.push(observer);
  }

  unsubscribe(observer) {
    this.#observers = this.#observers.filter((o) => o !== observer);
  }

  notify(data) {
    for (const observer of this.#observers) {
      observer.update(data);
    }
  }
}

// ---- 具体主题：气象站，温度变化时自动通知所有订阅的显示面板 ----
class WeatherStation extends Subject {
  #temperature = 0;
  #humidity = 0;

  setMeasurements(temperature, humidity) {
    console.log(`[气象站] 采集到新数据: 温度=${temperature}°C, 湿度=${humidity}%`);
    this.#temperature = temperature;
    this.#humidity = humidity;
    this.notify({ temperature: this.#temperature, humidity: this.#humidity });
  }
}

// ---- 具体观察者：实时状况显示板 ----
class CurrentConditionsDisplay extends WeatherObserver {
  update({ temperature, humidity }) {
    console.log(`  [实时状况显示板] 当前温度 ${temperature}°C, 湿度 ${humidity}%`);
  }
}

// ---- 具体观察者：统计显示板，维护历史最高/最低/平均温度 ----
class StatisticsDisplay extends WeatherObserver {
  #readings = [];

  update({ temperature }) {
    this.#readings.push(temperature);
    const max = Math.max(...this.#readings);
    const min = Math.min(...this.#readings);
    const avg = (this.#readings.reduce((a, b) => a + b, 0) / this.#readings.length).toFixed(1);
    console.log(`  [统计显示板] 最高=${max}°C, 最低=${min}°C, 平均=${avg}°C`);
  }
}

// ---- 具体观察者：预警显示板，仅在满足条件时才输出（体现观察者可自行决定响应逻辑）----
class AlertDisplay extends WeatherObserver {
  update({ temperature }) {
    if (temperature >= 35) {
      console.log(`  [高温预警] 当前温度 ${temperature}°C，请注意防暑！`);
    }
  }
}

console.log('=== 观察者模式：气象站通知多个显示面板 ===\n');

const station = new WeatherStation();
const currentDisplay = new CurrentConditionsDisplay();
const statisticsDisplay = new StatisticsDisplay();
const alertDisplay = new AlertDisplay();

station.subscribe(currentDisplay);
station.subscribe(statisticsDisplay);
station.subscribe(alertDisplay);

station.setMeasurements(26, 65);
console.log();
station.setMeasurements(31, 55);
console.log();
station.setMeasurements(36, 40);

console.log('\n-- 取消订阅统计显示板后再更新一次 --');
station.unsubscribe(statisticsDisplay);
station.setMeasurements(22, 70);
