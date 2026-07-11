/**
 * 具体产品（Concrete Product）：卡车，走陆路运输。
 */
public class Truck implements Transport {
    @Override
    public void deliver(String cargo) {
        System.out.println("[卡车] 通过公路运输货物「" + cargo + "」，预计 2 天送达");
    }
}
