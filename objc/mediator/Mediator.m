#import "Mediator.h"

@implementation User {
    __weak id<ChatMediator> _mediator; // 弱引用，避免与持有 User 的中介者形成循环引用
}

- (instancetype)initWithName:(NSString *)name mediator:(id<ChatMediator>)mediator {
    self = [super init];
    if (self) {
        _name = [name copy];
        _mediator = mediator;
    }
    return self;
}

- (void)send:(NSString *)message {
    NSLog(@"[%@] 发送: %@", self.name, message);
    // User 不直接把消息发给其他 User，而是交给中介者去转发
    [_mediator sendMessage:message from:self];
}

- (void)receive:(NSString *)message from:(NSString *)senderName {
    NSLog(@"  [%@] 收到来自 %@ 的消息: %@", self.name, senderName, message);
}

@end

@implementation ChatRoom {
    NSMutableArray<User *> *_users;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _users = [NSMutableArray array];
    }
    return self;
}

- (void)addUser:(User *)user {
    [_users addObject:user];
}

- (void)sendMessage:(NSString *)message from:(User *)sender {
    // 中介者集中处理转发逻辑：广播给除发送者外的所有用户
    for (User *user in _users) {
        if (user != sender) {
            [user receive:message from:sender.name];
        }
    }
}

@end
