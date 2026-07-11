CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := chain-of-responsibility
SRCS     := main.cpp approval.cpp

$(TARGET): $(SRCS) approval.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
