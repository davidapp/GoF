CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := template-method
SRCS     := main.cpp beverage.cpp

$(TARGET): $(SRCS) beverage.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
