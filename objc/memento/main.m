#import <Foundation/Foundation.h>
#import "Memento.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        TextEditor *editor = [[TextEditor alloc] init];
        History *history = [[History alloc] init];

        editor.content = @"第一版内容";
        NSLog(@"编辑: %@", editor.content);
        [history push:[editor save]]; // 保存快照

        editor.content = @"第一版内容，追加了一段";
        NSLog(@"编辑: %@", editor.content);
        [history push:[editor save]]; // 再次保存快照

        editor.content = @"第一版内容，追加了一段，又手滑写错了一些";
        NSLog(@"编辑: %@（未保存）", editor.content);

        NSLog(@" ");
        NSLog(@"=== 撤销一次：应回到上一次保存的快照 ===");
        [editor restore:[history pop]];
        NSLog(@"当前内容: %@", editor.content);

        NSLog(@" ");
        NSLog(@"=== 再撤销一次：应回到最初的快照 ===");
        [editor restore:[history pop]];
        NSLog(@"当前内容: %@", editor.content);

        NSLog(@" ");
        NSLog(@"历史记录剩余: %lu 条", (unsigned long)[history count]);
    }
    return 0;
}
