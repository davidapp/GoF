/**
 * 抽象类：定义冲泡饮料的算法骨架（模板方法），具体步骤延迟到子类实现。
 */
public abstract class Beverage {
    /** 模板方法：固定冲泡流程，用 final 修饰禁止子类打乱步骤顺序 */
    public final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        if (customerWantsCondiments()) {
            addCondiments();
        }
        System.out.println("-- 一杯" + getName() + "冲泡完成 --\n");
    }

    private void boilWater() {
        System.out.println("烧开水");
    }

    private void pourInCup() {
        System.out.println("倒入杯中");
    }

    /** 子类必须实现：冲泡方式不同（泡茶 vs 煮咖啡） */
    protected abstract void brew();

    /** 子类必须实现：加入的调料不同（柠檬 vs 糖和牛奶） */
    protected abstract void addCondiments();

    protected abstract String getName();

    /**
     * 钩子方法（Hook）：提供默认实现，子类可以选择性覆盖，
     * 用来控制模板方法中某一步骤是否执行，而不必强制所有子类都重写。
     */
    protected boolean customerWantsCondiments() {
        return true;
    }
}
