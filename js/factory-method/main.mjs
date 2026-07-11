// ============================================================
// 工厂方法模式（Factory Method）
// 场景：物流系统 —— Logistics 子类决定使用 Truck 还是 Ship 运输
// ============================================================

// ---- 抽象产品：运输工具 ----
class Transport {
  deliver() {
    throw new Error('子类必须实现 deliver()');
  }
}

// ---- 具体产品 ----
class Truck extends Transport {
  deliver() {
    return '卡车：沿公路运输货物到门口';
  }
}

class Ship extends Transport {
  deliver() {
    return '货轮：沿海路运输货物到港口';
  }
}

// ---- 抽象创建者：定义工厂方法 createTransport() ----
// 注意：基类中封装了不变的业务流程 planDelivery()，
// 具体用哪种运输工具交给子类的工厂方法决定（这就是“工厂方法”名字的由来）。
class Logistics {
  planDelivery(cargoName) {
    const transport = this.createTransport(); // 调用工厂方法，具体类型由子类决定
    const action = transport.deliver();
    return `[发货计划] 货物《${cargoName}》 -> ${action}`;
  }

  createTransport() {
    throw new Error('子类必须实现 createTransport()');
  }
}

// ---- 具体创建者 ----
class RoadLogistics extends Logistics {
  createTransport() {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport() {
    return new Ship();
  }
}

// ---- 客户端代码：只依赖抽象的 Logistics，不关心具体运输工具 ----
function clientCode(logistics, cargoName) {
  console.log(logistics.planDelivery(cargoName));
}

console.log('=== 工厂方法模式：物流运输 ===\n');

console.log('-- 陆运物流 --');
clientCode(new RoadLogistics(), '一批家具');

console.log('\n-- 海运物流 --');
clientCode(new SeaLogistics(), '一批集装箱货物');

// 运行时根据配置动态选择具体的 Logistics 子类
console.log('\n-- 根据配置动态选择物流方式 --');
function chooseLogistics(mode) {
  const factories = {
    road: () => new RoadLogistics(),
    sea: () => new SeaLogistics(),
  };
  return factories[mode]();
}
clientCode(chooseLogistics('sea'), '跨境电商包裹');
