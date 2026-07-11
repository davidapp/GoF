CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := builder
SRCS     := main.cpp computer.cpp

$(TARGET): $(SRCS) computer.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
