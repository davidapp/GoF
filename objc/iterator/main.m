#import <Foundation/Foundation.h>
#import "Iterator.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        BookCollection *shelf = [[BookCollection alloc] init];
        [shelf addBook:[[Book alloc] initWithTitle:@"设计模式" author:@"GoF"]];
        [shelf addBook:[[Book alloc] initWithTitle:@"重构" author:@"Martin Fowler"]];
        [shelf addBook:[[Book alloc] initWithTitle:@"代码整洁之道" author:@"Robert C. Martin"]];

        NSLog(@"=== 用自定义迭代器顺序遍历 BookCollection ===");
        id<Iterator> iterator = [shelf createIterator];
        NSInteger index = 1;
        while ([iterator hasNext]) {
            Book *book = [iterator next];
            NSLog(@"%ld. 《%@》 —— %@", (long)index, book.title, book.author);
            index += 1;
        }

        NSLog(@" ");
        NSLog(@"书架共有 %lu 本书", (unsigned long)[shelf count]);

        NSLog(@" ");
        NSLog(@"=== 同一个聚合可以同时产生多个互不干扰的迭代器 ===");
        id<Iterator> iteratorA = [shelf createIterator];
        id<Iterator> iteratorB = [shelf createIterator];
        NSLog(@"迭代器 A 第一本: %@", [[iteratorA next] title]);
        NSLog(@"迭代器 A 第二本: %@", [[iteratorA next] title]);
        NSLog(@"迭代器 B 第一本: %@（不受 A 的进度影响）", [[iteratorB next] title]);
    }
    return 0;
}
