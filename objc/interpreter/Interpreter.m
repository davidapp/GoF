#import "Interpreter.h"

@implementation NumberExpression {
    NSInteger _value;
}

- (instancetype)initWithValue:(NSInteger)value {
    self = [super init];
    if (self) {
        _value = value;
    }
    return self;
}

- (NSInteger)interpretWithContext:(NSDictionary<NSString *, NSNumber *> *)context {
    return _value;
}

@end

@implementation VariableExpression {
    NSString *_name;
}

- (instancetype)initWithName:(NSString *)name {
    self = [super init];
    if (self) {
        _name = [name copy];
    }
    return self;
}

- (NSInteger)interpretWithContext:(NSDictionary<NSString *, NSNumber *> *)context {
    NSNumber *value = context[_name];
    NSAssert(value != nil, @"未定义的变量: %@", _name);
    return value.integerValue;
}

@end

@implementation AddExpression {
    id<Expression> _left;
    id<Expression> _right;
}

- (instancetype)initWithLeft:(id<Expression>)left right:(id<Expression>)right {
    self = [super init];
    if (self) {
        _left = left;
        _right = right;
    }
    return self;
}

- (NSInteger)interpretWithContext:(NSDictionary<NSString *, NSNumber *> *)context {
    return [_left interpretWithContext:context] + [_right interpretWithContext:context];
}

@end

@implementation SubtractExpression {
    id<Expression> _left;
    id<Expression> _right;
}

- (instancetype)initWithLeft:(id<Expression>)left right:(id<Expression>)right {
    self = [super init];
    if (self) {
        _left = left;
        _right = right;
    }
    return self;
}

- (NSInteger)interpretWithContext:(NSDictionary<NSString *, NSNumber *> *)context {
    return [_left interpretWithContext:context] - [_right interpretWithContext:context];
}

@end
