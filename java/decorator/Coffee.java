/**
 * 抽象组件（Component）：咖啡。
 * 具体咖啡（Espresso）与各种装饰器（Milk/Sugar）都实现这个接口，
 * 因此装饰器可以无限叠加，客户端始终只看到同一个 Coffee 接口。
 */
public interface Coffee {
    double getCost();

    String getDescription();
}
