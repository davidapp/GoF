#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 策略（Strategy） ====================

@protocol PaymentStrategy <NSObject>
- (void)pay:(double)amount;
@end

// ==================== 具体策略（Concrete Strategy） ====================

@interface CreditCardStrategy : NSObject <PaymentStrategy>
- (instancetype)initWithCardNumber:(NSString *)cardNumber;
@end

@interface PayPalStrategy : NSObject <PaymentStrategy>
- (instancetype)initWithEmail:(NSString *)email;
@end

@interface CryptoStrategy : NSObject <PaymentStrategy>
- (instancetype)initWithWalletAddress:(NSString *)walletAddress;
@end

// ==================== 上下文（Context） ====================

// 上下文：购物车，持有一个可随时替换的支付策略，自身不关心具体支付方式的实现细节
@interface ShoppingCart : NSObject

@property (nonatomic, strong, nullable) id<PaymentStrategy> paymentStrategy;

- (void)addItemPrice:(double)price;
- (void)checkout;

@end

NS_ASSUME_NONNULL_END
