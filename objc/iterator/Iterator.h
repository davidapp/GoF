#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// ==================== 元素 ====================

@interface Book : NSObject

@property (nonatomic, copy, readonly) NSString *title;
@property (nonatomic, copy, readonly) NSString *author;

- (instancetype)initWithTitle:(NSString *)title author:(NSString *)author;

@end

// ==================== 迭代器（Iterator） ====================

@protocol Iterator <NSObject>
- (BOOL)hasNext;
- (nullable Book *)next;
@end

// ==================== 聚合（Aggregate） ====================

// 自定义聚合：内部用数组存储，但对外只暴露"创建迭代器"的能力，
// 不暴露内部数据结构，客户端只能通过迭代器顺序访问元素。
@interface BookCollection : NSObject

- (void)addBook:(Book *)book;
- (id<Iterator>)createIterator;
- (NSUInteger)count;

@end

NS_ASSUME_NONNULL_END
