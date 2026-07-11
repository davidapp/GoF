CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := factory-method
SRCS     := main.cpp logistics.cpp

$(TARGET): $(SRCS) logistics.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
