#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象表达式（Abstract Expression） ====================

// 上下文用 NSDictionary<变量名, 数值> 表示，interpret 在求值时才查表
@protocol Expression <NSObject>
- (NSInteger)interpretWithContext:(NSDictionary<NSString *, NSNumber *> *)context;
@end

// ==================== 终结符表达式（Terminal Expression） ====================

// 数字字面量
@interface NumberExpression : NSObject <Expression>
- (instancetype)initWithValue:(NSInteger)value;
@end

// 变量：求值时从上下文里查找当前绑定的值
@interface VariableExpression : NSObject <Expression>
- (instancetype)initWithName:(NSString *)name;
@end

// ==================== 非终结符表达式（Non-terminal Expression） ====================

// 加法：递归对左右子表达式求值后相加
@interface AddExpression : NSObject <Expression>
- (instancetype)initWithLeft:(id<Expression>)left right:(id<Expression>)right;
@end

// 减法：递归对左右子表达式求值后相减
@interface SubtractExpression : NSObject <Expression>
- (instancetype)initWithLeft:(id<Expression>)left right:(id<Expression>)right;
@end

NS_ASSUME_NONNULL_END
