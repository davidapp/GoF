#import "AbstractFactory.h"

// ==================== Windows 系列具体产品 ====================

@implementation WindowsButton
- (NSString *)render {
    return @"[Windows 按钮：矩形边框，扁平风格]";
}
- (NSString *)onClick {
    return @"Windows 按钮播放系统点击音效";
}
@end

@implementation WindowsCheckbox
- (NSString *)render {
    return @"[Windows 复选框：方形勾选]";
}
- (NSString *)toggle {
    return @"Windows 复选框状态切换（方形勾选动画）";
}
@end

// ==================== macOS 系列具体产品 ====================

@implementation MacButton
- (NSString *)render {
    return @"[macOS 按钮：圆角边框，毛玻璃风格]";
}
- (NSString *)onClick {
    return @"macOS 按钮播放轻柔点击反馈";
}
@end

@implementation MacCheckbox
- (NSString *)render {
    return @"[macOS 复选框：圆角勾选]";
}
- (NSString *)toggle {
    return @"macOS 复选框状态切换（圆角勾选动画）";
}
@end

// ==================== 具体工厂 ====================

@implementation WindowsFactory
- (id<Button>)createButton {
    return [[WindowsButton alloc] init];
}
- (id<Checkbox>)createCheckbox {
    return [[WindowsCheckbox alloc] init];
}
@end

@implementation MacFactory
- (id<Button>)createButton {
    return [[MacButton alloc] init];
}
- (id<Checkbox>)createCheckbox {
    return [[MacCheckbox alloc] init];
}
@end

// ==================== 客户端 ====================

@implementation Application {
    id<Button> _button;
    id<Checkbox> _checkbox;
}

- (instancetype)initWithFactory:(id<GUIFactory>)factory {
    self = [super init];
    if (self) {
        _button = [factory createButton];
        _checkbox = [factory createCheckbox];
    }
    return self;
}

- (void)renderUI {
    NSLog(@"%@", [_button render]);
    NSLog(@"%@", [_checkbox render]);
    NSLog(@"%@", [_button onClick]);
    NSLog(@"%@", [_checkbox toggle]);
}

@end
