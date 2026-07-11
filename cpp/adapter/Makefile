CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := adapter
SRCS     := main.cpp payment.cpp

$(TARGET): $(SRCS) payment.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
