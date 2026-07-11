/**
 * 备忘录标记接口（Memento）：故意不暴露任何方法。
 * 管理者（History）只能持有这个引用来保存/传递快照，无法查看或修改其中的状态，
 * 只有发起人（TextEditor）自己知道如何解读真正的数据，从而保护了封装性。
 */
public interface Memento {
}
