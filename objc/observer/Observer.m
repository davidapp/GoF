#import "Observer.h"

@implementation WeatherStation {
    NSMutableArray<id<Observer>> *_observers;
    double _temperature;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _observers = [NSMutableArray array];
    }
    return self;
}

- (void)addObserver:(id<Observer>)observer {
    [_observers addObject:observer];
}

- (void)removeObserver:(id<Observer>)observer {
    [_observers removeObject:observer];
}

- (void)setTemperature:(double)temperature {
    _temperature = temperature;
    NSLog(@"[气象站] 温度更新为 %.1f°C，通知全部 %lu 个观察者", temperature, (unsigned long)_observers.count);
    for (id<Observer> observer in _observers) {
        [observer updateTemperature:temperature];
    }
}

@end

@implementation PhoneDisplay

- (void)updateTemperature:(double)temperature {
    NSLog(@"  [手机 App] 当前温度: %.1f°C", temperature);
}

@end

@implementation TVDisplay

- (void)updateTemperature:(double)temperature {
    NSLog(@"  [电视天气频道] 当前温度: %.1f°C", temperature);
}

@end
