// ============================================================
// 抽象工厂模式（Abstract Factory）
// 场景：跨平台 GUI —— 为 Windows / macOS 生产成套的 Button + Checkbox
// ============================================================

// ---- 抽象产品（Abstract Product）----
class Button {
  render() {
    throw new Error('子类必须实现 render()');
  }
  onClick() {
    throw new Error('子类必须实现 onClick()');
  }
}

class Checkbox {
  render() {
    throw new Error('子类必须实现 render()');
  }
  toggle() {
    throw new Error('子类必须实现 toggle()');
  }
}

// ---- 具体产品：Windows 系列 ----
class WindowsButton extends Button {
  render() {
    return '[Windows 按钮] 方形边框，蓝色高亮';
  }
  onClick() {
    return 'Windows 按钮：播放系统点击音效';
  }
}

class WindowsCheckbox extends Checkbox {
  render() {
    return '[Windows 复选框] 方形勾选框';
  }
  toggle() {
    return 'Windows 复选框：切换为方形对勾';
  }
}

// ---- 具体产品：macOS 系列 ----
class MacButton extends Button {
  render() {
    return '[macOS 按钮] 圆角边框，毛玻璃质感';
  }
  onClick() {
    return 'macOS 按钮：轻微缩放动画反馈';
  }
}

class MacCheckbox extends Checkbox {
  render() {
    return '[macOS 复选框] 圆角勾选框';
  }
  toggle() {
    return 'macOS 复选框：切换为圆角对勾动画';
  }
}

// ---- 抽象工厂（Abstract Factory）----
class GUIFactory {
  createButton() {
    throw new Error('子类必须实现 createButton()');
  }
  createCheckbox() {
    throw new Error('子类必须实现 createCheckbox()');
  }
}

// ---- 具体工厂 ----
class WindowsFactory extends GUIFactory {
  createButton() {
    return new WindowsButton();
  }
  createCheckbox() {
    return new WindowsCheckbox();
  }
}

class MacFactory extends GUIFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckbox();
  }
}

// ---- 客户端代码：只依赖抽象工厂与抽象产品 ----
class Application {
  #button;
  #checkbox;

  constructor(factory) {
    // 客户端不关心具体是哪个平台的产品，只通过工厂接口获取
    this.#button = factory.createButton();
    this.#checkbox = factory.createCheckbox();
  }

  renderUI() {
    console.log(this.#button.render());
    console.log(this.#button.onClick());
    console.log(this.#checkbox.render());
    console.log(this.#checkbox.toggle());
  }
}

// ---- 根据“运行平台”选择对应工厂 ----
function createFactory(osName) {
  switch (osName) {
    case 'windows':
      return new WindowsFactory();
    case 'mac':
      return new MacFactory();
    default:
      throw new Error(`不支持的平台: ${osName}`);
  }
}

console.log('=== 抽象工厂模式：跨平台 GUI 控件族 ===\n');

console.log('-- 在 Windows 平台上渲染 UI --');
const winApp = new Application(createFactory('windows'));
winApp.renderUI();

console.log('\n-- 在 macOS 平台上渲染 UI --');
const macApp = new Application(createFactory('mac'));
macApp.renderUI();
