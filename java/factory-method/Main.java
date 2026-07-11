/**
 * 工厂方法模式示例入口。
 * 场景：物流公司下单后，由具体的 Logistics 子类决定使用卡车还是轮船运输，
 * 客户端只与抽象类 Logistics 打交道。
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== 工厂方法模式：物流运输 ===\n");

        Logistics roadLogistics = new RoadLogistics();
        roadLogistics.planDelivery("一批电子元件");

        System.out.println();

        Logistics seaLogistics = new SeaLogistics();
        seaLogistics.planDelivery("一整柜家具");
    }
}
