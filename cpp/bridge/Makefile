CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := bridge
SRCS     := main.cpp device.cpp remote.cpp

$(TARGET): $(SRCS) device.h remote.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
