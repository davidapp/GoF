CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := visitor
SRCS     := main.cpp shape_visitor.cpp

$(TARGET): $(SRCS) shape_visitor.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
