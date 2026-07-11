#import <Foundation/Foundation.h>
#import "Observer.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        WeatherStation *station = [[WeatherStation alloc] init];

        PhoneDisplay *phone = [[PhoneDisplay alloc] init];
        TVDisplay *tv = [[TVDisplay alloc] init];

        [station addObserver:phone];
        [station addObserver:tv];

        [station setTemperature:23.5];

        NSLog(@" ");
        NSLog(@"=== 电视显示器退订 ===");
        [station removeObserver:tv];
        [station setTemperature:19.0];
    }
    return 0;
}
