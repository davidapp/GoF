#import "FactoryMethod.h"

@implementation Truck
- (NSString *)deliver {
    return @"卡车走陆路运输货物";
}
@end

@implementation Ship
- (NSString *)deliver {
    return @"轮船走海路运输货物";
}
@end

@implementation Logistics

- (id<Transport>)createTransport {
    // 抽象工厂方法：基类不实现具体产出，交由子类重写
    NSAssert(NO, @"Logistics 子类必须重写 createTransport");
    return nil;
}

- (NSString *)planDelivery {
    // 模板逻辑：不关心 transport 具体是卡车还是轮船，只依赖 Transport 协议
    id<Transport> transport = [self createTransport];
    return [NSString stringWithFormat:@"调度完成 -> %@", [transport deliver]];
}

@end

@implementation RoadLogistics
- (id<Transport>)createTransport {
    return [[Truck alloc] init];
}
@end

@implementation SeaLogistics
- (id<Transport>)createTransport {
    return [[Ship alloc] init];
}
@end
