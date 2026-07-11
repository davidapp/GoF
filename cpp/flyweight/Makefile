CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := flyweight
SRCS     := main.cpp forest.cpp

$(TARGET): $(SRCS) forest.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
