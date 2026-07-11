/**
 * 抽象工厂模式（Abstract Factory）
 * 场景：跨平台 GUI —— 为 Windows / macOS 生产成套的 Button + Checkbox。
 *
 * 核心思想：抽象工厂负责创建一整族相互关联的产品对象，
 * 客户端只依赖抽象接口，无需关心具体平台的实现类。
 */

// ---------- 抽象产品（Abstract Product） ----------
interface Button {
  render(): string;
  onClick(): string;
}

interface Checkbox {
  render(): string;
  toggle(): string;
}

// ---------- 具体产品：Windows 系列（Concrete Product） ----------
class WindowsButton implements Button {
  render(): string {
    return "[Windows 按钮：方形边框]";
  }
  onClick(): string {
    return "Windows 按钮被点击（播放系统提示音）";
  }
}

class WindowsCheckbox implements Checkbox {
  private checked = false;
  render(): string {
    return "[Windows 复选框：□]";
  }
  toggle(): string {
    this.checked = !this.checked;
    return `Windows 复选框切换为 ${this.checked ? "☑" : "☐"}`;
  }
}

// ---------- 具体产品：macOS 系列（Concrete Product） ----------
class MacButton implements Button {
  render(): string {
    return "[macOS 按钮：圆角边框]";
  }
  onClick(): string {
    return "macOS 按钮被点击（轻触反馈）";
  }
}

class MacCheckbox implements Checkbox {
  private checked = false;
  render(): string {
    return "[macOS 复选框：圆形]";
  }
  toggle(): string {
    this.checked = !this.checked;
    return `macOS 复选框切换为 ${this.checked ? "●" : "○"}`;
  }
}

// ---------- 抽象工厂（Abstract Factory） ----------
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// ---------- 具体工厂（Concrete Factory） ----------
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// ---------- 客户端代码：只依赖抽象工厂/产品接口 ----------
type Platform = "windows" | "macos";

function createFactory(platform: Platform): GUIFactory {
  switch (platform) {
    case "windows":
      return new WindowsFactory();
    case "macos":
      return new MacFactory();
  }
}

function renderUI(factory: GUIFactory): void {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  console.log(button.render());
  console.log(button.onClick());
  console.log(checkbox.render());
  console.log(checkbox.toggle());
}

// ---------- 演示 ----------
function main(): void {
  const platforms: Platform[] = ["windows", "macos"];
  for (const platform of platforms) {
    console.log(`\n=== 目标平台：${platform} ===`);
    const factory = createFactory(platform);
    renderUI(factory);
  }
}

main();
