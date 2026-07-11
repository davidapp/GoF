#import "Strategy.h"

@implementation CreditCardStrategy {
    NSString *_cardNumber;
}

- (instancetype)initWithCardNumber:(NSString *)cardNumber {
    self = [super init];
    if (self) {
        _cardNumber = [cardNumber copy];
    }
    return self;
}

- (void)pay:(double)amount {
    NSString *masked = _cardNumber.length >= 4 ? [_cardNumber substringFromIndex:_cardNumber.length - 4] : _cardNumber;
    NSLog(@"使用信用卡（尾号 %@）支付 %.2f 元", masked, amount);
}

@end

@implementation PayPalStrategy {
    NSString *_email;
}

- (instancetype)initWithEmail:(NSString *)email {
    self = [super init];
    if (self) {
        _email = [email copy];
    }
    return self;
}

- (void)pay:(double)amount {
    NSLog(@"使用 PayPal 账户（%@）支付 %.2f 元", _email, amount);
}

@end

@implementation CryptoStrategy {
    NSString *_walletAddress;
}

- (instancetype)initWithWalletAddress:(NSString *)walletAddress {
    self = [super init];
    if (self) {
        _walletAddress = [walletAddress copy];
    }
    return self;
}

- (void)pay:(double)amount {
    NSLog(@"使用加密钱包（%@）支付 %.2f 元", _walletAddress, amount);
}

@end

@implementation ShoppingCart {
    double _total;
}

- (void)addItemPrice:(double)price {
    _total += price;
    NSLog(@"加入商品，单价 %.2f 元，当前合计 %.2f 元", price, _total);
}

- (void)checkout {
    if (self.paymentStrategy == nil) {
        NSLog(@"尚未选择支付方式，无法结账");
        return;
    }
    // 购物车不知道也不关心具体是哪种支付方式，只依赖 PaymentStrategy 协议
    [self.paymentStrategy pay:_total];
}

@end
