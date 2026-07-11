CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := observer
SRCS     := main.cpp weather.cpp

$(TARGET): $(SRCS) weather.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
