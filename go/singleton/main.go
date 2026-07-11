package main

import (
	"fmt"
	"sync"
)

// LogLevel 日志级别，使用 iota 定义枚举
type LogLevel int

const (
	LevelDebug LogLevel = iota
	LevelInfo
	LevelWarn
	LevelError
)

func (l LogLevel) String() string {
	switch l {
	case LevelDebug:
		return "DEBUG"
	case LevelInfo:
		return "INFO"
	case LevelWarn:
		return "WARN"
	case LevelError:
		return "ERROR"
	default:
		return "UNKNOWN"
	}
}

// Logger 单例：全局唯一的日志记录器
type Logger struct {
	level LogLevel
	logs  []string
}

var (
	instance *Logger
	once     sync.Once
)

// GetLogger 返回全局唯一的 Logger 实例。
// 用 sync.Once 保证懒加载且并发安全，是 Go 中实现单例的惯用方式。
func GetLogger() *Logger {
	once.Do(func() {
		fmt.Println("(创建 Logger 实例...)")
		instance = &Logger{level: LevelInfo}
	})
	return instance
}

func (l *Logger) SetLevel(level LogLevel) {
	l.level = level
}

func (l *Logger) Log(level LogLevel, msg string) {
	if level < l.level {
		return
	}
	entry := fmt.Sprintf("[%s] %s", level, msg)
	l.logs = append(l.logs, entry)
	fmt.Println(entry)
}

func (l *Logger) History() []string {
	return l.logs
}

func main() {
	fmt.Println("=== 单例模式：全局 Logger ===")

	logger1 := GetLogger()
	logger1.Log(LevelInfo, "模块 A 初始化")

	logger2 := GetLogger()
	logger2.SetLevel(LevelDebug)
	logger2.Log(LevelDebug, "模块 B 调试信息")

	fmt.Println("\nlogger1 与 logger2 是否为同一实例:", logger1 == logger2)
	fmt.Println("共记录日志条数:", len(logger1.History()))
}
