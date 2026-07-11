CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := decorator
SRCS     := main.cpp coffee.cpp

$(TARGET): $(SRCS) coffee.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
