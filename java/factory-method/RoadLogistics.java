/**
 * 具体创建者（Concrete Creator）：陆路物流，工厂方法产出 Truck。
 */
public class RoadLogistics extends Logistics {
    @Override
    protected Transport createTransport() {
        return new Truck();
    }
}
