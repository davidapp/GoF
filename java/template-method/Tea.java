/**
 * 具体子类：茶。实现模板方法中留给子类的各个步骤。
 */
public class Tea extends Beverage {
    @Override
    protected void brew() {
        System.out.println("用沸水浸泡茶叶");
    }

    @Override
    protected void addCondiments() {
        System.out.println("加入柠檬");
    }

    @Override
    protected String getName() {
        return "茶";
    }
}
