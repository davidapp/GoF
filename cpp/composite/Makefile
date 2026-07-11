CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := composite
SRCS     := main.cpp filesystem.cpp

$(TARGET): $(SRCS) filesystem.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
