#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 备忘录（Memento） ====================

// 备忘录：不可变快照，只保存内容本身，不暴露修改接口
@interface EditorMemento : NSObject

@property (nonatomic, copy, readonly) NSString *content;

- (instancetype)initWithContent:(NSString *)content;

@end

// ==================== 发起人（Originator） ====================

// 发起人：文本编辑器，可以把当前内容保存为备忘录，也可以用备忘录恢复内容
@interface TextEditor : NSObject

@property (nonatomic, copy) NSString *content;

- (EditorMemento *)save;
- (void)restore:(EditorMemento *)memento;

@end

// ==================== 管理者（Caretaker） ====================

// 管理者：只负责保存/取出备忘录（像栈一样），不查看也不修改备忘录内部状态
@interface History : NSObject

- (void)push:(EditorMemento *)memento;
- (nullable EditorMemento *)pop;
- (NSUInteger)count;

@end

NS_ASSUME_NONNULL_END
