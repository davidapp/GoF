package main

import "fmt"

// ChatMediator 中介者接口：聊天室
type ChatMediator interface {
	Broadcast(sender *User, message string)
	Register(user *User)
}

// ChatRoom 具体中介者：聊天室，负责协调所有用户之间的消息转发，
// 用户之间无需相互持有引用，彼此解耦。
type ChatRoom struct {
	users []*User
}

func NewChatRoom() *ChatRoom {
	return &ChatRoom{}
}

func (r *ChatRoom) Register(user *User) {
	r.users = append(r.users, user)
	user.mediator = r
}

// Broadcast 将消息转发给除发送者外的所有用户
func (r *ChatRoom) Broadcast(sender *User, message string) {
	for _, u := range r.users {
		if u != sender {
			u.Receive(sender.Name, message)
		}
	}
}

// User 同事类：用户，只与中介者交互，不直接依赖其他用户
type User struct {
	Name     string
	mediator ChatMediator
}

func NewUser(name string) *User {
	return &User{Name: name}
}

func (u *User) Send(message string) {
	fmt.Printf("[%s 发送]: %s\n", u.Name, message)
	u.mediator.Broadcast(u, message)
}

func (u *User) Receive(from, message string) {
	fmt.Printf("  -> %s 收到来自 %s 的消息: %s\n", u.Name, from, message)
}

func main() {
	fmt.Println("=== 中介者模式：聊天室 ===")

	chatRoom := NewChatRoom()

	alice := NewUser("Alice")
	bob := NewUser("Bob")
	carol := NewUser("Carol")

	chatRoom.Register(alice)
	chatRoom.Register(bob)
	chatRoom.Register(carol)

	alice.Send("大家好！")
	fmt.Println()
	bob.Send("Alice 你好，我是 Bob")
}
