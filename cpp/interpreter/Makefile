CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := interpreter
SRCS     := main.cpp expression.cpp

$(TARGET): $(SRCS) expression.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
