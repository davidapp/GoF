#import <Foundation/Foundation.h>
#import "Adapter.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        StripePayment *stripe = [[StripePayment alloc] init];
        id<PaymentProcessor> processor = [[StripeAdapter alloc] initWithStripePayment:stripe];

        NSLog(@"=== 客户端只认识 PaymentProcessor.payYuan:，完全不知道 Stripe 的存在 ===");
        [processor payYuan:99.99];
        [processor payYuan:200];
    }
    return 0;
}
