/**
 * 模板方法模式示例入口。
 * 场景：冲泡饮料 —— Beverage 定义算法骨架，Tea/Coffee 实现各自的步骤。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 模板方法模式：冲泡饮料 ===\n");

        System.out.println("制作茶:");
        Beverage tea = new Tea();
        tea.prepareRecipe();

        System.out.println("制作咖啡（加调料）:");
        Beverage coffeeWithCondiments = new Coffee(true);
        coffeeWithCondiments.prepareRecipe();

        System.out.println("制作咖啡（顾客不要调料，走钩子方法分支）:");
        Beverage blackCoffee = new Coffee(false);
        blackCoffee.prepareRecipe();
    }
}
