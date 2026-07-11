/**
 * 装饰器模式示例入口。
 * 场景：在 Espresso 上动态叠加 Milk/Sugar 装饰，逐层计算价格与描述。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 装饰器模式：咖啡加料 ===\n");

        Coffee espresso = new Espresso();
        printOrder(espresso);

        Coffee milkCoffee = new MilkDecorator(espresso);
        printOrder(milkCoffee);

        Coffee milkSugarCoffee = new SugarDecorator(milkCoffee);
        printOrder(milkSugarCoffee);

        System.out.println("\n-- 换个叠加顺序，先加糖再加奶 --");
        Coffee sugarThenMilk = new MilkDecorator(new SugarDecorator(new Espresso()));
        printOrder(sugarThenMilk);
    }

    private static void printOrder(Coffee coffee) {
        System.out.printf("%-30s 价格: %.1f 元%n", coffee.getDescription(), coffee.getCost());
    }
}
