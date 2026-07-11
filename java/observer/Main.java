/**
 * 观察者模式示例入口。
 * 场景：气象站 WeatherStation 通知多个 Display 更新温度。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 观察者模式：气象站 ===");

        WeatherStation station = new WeatherStation();
        Observer currentDisplay = new CurrentConditionsDisplay();
        Observer statisticsDisplay = new StatisticsDisplay();

        station.registerObserver(currentDisplay);
        station.registerObserver(statisticsDisplay);

        station.setTemperature(25.0);
        station.setTemperature(28.5);

        System.out.println("\n-- 取消订阅实时显示板 --");
        station.removeObserver(currentDisplay);
        station.setTemperature(19.0);
    }
}
