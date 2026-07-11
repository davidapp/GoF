/**
 * 抽象装饰器（Decorator）：本身也实现 Coffee 接口，同时持有一个 Coffee 引用。
 * 默认把调用转发给被包装对象，具体装饰器只需重写需要增强的部分，
 * 从而可以一层一层地叠加装饰，且叠加顺序不同、最终效果也不同。
 */
public abstract class CoffeeDecorator implements Coffee {
    protected final Coffee wrapped;

    protected CoffeeDecorator(Coffee wrapped) {
        this.wrapped = wrapped;
    }

    @Override
    public double getCost() {
        return wrapped.getCost();
    }

    @Override
    public String getDescription() {
        return wrapped.getDescription();
    }
}
