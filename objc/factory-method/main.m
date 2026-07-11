#import <Foundation/Foundation.h>
#import "FactoryMethod.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray<Logistics *> *routes = @[[[RoadLogistics alloc] init],
                                          [[SeaLogistics alloc] init]];

        for (Logistics *logistics in routes) {
            NSLog(@"%@: %@", NSStringFromClass([logistics class]), [logistics planDelivery]);
        }
    }
    return 0;
}
