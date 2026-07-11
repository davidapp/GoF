/**
 * 观察者接口（Observer）：气温发生变化时会被 Subject 回调通知。
 */
public interface Observer {
    void update(double temperature);
}
