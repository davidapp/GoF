CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := abstract-factory
SRCS     := main.cpp gui_factory.cpp

$(TARGET): $(SRCS) gui_factory.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
