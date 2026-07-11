#import <Foundation/Foundation.h>
#import "Interpreter.h"

// 把单个 token 解析成表达式：纯数字 -> 数字字面量，否则 -> 变量
static id<Expression> ExpressionForToken(NSString *token) {
    NSCharacterSet *nonDigits = [[NSCharacterSet decimalDigitCharacterSet] invertedSet];
    if ([token rangeOfCharacterFromSet:nonDigits].location == NSNotFound) {
        return [[NumberExpression alloc] initWithValue:[token integerValue]];
    }
    return [[VariableExpression alloc] initWithName:token];
}

// 简易左折叠解析器：只处理 "数字/变量 (+|- 数字/变量)*" 这样的表达式，
// 加减法优先级相同、从左到右结合，因此不需要构建复杂的语法树。
static id<Expression> ParseExpression(NSArray<NSString *> *tokens) {
    id<Expression> result = ExpressionForToken(tokens[0]);
    for (NSInteger i = 1; i < (NSInteger)tokens.count; i += 2) {
        NSString *op = tokens[i];
        id<Expression> rhs = ExpressionForToken(tokens[i + 1]);
        if ([op isEqualToString:@"+"]) {
            result = [[AddExpression alloc] initWithLeft:result right:rhs];
        } else if ([op isEqualToString:@"-"]) {
            result = [[SubtractExpression alloc] initWithLeft:result right:rhs];
        }
    }
    return result;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSDictionary<NSString *, NSNumber *> *emptyContext = @{};

        NSLog(@"=== 解析并求值 \"5 + 3 - 2\" ===");
        id<Expression> expr1 = ParseExpression(@[@"5", @"+", @"3", @"-", @"2"]);
        NSLog(@"结果 = %ld", (long)[expr1 interpretWithContext:emptyContext]);

        NSLog(@" ");
        NSLog(@"=== 带变量的表达式 \"x + 3 - 2\"，上下文 x = 5 ===");
        id<Expression> expr2 = ParseExpression(@[@"x", @"+", @"3", @"-", @"2"]);
        NSDictionary<NSString *, NSNumber *> *context = @{@"x": @5};
        NSLog(@"结果 = %ld", (long)[expr2 interpretWithContext:context]);

        NSLog(@" ");
        NSLog(@"=== 同一棵表达式树，换一个上下文再求值（x = 10） ===");
        NSDictionary<NSString *, NSNumber *> *context2 = @{@"x": @10};
        NSLog(@"结果 = %ld", (long)[expr2 interpretWithContext:context2]);
    }
    return 0;
}
