#import "ChainOfResponsibility.h"

@implementation Approver

- (instancetype)initWithTitle:(NSString *)title {
    self = [super init];
    if (self) {
        _title = [title copy];
    }
    return self;
}

- (double)approvalLimit {
    NSAssert(NO, @"Approver 子类必须重写 approvalLimit");
    return 0;
}

- (Approver *)setNext:(Approver *)next {
    self.next = next;
    return next;
}

- (void)processRequest:(NSString *)item amount:(double)amount {
    if (amount <= [self approvalLimit]) {
        NSLog(@"  【%@】批准了采购申请「%@」，金额 %.0f 元", self.title, item, amount);
    } else if (self.next != nil) {
        NSLog(@"  %@ 权限不足（限额 %.0f 元），转交下一级...", self.title, [self approvalLimit]);
        [self.next processRequest:item amount:amount];
    } else {
        NSLog(@"  申请被拒绝：金额 %.0f 元超出所有审批人的权限上限", amount);
    }
}

@end

@implementation Manager

- (instancetype)init {
    return [super initWithTitle:@"经理"];
}

- (double)approvalLimit {
    return 5000;
}

@end

@implementation Director

- (instancetype)init {
    return [super initWithTitle:@"总监"];
}

- (double)approvalLimit {
    return 20000;
}

@end

@implementation CEO

- (instancetype)init {
    return [super initWithTitle:@"CEO"];
}

- (double)approvalLimit {
    return 100000;
}

@end
