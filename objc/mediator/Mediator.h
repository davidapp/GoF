#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class User;

// ==================== 中介者（Mediator） ====================

@protocol ChatMediator <NSObject>
- (void)addUser:(User *)user;
- (void)sendMessage:(NSString *)message from:(User *)sender;
@end

// ==================== 同事类（Colleague） ====================

// 同事：用户，只认识中介者，不直接持有其他 User 的引用，彼此完全解耦
@interface User : NSObject

@property (nonatomic, copy, readonly) NSString *name;

- (instancetype)initWithName:(NSString *)name mediator:(id<ChatMediator>)mediator;

- (void)send:(NSString *)message;
- (void)receive:(NSString *)message from:(NSString *)senderName;

@end

// ==================== 具体中介者（Concrete Mediator） ====================

// 聊天室：具体中介者，负责把消息广播给除发送者外的所有用户
@interface ChatRoom : NSObject <ChatMediator>
@end

NS_ASSUME_NONNULL_END
