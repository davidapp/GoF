/**
 * 抽象目标接口（Subject）：维护观察者列表，提供注册 / 移除 / 通知的能力。
 */
public interface Subject {
    void registerObserver(Observer observer);

    void removeObserver(Observer observer);

    void notifyObservers();
}
