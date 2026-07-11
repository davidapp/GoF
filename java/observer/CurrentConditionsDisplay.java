/**
 * 具体观察者（Concrete Observer）：实时气温显示板，只展示最新一次的数据。
 */
public class CurrentConditionsDisplay implements Observer {
    @Override
    public void update(double temperature) {
        System.out.printf("[实时显示板] 当前气温: %.1f°C%n", temperature);
    }
}
