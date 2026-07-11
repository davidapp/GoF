CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := strategy
SRCS     := main.cpp payment_strategy.cpp

$(TARGET): $(SRCS) payment_strategy.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
