CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := state
SRCS     := main.cpp player.cpp

$(TARGET): $(SRCS) player.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
