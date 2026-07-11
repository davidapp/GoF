/**
 * 具体产品（Concrete Product）：轮船，走海路运输。
 */
public class Ship implements Transport {
    @Override
    public void deliver(String cargo) {
        System.out.println("[轮船] 通过海运运输货物「" + cargo + "」，预计 15 天送达");
    }
}
