#import <Foundation/Foundation.h>
#import "Strategy.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        ShoppingCart *cart = [[ShoppingCart alloc] init];
        [cart addItemPrice:129.0];
        [cart addItemPrice:59.5];

        NSLog(@" ");
        NSLog(@"=== 使用信用卡支付 ===");
        cart.paymentStrategy = [[CreditCardStrategy alloc] initWithCardNumber:@"6222021234567890"];
        [cart checkout];

        NSLog(@" ");
        NSLog(@"=== 切换为 PayPal 支付（同一个购物车，运行时更换策略） ===");
        cart.paymentStrategy = [[PayPalStrategy alloc] initWithEmail:@"buyer@example.com"];
        [cart checkout];

        NSLog(@" ");
        NSLog(@"=== 切换为加密货币支付 ===");
        cart.paymentStrategy = [[CryptoStrategy alloc] initWithWalletAddress:@"0xAbCd...1234"];
        [cart checkout];
    }
    return 0;
}
