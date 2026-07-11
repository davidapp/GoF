#pragma once
#include <memory>
#include <string>

// 产品：Computer，由若干部件组成
class Computer {
public:
    void set_cpu(const std::string& cpu) { cpu_ = cpu; }
    void set_ram(const std::string& ram) { ram_ = ram; }
    void set_storage(const std::string& storage) { storage_ = storage; }
    void set_gpu(const std::string& gpu) { gpu_ = gpu; }

    std::string describe() const;

private:
    std::string cpu_ = "未指定";
    std::string ram_ = "未指定";
    std::string storage_ = "未指定";
    std::string gpu_ = "无独立显卡";
};

// 抽象建造者：声明组装计算机各部件的步骤，返回自身以支持链式调用
class ComputerBuilder {
public:
    virtual ~ComputerBuilder() = default;
    virtual ComputerBuilder& build_cpu() = 0;
    virtual ComputerBuilder& build_ram() = 0;
    virtual ComputerBuilder& build_storage() = 0;
    virtual ComputerBuilder& build_gpu() = 0;
    // 取出建造好的产品，随后建造者内部复位以便建造下一个
    virtual std::unique_ptr<Computer> result() = 0;

protected:
    std::unique_ptr<Computer> computer_ = std::make_unique<Computer>();
};

// 具体建造者：高性能游戏主机配置
class GamingComputerBuilder : public ComputerBuilder {
public:
    ComputerBuilder& build_cpu() override;
    ComputerBuilder& build_ram() override;
    ComputerBuilder& build_storage() override;
    ComputerBuilder& build_gpu() override;
    std::unique_ptr<Computer> result() override;
};

// 具体建造者：轻量办公主机配置
class OfficeComputerBuilder : public ComputerBuilder {
public:
    ComputerBuilder& build_cpu() override;
    ComputerBuilder& build_ram() override;
    ComputerBuilder& build_storage() override;
    ComputerBuilder& build_gpu() override;
    std::unique_ptr<Computer> result() override;
};

// 指挥者：规定装配顺序，封装“预设配置”这一固定流程
class Director {
public:
    explicit Director(ComputerBuilder& builder) : builder_(builder) {}
    std::unique_ptr<Computer> construct();

private:
    ComputerBuilder& builder_;
};
