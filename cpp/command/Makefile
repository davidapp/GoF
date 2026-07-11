CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := command
SRCS     := main.cpp command.cpp

$(TARGET): $(SRCS) command.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
