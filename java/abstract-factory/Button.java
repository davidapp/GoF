/**
 * 抽象产品（Abstract Product）：按钮。
 * 不同操作系统平台各自实现自己风格的按钮。
 */
public interface Button {
    /** 渲染按钮 */
    void render();

    /** 响应点击 */
    void onClick();
}
