#include "computer.h"
#include <sstream>

std::string Computer::describe() const {
    std::ostringstream oss;
    oss << "CPU=" << cpu_ << ", 内存=" << ram_
        << ", 存储=" << storage_ << ", 显卡=" << gpu_;
    return oss.str();
}

ComputerBuilder& GamingComputerBuilder::build_cpu() {
    computer_->set_cpu("Intel Core i9-14900K");
    return *this;
}
ComputerBuilder& GamingComputerBuilder::build_ram() {
    computer_->set_ram("32GB DDR5");
    return *this;
}
ComputerBuilder& GamingComputerBuilder::build_storage() {
    computer_->set_storage("2TB NVMe SSD");
    return *this;
}
ComputerBuilder& GamingComputerBuilder::build_gpu() {
    computer_->set_gpu("NVIDIA RTX 4090");
    return *this;
}
std::unique_ptr<Computer> GamingComputerBuilder::result() {
    auto built = std::move(computer_);
    computer_ = std::make_unique<Computer>();
    return built;
}

ComputerBuilder& OfficeComputerBuilder::build_cpu() {
    computer_->set_cpu("Intel Core i5-13400");
    return *this;
}
ComputerBuilder& OfficeComputerBuilder::build_ram() {
    computer_->set_ram("16GB DDR4");
    return *this;
}
ComputerBuilder& OfficeComputerBuilder::build_storage() {
    computer_->set_storage("512GB SSD");
    return *this;
}
ComputerBuilder& OfficeComputerBuilder::build_gpu() {
    // 办公场景无需独立显卡，保持默认集成显卡
    return *this;
}
std::unique_ptr<Computer> OfficeComputerBuilder::result() {
    auto built = std::move(computer_);
    computer_ = std::make_unique<Computer>();
    return built;
}

std::unique_ptr<Computer> Director::construct() {
    builder_.build_cpu().build_ram().build_storage().build_gpu();
    return builder_.result();
}
