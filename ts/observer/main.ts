/**
 * 观察者模式（Observer）
 * 场景：气象站 WeatherStation 通知多个 Display 更新温度 / 湿度。
 *
 * 核心思想：定义对象间一对多的依赖关系，
 * 当一个对象（Subject）状态改变时，所有依赖它的对象（Observer）都会自动收到通知。
 */

// ---------- 观察者接口（Observer） ----------
interface WeatherObserver {
  update(temperature: number, humidity: number): void;
}

// ---------- 主题接口（Subject） ----------
interface WeatherSubject {
  subscribe(observer: WeatherObserver): void;
  unsubscribe(observer: WeatherObserver): void;
  notify(): void;
}

// ---------- 具体主题（Concrete Subject） ----------
class WeatherStation implements WeatherSubject {
  private readonly observers: WeatherObserver[] = [];
  private temperature = 0;
  private humidity = 0;

  subscribe(observer: WeatherObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: WeatherObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity);
    }
  }

  // 气象数据发生变化时，主动通知所有观察者
  setMeasurements(temperature: number, humidity: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    console.log(`\n[气象站] 采集到新数据: 温度=${temperature}°C, 湿度=${humidity}%`);
    this.notify();
  }
}

// ---------- 具体观察者（Concrete Observer） ----------
class CurrentConditionsDisplay implements WeatherObserver {
  update(temperature: number, humidity: number): void {
    console.log(`  [实时看板] 当前温度 ${temperature}°C，湿度 ${humidity}%`);
  }
}

class StatisticsDisplay implements WeatherObserver {
  private readonly history: number[] = [];

  update(temperature: number, _humidity: number): void {
    this.history.push(temperature);
    const avg = this.history.reduce((a, b) => a + b, 0) / this.history.length;
    console.log(`  [统计看板] 历史平均温度: ${avg.toFixed(1)}°C（共 ${this.history.length} 次采样）`);
  }
}

class AlertDisplay implements WeatherObserver {
  update(temperature: number, _humidity: number): void {
    if (temperature >= 35) {
      console.log(`  [高温预警] 温度高达 ${temperature}°C，请注意防暑！`);
    }
  }
}

// ---------- 演示 ----------
function main(): void {
  const station = new WeatherStation();

  const currentDisplay = new CurrentConditionsDisplay();
  const statisticsDisplay = new StatisticsDisplay();
  const alertDisplay = new AlertDisplay();

  station.subscribe(currentDisplay);
  station.subscribe(statisticsDisplay);
  station.subscribe(alertDisplay);

  station.setMeasurements(28, 65);
  station.setMeasurements(31, 70);

  console.log("\n=== 取消订阅统计看板 ===");
  station.unsubscribe(statisticsDisplay);

  station.setMeasurements(36, 40);
}

main();
