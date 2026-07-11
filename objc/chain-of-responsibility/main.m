#import <Foundation/Foundation.h>
#import "ChainOfResponsibility.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // 组装责任链：经理 -> 总监 -> CEO
        Manager *manager = [[Manager alloc] init];
        Director *director = [[Director alloc] init];
        CEO *ceo = [[CEO alloc] init];
        [[manager setNext:director] setNext:ceo];

        NSArray<NSDictionary<NSString *, id> *> *requests = @[
            @{@"item": @"办公文具", @"amount": @800},
            @{@"item": @"部门团建", @"amount": @8000},
            @{@"item": @"服务器采购", @"amount": @45000},
            @{@"item": @"公司年会", @"amount": @150000},
        ];

        for (NSDictionary<NSString *, id> *request in requests) {
            NSString *item = request[@"item"];
            double amount = [request[@"amount"] doubleValue];
            NSLog(@"提交申请: 「%@」金额 %.0f 元", item, amount);
            // 调用者永远只找链的第一环（manager），不关心最终是谁处理的
            [manager processRequest:item amount:amount];
            NSLog(@" ");
        }
    }
    return 0;
}
