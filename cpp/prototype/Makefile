CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := prototype
SRCS     := main.cpp shape.cpp

$(TARGET): $(SRCS) shape.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
