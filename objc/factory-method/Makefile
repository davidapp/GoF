CC     := clang
CFLAGS := -fobjc-arc -framework Foundation
TARGET := factory-method
SRCS   := $(wildcard *.m)

build: $(TARGET)

$(TARGET): $(SRCS)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRCS)

run: build
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: build run clean
