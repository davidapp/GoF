/**
 * 工厂方法模式（Factory Method）
 * 场景：物流系统 —— Logistics 子类决定使用 Truck 还是 Ship 运输。
 *
 * 核心思想：父类定义创建对象的接口（工厂方法），
 * 但把“创建哪个具体类”的决定权延迟到子类。
 */

// ---------- 抽象产品（Product） ----------
interface Transport {
  deliver(): string;
}

// ---------- 具体产品（Concrete Product） ----------
class Truck implements Transport {
  deliver(): string {
    return "使用卡车经陆路运输货物";
  }
}

class Ship implements Transport {
  deliver(): string {
    return "使用轮船经海路运输货物";
  }
}

// ---------- 抽象创建者（Creator），声明工厂方法 ----------
abstract class Logistics {
  // 工厂方法：交给子类实现
  protected abstract createTransport(): Transport;

  // 使用工厂方法产出的对象完成业务逻辑，这部分逻辑与具体运输方式无关
  planDelivery(): string {
    const transport = this.createTransport();
    return `[规划配送] ${transport.deliver()}`;
  }
}

// ---------- 具体创建者（Concrete Creator） ----------
class RoadLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Ship();
  }
}

// ---------- 演示 ----------
function main(): void {
  const routes: { name: string; logistics: Logistics }[] = [
    { name: "陆运路线（北京 -> 上海）", logistics: new RoadLogistics() },
    { name: "海运路线（上海 -> 洛杉矶）", logistics: new SeaLogistics() },
  ];

  for (const route of routes) {
    console.log(`\n=== ${route.name} ===`);
    console.log(route.logistics.planDelivery());
  }
}

main();
