/**
 * 抽象产品（Abstract Product）：复选框。
 * 与 Button 属于同一个产品族，必须与 Button 风格保持一致（同为 Windows 或同为 macOS）。
 */
public interface Checkbox {
    /** 渲染复选框 */
    void render();

    /** 切换选中状态 */
    void toggle();
}
