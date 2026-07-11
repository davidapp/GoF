/**
 * 具体创建者（Concrete Creator）：海路物流，工厂方法产出 Ship。
 */
public class SeaLogistics extends Logistics {
    @Override
    protected Transport createTransport() {
        return new Ship();
    }
}
