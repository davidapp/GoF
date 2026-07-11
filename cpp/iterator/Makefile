CXX      := g++
CXXFLAGS := -std=c++17 -Wall -Wextra
TARGET   := iterator
SRCS     := main.cpp book_collection.cpp

$(TARGET): $(SRCS) book_collection.h
	$(CXX) $(CXXFLAGS) -o $@ $(SRCS)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: run clean
