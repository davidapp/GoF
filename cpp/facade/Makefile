CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := facade
SRCS     := main.cpp hometheater.cpp

$(TARGET): $(SRCS) hometheater.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
