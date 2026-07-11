#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 第三方类（Adaptee） ====================

// 第三方支付 SDK：接口以"分"为单位，方法命名也与我们系统的习惯不同。
// 假设这是无法修改的第三方库代码。
@interface StripePayment : NSObject
- (void)payInCents:(NSInteger)amountInCents;
@end

// ==================== 目标接口（Target） ====================

// 应用统一的支付接口：以"元"为单位，是客户端唯一依赖的协议
@protocol PaymentProcessor <NSObject>
- (void)payYuan:(double)yuan;
@end

// ==================== 适配器（Adapter） ====================

// 适配器：包装 StripePayment，把"元"换算成"分"，
// 使第三方 SDK 在不修改自身代码的前提下满足应用的统一接口
@interface StripeAdapter : NSObject <PaymentProcessor>

- (instancetype)initWithStripePayment:(StripePayment *)stripePayment;

@end

NS_ASSUME_NONNULL_END
