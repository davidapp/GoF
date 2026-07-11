CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := proxy
SRCS     := main.cpp image.cpp

$(TARGET): $(SRCS) image.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
