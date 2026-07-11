/**
 * 具体组件（Concrete Component）：意式浓缩咖啡，装饰链最底层的“本体”。
 */
public class Espresso implements Coffee {
    @Override
    public double getCost() {
        return 15.0;
    }

    @Override
    public String getDescription() {
        return "Espresso";
    }
}
