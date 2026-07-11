/**
 * 具体装饰器（Concrete Decorator）：加一份牛奶。
 */
public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee wrapped) {
        super(wrapped);
    }

    @Override
    public double getCost() {
        return super.getCost() + 3.0;
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + Milk";
    }
}
