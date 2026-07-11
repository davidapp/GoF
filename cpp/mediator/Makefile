CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := mediator
SRCS     := main.cpp chatroom.cpp

$(TARGET): $(SRCS) chatroom.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
