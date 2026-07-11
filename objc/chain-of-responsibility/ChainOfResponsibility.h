#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象处理者（Handler） ====================

// 抽象处理者：持有链中下一环的引用；金额在权限内就自己处理，否则转交下去。
@interface Approver : NSObject

@property (nonatomic, copy, readonly) NSString *title;
@property (nonatomic, strong, nullable) Approver *next;

- (instancetype)initWithTitle:(NSString *)title;

// 该审批人能独立审批的最高金额；基类给出断言失败的默认实现，子类必须重写
- (double)approvalLimit;

// 设置链中的下一环，返回 next 以支持链式拼接：[[a setNext:b] setNext:c]
- (Approver *)setNext:(Approver *)next;

// 处理审批请求：金额在权限内自己处理，否则转交下一环
- (void)processRequest:(NSString *)item amount:(double)amount;

@end

// ==================== 具体处理者（Concrete Handler） ====================

@interface Manager : Approver  // 经理：限额 5000 元
- (instancetype)init;
@end

@interface Director : Approver // 总监：限额 20000 元
- (instancetype)init;
@end

@interface CEO : Approver      // CEO：限额 100000 元
- (instancetype)init;
@end

NS_ASSUME_NONNULL_END
