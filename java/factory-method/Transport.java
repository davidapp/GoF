/**
 * 抽象产品（Product）：运输工具。
 */
public interface Transport {
    /** 执行一次运输，返回运输方式描述 */
    void deliver(String cargo);
}
