/**
 * 具体装饰器（Concrete Decorator）：加一份糖。
 */
public class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee wrapped) {
        super(wrapped);
    }

    @Override
    public double getCost() {
        return super.getCost() + 1.0;
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + Sugar";
    }
}
