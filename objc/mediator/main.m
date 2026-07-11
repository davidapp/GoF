#import <Foundation/Foundation.h>
#import "Mediator.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        ChatRoom *chatRoom = [[ChatRoom alloc] init];

        User *alice = [[User alloc] initWithName:@"Alice" mediator:chatRoom];
        User *bob = [[User alloc] initWithName:@"Bob" mediator:chatRoom];
        User *carol = [[User alloc] initWithName:@"Carol" mediator:chatRoom];

        [chatRoom addUser:alice];
        [chatRoom addUser:bob];
        [chatRoom addUser:carol];

        NSLog(@"=== Alice 发送消息 ===");
        [alice send:@"大家好！"];

        NSLog(@" ");
        NSLog(@"=== Bob 发送消息 ===");
        [bob send:@"你好 Alice，我是 Bob"];
    }
    return 0;
}
