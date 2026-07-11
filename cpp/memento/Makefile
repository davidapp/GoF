CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := memento
SRCS     := main.cpp editor.cpp

$(TARGET): $(SRCS) editor.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
