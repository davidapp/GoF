#import "Adapter.h"

@implementation StripePayment

- (void)payInCents:(NSInteger)amountInCents {
    NSLog(@"[Stripe 第三方 SDK] 扣款 %ld 分", (long)amountInCents);
}

@end

@implementation StripeAdapter {
    StripePayment *_stripePayment;
}

- (instancetype)initWithStripePayment:(StripePayment *)stripePayment {
    self = [super init];
    if (self) {
        _stripePayment = stripePayment;
    }
    return self;
}

- (void)payYuan:(double)yuan {
    // 元 -> 分：加 0.5 后截断，避免浮点误差导致的少 1 分（仅适用于正数金额）
    NSInteger cents = (NSInteger)(yuan * 100 + 0.5);
    NSLog(@"[Adapter] 将 %.2f 元 转换为 %ld 分，转发给第三方 SDK", yuan, (long)cents);
    [_stripePayment payInCents:cents];
}

@end
