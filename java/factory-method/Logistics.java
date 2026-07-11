/**
 * 抽象创建者（Creator）：声明工厂方法 createTransport()，
 * 具体用哪种运输工具交给子类决定；同时提供一个依赖工厂方法的业务逻辑 planDelivery()，
 * 该业务逻辑本身与具体产品解耦。
 */
public abstract class Logistics {
    /** 工厂方法：由子类决定创建哪一种运输工具 */
    protected abstract Transport createTransport();

    /** 业务逻辑：计划一次运输，内部通过工厂方法获取运输工具，不关心具体类型 */
    public void planDelivery(String cargo) {
        System.out.println(getClass().getSimpleName() + " 开始规划运输...");
        Transport transport = createTransport();
        transport.deliver(cargo);
    }
}
