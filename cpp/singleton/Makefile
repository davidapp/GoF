CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := singleton
SRCS     := main.cpp singleton.cpp

$(TARGET): $(SRCS) singleton.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
