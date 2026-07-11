import java.util.ArrayList;
import java.util.List;

/**
 * 具体目标（Concrete Subject）：气象站。
 * 气温发生变化时调用 notifyObservers()，自动通知所有已注册的 Display 更新显示，
 * 气象站本身不需要知道具体有哪些种类的显示板，也不关心它们各自怎么展示数据。
 */
public class WeatherStation implements Subject {
    private final List<Observer> observers = new ArrayList<>();
    private double temperature;

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature);
        }
    }

    /** 气温发生变化：更新数据并主动通知所有观察者 */
    public void setTemperature(double temperature) {
        System.out.printf("%n[WeatherStation] 气温更新为 %.1f°C%n", temperature);
        this.temperature = temperature;
        notifyObservers();
    }
}
