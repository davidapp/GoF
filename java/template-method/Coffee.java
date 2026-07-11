/**
 * 具体子类：咖啡。同时覆盖了钩子方法 customerWantsCondiments()，
 * 由顾客的选择决定这一步骤是否执行。
 */
public class Coffee extends Beverage {
    private final boolean wantsCondiments;

    public Coffee(boolean wantsCondiments) {
        this.wantsCondiments = wantsCondiments;
    }

    @Override
    protected void brew() {
        System.out.println("用沸水冲泡咖啡粉");
    }

    @Override
    protected void addCondiments() {
        System.out.println("加入糖和牛奶");
    }

    @Override
    protected String getName() {
        return "咖啡";
    }

    @Override
    protected boolean customerWantsCondiments() {
        return wantsCondiments; // 覆盖钩子方法：由顾客决定是否需要调料
    }
}
