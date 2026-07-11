#import <Foundation/Foundation.h>
#import "Facade.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        HomeTheaterFacade *homeTheater =
            [[HomeTheaterFacade alloc] initWithProjector:[[Projector alloc] init]
                                                amplifier:[[Amplifier alloc] init]
                                                   lights:[[Lights alloc] init]
                                                   player:[[StreamingPlayer alloc] init]];

        [homeTheater watchMovie:@"星际穿越"];
        NSLog(@" ");
        [homeTheater endMovie];
    }
    return 0;
}
