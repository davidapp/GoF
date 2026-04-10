#include "singleton.h"
#include <iostream>

Logger::Logger() : level_("INFO") {}

void Logger::log(const std::string& message) const {
    std::cout << "[" << level_ << "] " << message << std::endl;
}
