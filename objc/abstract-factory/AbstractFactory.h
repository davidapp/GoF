#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 抽象产品（Abstract Product） ====================
// ObjC 没有强制的抽象类机制，惯用做法是用 @protocol 表达"抽象产品/抽象工厂"接口。

// 抽象产品：按钮
@protocol Button <NSObject>
- (NSString *)render;   // 渲染按钮，返回描述文本
- (NSString *)onClick;  // 点击按钮的响应
@end

// 抽象产品：复选框
@protocol Checkbox <NSObject>
- (NSString *)render;   // 渲染复选框，返回描述文本
- (NSString *)toggle;   // 切换选中状态
@end

// ==================== 具体产品：Windows 系列 ====================

@interface WindowsButton : NSObject <Button>
@end

@interface WindowsCheckbox : NSObject <Checkbox>
@end

// ==================== 具体产品：macOS 系列 ====================

@interface MacButton : NSObject <Button>
@end

@interface MacCheckbox : NSObject <Checkbox>
@end

// ==================== 抽象工厂（Abstract Factory） ====================

// 抽象工厂：生产一整套（Button + Checkbox）风格一致的 UI 控件
@protocol GUIFactory <NSObject>
- (id<Button>)createButton;
- (id<Checkbox>)createCheckbox;
@end

// ==================== 具体工厂（Concrete Factory） ====================

@interface WindowsFactory : NSObject <GUIFactory>
@end

@interface MacFactory : NSObject <GUIFactory>
@end

// ==================== 客户端（Client） ====================

// 客户端：只依赖抽象工厂与抽象产品协议，完全不知道具体平台类型
@interface Application : NSObject

- (instancetype)initWithFactory:(id<GUIFactory>)factory;

- (void)renderUI;

@end

NS_ASSUME_NONNULL_END
