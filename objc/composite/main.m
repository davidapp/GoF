#import <Foundation/Foundation.h>
#import "Composite.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        File *readme = [[File alloc] initWithName:@"README.md" size:1200];

        Directory *srcDir = [[Directory alloc] initWithName:@"src"];
        [srcDir addComponent:[[File alloc] initWithName:@"main.swift" size:3400]];
        [srcDir addComponent:[[File alloc] initWithName:@"utils.swift" size:800]];

        Directory *root = [[Directory alloc] initWithName:@"project"];
        [root addComponent:readme];
        [root addComponent:srcDir];
        [root addComponent:[[File alloc] initWithName:@".gitignore" size:50]];

        NSLog(@"=== 目录树（文件与目录被统一对待） ===");
        [root printWithIndent:@""];

        NSLog(@" ");
        NSLog(@"项目总大小: %ld 字节", (long)[root size]);
    }
    return 0;
}
