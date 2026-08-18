#!/usr/bin/env python3
"""Generate docs/ gallery and embed architecture diagrams into pattern READMEs."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANGS = ["cpp", "go", "java", "js", "objc", "python", "rust", "swift", "ts"]

# Shared mermaid classDefs — semantic colors, reused in every diagram.
STYLE = """\
    classDef client fill:#C2E5FF,stroke:#007AD2,color:#1E1E1E
    classDef abs fill:#DCCCFF,stroke:#874FFF,color:#1E1E1E
    classDef concrete fill:#CDF4D3,stroke:#3E9B4B,color:#1E1E1E
    classDef extra fill:#FFE0C2,stroke:#EB7500,color:#1E1E1E
    classDef shared fill:#FFECBD,stroke:#E8A302,color:#1E1E1E
    classDef hub fill:#C6FAF6,stroke:#5AD8CC,color:#1E1E1E
"""

PATTERNS: list[dict] = [
    # ---------- 创建型 ----------
    {
        "slug": "singleton",
        "en": "Singleton",
        "zh": "单例",
        "category": "creational",
        "metaphor": "整栋大楼只发一把总钥匙。模块 A、模块 B、主程序去前台领取，拿到的永远是同一把 —— 这就是单例。",
        "roles": [
            ("前台 / 总钥匙", "SingletonMeta + Logger 全局唯一实例"),
            ("来领钥匙的部门", "ModuleA / ModuleB / 主程序"),
        ],
        "mermaid": """
flowchart TB
    modA["模块 A"]
    modB["模块 B"]
    mainProg["主程序"]
    subgraph lobby ["前台：整栋楼只发一把总钥匙"]
        meta{{"SingletonMeta 登记处"}}
        logger[("Logger 总钥匙")]
        meta ==> logger
    end
    modA -->|"Logger()"| meta
    modB -->|"Logger()"| meta
    mainProg -->|"Logger()"| meta
    modA -.->|"is 同一把"| logger
    modB -.->|"is 同一把"| logger
    mainProg -.->|"is 同一把"| logger
    class modA,modB,mainProg client
    class meta extra
    class logger shared
    style lobby fill:#FFECBD,stroke:#E8A302
""",
    },
    {
        "slug": "factory-method",
        "en": "Factory Method",
        "zh": "工厂方法",
        "category": "creational",
        "metaphor": "客户只说「把货送走」。陆运公司决定造卡车，海运公司决定造货轮 —— 子类决定实例化哪一个产品。",
        "roles": [
            ("客户下单", "调用 plan_delivery 的客户端"),
            ("物流公司", "Logistics 抽象创建者及其子类"),
            ("运输工具", "Truck / Ship 具体产品"),
        ],
        "mermaid": """
flowchart TB
    cargo[/货物订单/]
    subgraph company ["物流公司：业务流程相同，造什么车由子类决定"]
        plan["plan_delivery 发货流程"]
        factory{"工厂方法 create_transport"}
        plan --> factory
        road["陆运公司"]
        sea["海运公司"]
    end
    truck["卡车 Truck"]
    ship["货轮 Ship"]
    delivered[/送达/]
    cargo --> plan
    factory -->|"RoadLogistics"| road
    factory -->|"SeaLogistics"| sea
    road ==> truck
    sea ==> ship
    truck --> delivered
    ship --> delivered
    class cargo,delivered client
    class plan,factory abs
    class road,sea,truck,ship concrete
    style company fill:#DCCCFF,stroke:#874FFF
""",
    },
    {
        "slug": "abstract-factory",
        "en": "Abstract Factory",
        "zh": "抽象工厂",
        "category": "creational",
        "metaphor": "家具店一次卖「成套风格」。Windows 工厂成套出 Win 按钮+Win 复选框，Mac 工厂成套出 Mac 风格 —— 绝不混搭。",
        "roles": [
            ("顾客 / 应用", "Application，只依赖 GUIFactory"),
            ("成套工厂", "WindowsFactory / MacFactory"),
            ("成套产品", "Button + Checkbox 必须同一家族"),
        ],
        "mermaid": """
flowchart TB
    app["Application 顾客只认抽象工厂"]
    subgraph winShop ["Windows 风格套装"]
        wf["WindowsFactory"]
        wb["Win 按钮"]
        wc["Win 复选框"]
        wf --> wb
        wf --> wc
    end
    subgraph macShop ["macOS 风格套装"]
        mf["MacFactory"]
        mb["Mac 按钮"]
        mc["Mac 复选框"]
        mf --> mb
        mf --> mc
    end
    app -->|"成套取用"| wf
    app -->|"成套取用"| mf
    mixx["禁止：Win 按钮 + Mac 复选框"]
    wf --x mixx
    mf --x mixx
    class app client
    class wf,mf abs
    class wb,wc,mb,mc concrete
    class mixx extra
    style winShop fill:#C2E5FF,stroke:#3DADFF
    style macShop fill:#CDF4D3,stroke:#66D575
""",
    },
    {
        "slug": "builder",
        "en": "Builder",
        "zh": "建造者",
        "category": "creational",
        "metaphor": "装机店流水线：指挥者拿「办公机 / 游戏主机 / 工作站」图纸发令，装配师傅一步步装 CPU、内存、硬盘、显卡，最后交出一台电脑。客户也可以绕过图纸自由拼。",
        "roles": [
            ("指挥者", "ComputerDirector 预设装配顺序"),
            ("装配师傅", "ComputerBuilder 链式分步接口"),
            ("成品", "Computer"),
        ],
        "mermaid": """
flowchart LR
    customer["客户"]
    director["Director 指挥者拿图纸"]
    builder["ComputerBuilder 装配师傅"]
    customer -->|"点预设套餐"| director
    director -->|"按步骤发令"| builder
    customer -->|"也可以自由拼"| builder
    builder -->|"set_cpu"| cpu["CPU"]
    builder -->|"set_memory"| mem["内存"]
    builder -->|"set_storage"| disk["硬盘"]
    builder -->|"set_gpu"| gpu["显卡"]
    builder ==> pc[("Computer 成品")]
    class customer client
    class director extra
    class builder abs
    class cpu,mem,disk,gpu,pc concrete
""",
    },
    {
        "slug": "prototype",
        "en": "Prototype",
        "zh": "原型",
        "category": "creational",
        "metaphor": "印章柜里放着圆形、矩形两枚母章。要新图时不从零雕刻，盖一下（clone）就得到互不干扰的副本，改颜色也不脏了母章。",
        "roles": [
            ("母章 / 原型", "Shape.clone，默认 deepcopy"),
            ("印章柜", "按名字取模板的原型注册表"),
            ("盖出的副本", "改颜色、位置、标签，不影响原件"),
        ],
        "mermaid": """
flowchart LR
    subgraph cabinet ["印章柜 原型注册表"]
        circle0["圆形母章"]
        rect0["矩形母章"]
    end
    c1["红色圆 副本"]
    c2["蓝色圆 副本"]
    r1["平移后的矩形副本"]
    circle0 -->|"clone 深拷贝"| c1
    circle0 -->|"clone 深拷贝"| c2
    rect0 -->|"clone 深拷贝"| r1
    c1 -.->|"改颜色不影响母章"| circle0
    class circle0,rect0 shared
    class c1,c2,r1 concrete
    style cabinet fill:#FFECBD,stroke:#E8A302
""",
    },
    # ---------- 结构型 ----------
    {
        "slug": "adapter",
        "en": "Adapter",
        "zh": "适配器",
        "category": "structural",
        "metaphor": "出国旅行的转换插头：手机充电器只认「pay(元)」，Stripe 要「charge(分)」，PayPal 要「美元」。适配器在中间换单位、改方法名，收银台毫无感知。",
        "roles": [
            ("收银台", "checkout，只依赖 PaymentProcessor"),
            ("转换插头", "StripeAdapter / PayPalAdapter"),
            ("异形插座", "StripePayment / PayPalPayment 第三方 SDK"),
        ],
        "mermaid": """
flowchart LR
    cashier["收银台 checkout 只认 pay 元"]
    subgraph plugs ["转换插头 适配器"]
        sa["Stripe 适配器 元变分"]
        pa["PayPal 适配器 元变美元"]
    end
    stripe["Stripe SDK charge 分"]
    paypal["PayPal SDK send_payment 美元"]
    cashier ==> sa --> stripe
    cashier ==> pa --> paypal
    class cashier client
    class sa,pa extra
    class stripe,paypal concrete
    style plugs fill:#FFE0C2,stroke:#EB7500
""",
    },
    {
        "slug": "bridge",
        "en": "Bridge",
        "zh": "桥接",
        "category": "structural",
        "metaphor": "遥控器和家电是两座岛。基础遥控 / 高级遥控是一座岛，电视 / 收音机是另一座岛。中间一座桥（组合引用）把它们连上，不必为每种组合造一个新类。",
        "roles": [
            ("遥控器岛", "RemoteControl / AdvancedRemoteControl 抽象"),
            ("桥", "抽象持有的 Device 引用"),
            ("家电岛", "TV / Radio 实现"),
        ],
        "mermaid": """
flowchart TB
    subgraph remotes ["遥控器岛 可独立扩展"]
        basic["基础遥控"]
        adv["高级遥控 含静音"]
        basic --> adv
    end
    bridge{{"桥：持有 Device 引用"}}
    subgraph devices ["家电岛 可独立扩展"]
        tv["电视 TV"]
        radio["收音机 Radio"]
    end
    basic ==> bridge
    adv ==> bridge
    bridge ==> tv
    bridge ==> radio
    class basic,adv abs
    class bridge extra
    class tv,radio concrete
    style remotes fill:#DCCCFF,stroke:#874FFF
    style devices fill:#CDF4D3,stroke:#3E9B4B
""",
    },
    {
        "slug": "composite",
        "en": "Composite",
        "zh": "组合",
        "category": "structural",
        "metaphor": "文件夹套娃：根目录装着子目录和文件。问「有多大」时，文件报自己的字节，目录把孩子们的大小加起来。客户端从不写 if 是文件还是目录。",
        "roles": [
            ("统一接口", "FileSystemNode.size / display"),
            ("叶子", "File"),
            ("容器", "Directory，递归包含子节点"),
        ],
        "mermaid": """
flowchart TB
    caller["客户端 只认同一接口"]
    root["根目录 /  组合"]
    docs["docs/  组合"]
    src["src/  组合"]
    readme["README.md  叶子"]
    guide["guide.md  叶子"]
    mainPy["main.py  叶子"]
    caller ==> root
    root --> docs
    root --> src
    root --> readme
    docs --> guide
    src --> mainPy
    class caller client
    class root,docs,src abs
    class readme,guide,mainPy concrete
""",
    },
    {
        "slug": "decorator",
        "en": "Decorator",
        "zh": "装饰器",
        "category": "structural",
        "metaphor": "咖啡加料：浓缩是内核，外面一层牛奶、一层糖、一层奶油。每一层都还是「一杯咖啡」，点单时问 cost，层层转发并加价。",
        "roles": [
            ("内核", "Espresso / Americano 具体构件"),
            ("加料包装", "Milk / Sugar / WhippedCream 装饰器"),
            ("统一接口", "Coffee.cost / description"),
        ],
        "mermaid": """
flowchart LR
    guest["顾客 只认 Coffee"]
    whip["奶油包装 +6"]
    sugar["糖包装 +2"]
    milk["牛奶包装 +4"]
    espresso["浓缩 Espresso 12"]
    guest ==> whip
    whip -->|"转发并加价"| sugar
    sugar -->|"转发并加价"| milk
    milk -->|"转发并加价"| espresso
    class guest client
    class whip,sugar,milk extra
    class espresso concrete
""",
    },
    {
        "slug": "facade",
        "en": "Facade",
        "zh": "外观",
        "category": "structural",
        "metaphor": "家庭影院一键观影：观众只按「看电影」。外观对象按顺序关灯、开投影、调功放、按播放。高级玩家仍可绕过外观直接拨弄每个设备。",
        "roles": [
            ("观众", "客户端，只调 watch_movie"),
            ("万能遥控", "HomeTheaterFacade"),
            ("子系统", "Lights / Projector / Amplifier / Player"),
        ],
        "mermaid": """
flowchart TB
    audience["观众 一键看电影"]
    facade["HomeTheaterFacade 万能遥控"]
    audience ==> facade
    facade --> lights["灯光 dim 20"]
    facade --> proj["投影 HDMI"]
    facade --> amp["功放 音量 15"]
    facade --> player["播放器 播星际穿越"]
    class audience client
    class facade hub
    class lights,proj,amp,player concrete
""",
    },
    {
        "slug": "flyweight",
        "en": "Flyweight",
        "zh": "享元",
        "category": "structural",
        "metaphor": "种一片森林：每棵树只要记住自己的坐标，树种、颜色、纹理是共享图纸。一千棵松树只印一张松树图纸，内存不再按棵数爆炸。",
        "roles": [
            ("图纸仓库", "TreeTypeFactory 按键缓存"),
            ("共享图纸", "TreeType 内在状态"),
            ("一棵树", "Tree 只存坐标外在状态"),
        ],
        "mermaid": """
flowchart TB
    factory["树种工厂 图纸仓库"]
    pine["松树图纸 绿/粗糙"]
    oak["橡树图纸 褐/光滑"]
    factory ==> pine
    factory ==> oak
    t1["树 在 10,20"]
    t2["树 在 30,40"]
    t3["树 在 50,15"]
    t4["树 在 70,80"]
    t1 --> pine
    t2 --> pine
    t3 --> oak
    t4 --> pine
    class factory,pine,oak shared
    class t1,t2,t3,t4 concrete
""",
    },
    {
        "slug": "proxy",
        "en": "Proxy",
        "zh": "代理",
        "category": "structural",
        "metaphor": "相册先摆三张空相框。点开才从仓库搬出真照片；没点开的那张，磁盘加载一次都不会发生。",
        "roles": [
            ("相册", "客户端，只认 Image.display"),
            ("空相框", "ImageProxy 虚拟代理"),
            ("仓库真图", "RealImage，构造时才加载"),
        ],
        "mermaid": """
flowchart LR
    album["相册 display"]
    p1["代理 photo1 占位"]
    p2["代理 photo2 占位"]
    p3["代理 photo3 从未点开"]
    real1["真图 磁盘加载"]
    real2["真图 磁盘加载"]
    skip["从未加载"]
    album --> p1
    album --> p2
    album --> p3
    p1 -->|"第一次 display"| real1
    p2 -->|"第一次 display"| real2
    p3 --x skip
    class album client
    class p1,p2,p3 extra
    class real1,real2 concrete
    class skip shared
""",
    },
    # ---------- 行为型 ----------
    {
        "slug": "chain-of-responsibility",
        "en": "Chain of Responsibility",
        "zh": "责任链",
        "category": "behavioral",
        "metaphor": "采购单沿公章接力：经理能批 5000 就盖章，否则递给总监，再递给 CEO。提交人只把单子交给第一环，从不管最终谁批。",
        "roles": [
            ("采购单", "PurchaseRequest"),
            ("审批链", "Manager → Director → CEO"),
            ("提交人", "只调用链头 handle"),
        ],
        "mermaid": """
flowchart LR
    req[/采购申请单/]
    mgr{"经理 限额 5000"}
    director{"总监 限额 20000"}
    ceo{"CEO 无限额"}
    approved[/批准/]
    rejected[/超限拒绝/]
    req ==> mgr
    mgr -->|"额度内"| approved
    mgr -->|"超出 传递"| director
    director -->|"额度内"| approved
    director -->|"超出 传递"| ceo
    ceo -->|"额度内"| approved
    ceo -->|"仍超出"| rejected
    class req client
    class mgr,director,ceo extra
    class approved concrete
    class rejected shared
""",
    },
    {
        "slug": "command",
        "en": "Command",
        "zh": "命令",
        "category": "behavioral",
        "metaphor": "遥控器按钮里装的不是电线，是一封命令信封。按下就把信封交给灯去执行；撤销则打开上一封信封做反操作。按钮不用知道灯怎么开。",
        "roles": [
            ("遥控器", "RemoteControl 调用者"),
            ("命令信封", "LightOnCommand / LightOffCommand"),
            ("灯", "Light 接收者"),
        ],
        "mermaid": """
flowchart LR
    finger["手指按下"]
    remote["遥控器 调用者"]
    cmd["命令信封 execute / undo"]
    light["灯 接收者"]
    hist[(历史栈 可撤销)]
    finger ==> remote
    remote ==> cmd
    cmd -->|"execute"| light
    remote -->|"按过的信封入栈"| hist
    hist -->|"undo 拆开上一封"| cmd
    class finger,remote client
    class cmd extra
    class light concrete
    class hist shared
""",
    },
    {
        "slug": "interpreter",
        "en": "Interpreter",
        "zh": "解释器",
        "category": "behavioral",
        "metaphor": "把「5 + 3 - 2」拆成积木树：加减是组合积木，数字和变量是末端积木。对着变量表走一遍 interpret，树就算出结果。",
        "roles": [
            ("句子", "中缀表达式字符串"),
            ("积木树", "Add / Subtract / Number / Variable"),
            ("词典", "Context 变量表"),
        ],
        "mermaid": """
flowchart TB
    src["句子：5 + 3 - 2"]
    parse["parse 拆成积木树"]
    src --> parse
    sub["减法 非终结符"]
    add["加法 非终结符"]
    n5["5"]
    n3["3"]
    n2["2"]
    parse --> sub
    sub --> add
    sub --> n2
    add --> n5
    add --> n3
    ctx[(Context 变量表)]
    result["interpret 结果 = 6"]
    sub ==> result
    ctx -.-> result
    class src client
    class parse,sub,add extra
    class n5,n3,n2 concrete
    class ctx,result shared
""",
    },
    {
        "slug": "iterator",
        "en": "Iterator",
        "zh": "迭代器",
        "category": "behavioral",
        "metaphor": "书架抽屉怎么排，读者看不见。正序书签从左往右滑，倒序书签从右往左滑。两种书签各记各的位置，互不干扰。",
        "roles": [
            ("书架", "BookCollection，内部列表不外露"),
            ("正序书签", "BookIterator"),
            ("倒序书签", "ReverseBookIterator"),
        ],
        "mermaid": """
flowchart TB
    reader["读者 for-in"]
    shelf["书架 BookCollection 内部列表保密"]
    fwd["正序书签"]
    rev["倒序书签"]
    reader --> shelf
    shelf --> fwd
    shelf --> rev
    fwd --> order1["书1 然后 书2 然后 书3"]
    rev --> order2["书3 然后 书2 然后 书1"]
    class reader client
    class shelf abs
    class fwd,rev extra
    class order1,order2 concrete
""",
    },
    {
        "slug": "mediator",
        "en": "Mediator",
        "zh": "中介者",
        "category": "behavioral",
        "metaphor": "聊天室前台：Alice、Bob、Carol 彼此不留电话，所有群消息和私信都交给前台转发。加人、禁言、改规则只改前台一处。",
        "roles": [
            ("前台", "ChatRoom 中介者"),
            ("同事", "User，只持有中介引用"),
            ("交互", "广播 / 私信都经中介"),
        ],
        "mermaid": """
flowchart TB
    room["聊天室前台 ChatRoom"]
    alice["Alice"]
    bob["Bob"]
    carol["Carol"]
    alice <-->|"只跟前台说"| room
    bob <-->|"只跟前台说"| room
    carol <-->|"只跟前台说"| room
    note["用户之间没有连线 全部解耦"]
    room -.-> note
    class room hub
    class alice,bob,carol concrete
    class note extra
""",
    },
    {
        "slug": "memento",
        "en": "Memento",
        "zh": "备忘录",
        "category": "behavioral",
        "metaphor": "编辑器把这一刻的正文和光标封进时间胶囊。历史管理员只负责把胶囊堆起来、按撤销交回去，从不拆开偷看 —— 封装不被破坏。",
        "roles": [
            ("编辑器", "TextEditor 发起人，唯二能读写胶囊"),
            ("时间胶囊", "EditorMemento 不可变快照"),
            ("历史管理员", "History，只压栈出栈"),
        ],
        "mermaid": """
flowchart LR
    editor["编辑器 Originator"]
    capsule["时间胶囊 Memento 内容对外不透明"]
    hist["历史管理员 只保管不拆开"]
    editor -->|"save 封存"| capsule
    capsule --> hist
    hist -->|"undo 交回未拆的胶囊"| editor
    peek["管理员拆开偷看"]
    hist --x peek
    class editor concrete
    class capsule extra
    class hist shared
    class peek client
""",
    },
    {
        "slug": "observer",
        "en": "Observer",
        "zh": "观察者",
        "category": "behavioral",
        "metaphor": "气象站一更新读数，所有挂着的面板自动刷新。统计面板中途拔掉天线，后面的广播就不再找它，其余面板不受影响。",
        "roles": [
            ("气象站", "WeatherStation 主题"),
            ("面板", "实时 / 统计 / 预报 观察者"),
            ("订阅关系", "attach / detach / notify"),
        ],
        "mermaid": """
flowchart TB
    station["气象站 Subject 采集温湿度气压"]
    live["实时状况面板"]
    stats["统计面板"]
    forecast["预报面板"]
    station ==>|"notify 广播"| live
    station ==>|"notify 广播"| stats
    station ==>|"notify 广播"| forecast
    stats -.->|"中途 detach 不再接收"| station
    class station hub
    class live,stats,forecast concrete
""",
    },
    {
        "slug": "state",
        "en": "State",
        "zh": "状态",
        "category": "behavioral",
        "metaphor": "同一颗暂停键：播放中按下就暂停，停止中按下则无效。播放器没有满屏 if-else，而是把「这个状态下该干什么」交给当前状态对象。",
        "roles": [
            ("播放器", "AudioPlayer 上下文，委托当前状态"),
            ("三态", "Stopped / Playing / Paused"),
            ("转换", "状态对象自己决定下一态"),
        ],
        "mermaid": """
flowchart TB
    key[/按下暂停键/]
    player["AudioPlayer 上下文"]
    cur{{"当前状态对象"}}
    key ==> player
    player ==> cur
    cur -->|"停止中"| stopped["暂停无效 仍停止"]
    cur -->|"播放中"| paused["切到暂停态"]
    cur -->|"已暂停"| playing["切回播放态"]
    class key,player client
    class cur abs
    class stopped extra
    class paused,playing concrete
""",
        "mermaid_extra": """
stateDiagram-v2
    [*] --> Stopped
    Stopped --> Playing: play
    Playing --> Paused: pause
    Paused --> Playing: play
    Playing --> Stopped: stop
    Paused --> Stopped: stop
    Stopped --> Stopped: pause 无效
""",
    },
    {
        "slug": "strategy",
        "en": "Strategy",
        "zh": "策略",
        "category": "behavioral",
        "metaphor": "收银台插卡：购物车不关心怎么扣款，结账时插入信用卡、PayPal 或加密货币策略卡。用户在结算页改选，算法当场替换。",
        "roles": [
            ("购物车", "ShoppingCart 上下文"),
            ("卡槽", "PaymentStrategy 可替换算法"),
            ("策略卡", "CreditCard / PayPal / Crypto"),
        ],
        "mermaid": """
flowchart TB
    user["顾客结账"]
    cart["购物车 Context"]
    slot{{"当前支付策略卡槽"}}
    cc["信用卡策略"]
    pp["PayPal 策略"]
    crypto["加密货币策略"]
    user ==> cart
    cart ==> slot
    slot -->|"可运行时替换"| cc
    slot -->|"可运行时替换"| pp
    slot -->|"可运行时替换"| crypto
    class user,cart client
    class slot abs
    class cc,pp,crypto concrete
""",
    },
    {
        "slug": "template-method",
        "en": "Template Method",
        "zh": "模板方法",
        "category": "behavioral",
        "metaphor": "冲泡饮料的菜谱骨架写死：烧水 → 冲泡 → 倒杯 → 是否加料。茶放茶叶加柠檬，咖啡放咖啡粉加糖奶，黑咖啡用钩子跳过加料。流程顺序谁也不能改。",
        "roles": [
            ("菜谱骨架", "Beverage.prepare 模板方法"),
            ("可变步骤", "_brew / _add_condiments"),
            ("钩子", "_wants_condiments，黑咖啡返回否"),
        ],
        "mermaid": """
flowchart TB
    start([prepare 模板骨架 顺序固定])
    boil["烧水 固定步骤"]
    brew{"冲泡 子类实现"}
    pour["倒杯 固定步骤"]
    hook{"要加料吗 钩子"}
    teaBrew["茶：浸泡茶叶"]
    coffeeBrew["咖啡：冲泡咖啡粉"]
    lemon["加柠檬"]
    milkSugar["加糖奶"]
    done([完成])
    start --> boil --> brew
    brew --> teaBrew --> pour
    brew --> coffeeBrew --> pour
    pour --> hook
    hook -->|"茶 / 咖啡 是"| lemon
    hook -->|"茶 / 咖啡 是"| milkSugar
    hook -->|"黑咖啡 否"| done
    lemon --> done
    milkSugar --> done
    class start,boil,pour abs
    class brew,hook extra
    class teaBrew,coffeeBrew,lemon,milkSugar concrete
    class done client
""",
    },
    {
        "slug": "visitor",
        "en": "Visitor",
        "zh": "访问者",
        "category": "behavioral",
        "metaphor": "图形园的种类很少变（圆、矩形），但巡检工作经常加：今天来面积员，明天来画师，后天新增周长员。图形只负责开门（accept），工具箱在访问者身上 —— 双重分派。",
        "roles": [
            ("图形园", "Circle / Rectangle，元素稳定"),
            ("开门", "accept 第一次分派"),
            ("巡检员", "Area / Draw / Perimeter，操作可增长"),
        ],
        "mermaid": """
flowchart LR
    caller["客户端带着访问者进园"]
    subgraph park ["图形园 元素类型稳定"]
        circle["圆 accept"]
        rect["矩形 accept"]
    end
    subgraph inspectors ["巡检员 操作可增长"]
        area["面积员 visit_circle / visit_rectangle"]
        draw["画师"]
        peri["周长员 新增操作"]
    end
    caller --> circle
    caller --> rect
    circle -->|"双重分派"| area
    circle --> draw
    circle --> peri
    rect --> area
    rect --> draw
    rect --> peri
    class caller client
    class circle,rect concrete
    class area,draw,peri extra
    style park fill:#CDF4D3,stroke:#3E9B4B
    style inspectors fill:#FFE0C2,stroke:#EB7500
""",
    },
]

CATEGORY_TITLE = {
    "creational": "创建型（Creational）— 关注对象怎么被造出来",
    "structural": "结构型（Structural）— 关注对象怎么被组装",
    "behavioral": "行为型（Behavioral）— 关注对象怎么互相说话",
}

SECTION_MARKER = "<!-- gof-architecture-diagram -->"


def wrap_mermaid(source: str) -> str:
    body = source.strip()
    if body.startswith("stateDiagram"):
        return "```mermaid\n" + body + "\n```"
    lines = body.splitlines()
    body = "\n".join([lines[0], STYLE.rstrip(), *lines[1:]])
    return "```mermaid\n" + body + "\n```"


def mermaid_block(pattern: dict) -> str:
    blocks = [wrap_mermaid(pattern["mermaid"])]
    extra = pattern.get("mermaid_extra")
    if extra:
        blocks.append(wrap_mermaid(extra))
    return "\n\n".join(blocks)


def role_table(pattern: dict) -> str:
    rows = ["| 图中角色 | 本仓库示例 |", "|---------|-----------|"]
    for role, example in pattern["roles"]:
        rows.append(f"| {role} | {example} |")
    return "\n".join(rows)


def pattern_section(pattern: dict, heading: str = "##") -> str:
    title = f"{heading} {pattern['en']} {pattern['zh']}"
    return "\n".join(
        [
            title,
            "",
            f"> **生活类比**：{pattern['metaphor']}",
            "",
            mermaid_block(pattern),
            "",
            role_table(pattern),
            "",
        ]
    )


def architecture_section_for_readme(pattern: dict) -> str:
    return "\n".join(
        [
            SECTION_MARKER,
            "## 架构图",
            "",
            f"> **生活类比**：{pattern['metaphor']}",
            "",
            mermaid_block(pattern),
            "",
            role_table(pattern),
            "",
            f"23 张图的完整图鉴见 [`docs/README.md`](../../docs/README.md#{pattern['slug']}-{pattern['zh']})。",
            "",
            "",
        ]
    )


def write_docs_gallery() -> None:
    docs = ROOT / "docs"
    docs.mkdir(exist_ok=True)
    parts: list[str] = [
        "# GoF 设计模式 · 形象架构图",
        "",
        "用生活场景把 23 个模式画成架构图。每张图对应本仓库可运行示例里的角色，",
        "而不是抽象的 UML 类框 —— 先看懂「这像什么」，再去对照各语言实现。",
        "",
        "## 怎么看这些图",
        "",
        "| 颜色 | 含义 |",
        "|------|------|",
        "| 蓝色 | 客户端 / 调用方 |",
        "| 紫色 | 抽象接口 / 骨架 / 固定步骤 |",
        "| 绿色 | 具体实现 / 产品 / 叶子 |",
        "| 橙色 | 转换、包装、额外职责、可变步骤 |",
        "| 黄色 / 青色 | 共享、唯一、中枢、仓库 |",
        "",
        "各语言目录下每个模式的 `README.md` 也嵌入了对应的图，打开即可对照。",
        "",
        "## 目录",
        "",
    ]
    current_cat = None
    for p in PATTERNS:
        if p["category"] != current_cat:
            if current_cat is not None:
                parts.append("")
            current_cat = p["category"]
            parts.append(f"### {CATEGORY_TITLE[current_cat]}")
            parts.append("")
        parts.append(f"- [{p['en']} {p['zh']}](#{p['slug']}-{p['zh']})")
    parts.append("")

    current_cat = None
    for p in PATTERNS:
        if p["category"] != current_cat:
            current_cat = p["category"]
            parts.append(f"## {CATEGORY_TITLE[current_cat]}")
            parts.append("")
        parts.append(pattern_section(p, heading="###"))
    (docs / "README.md").write_text("\n".join(parts).rstrip() + "\n", encoding="utf-8")


def embed_into_pattern_readmes() -> int:
    by_slug = {p["slug"]: p for p in PATTERNS}
    updated = 0
    for lang in LANGS:
        lang_dir = ROOT / lang
        if not lang_dir.is_dir():
            continue
        for slug, pattern in by_slug.items():
            readme = lang_dir / slug / "README.md"
            if not readme.is_file():
                continue
            text = readme.read_text(encoding="utf-8")
            section = architecture_section_for_readme(pattern)
            if SECTION_MARKER in text:
                # Replace existing generated section up to the next heading after it,
                # or rebuild from marker to 适用场景.
                pre, rest = text.split(SECTION_MARKER, 1)
                if "## 适用场景" in rest:
                    rest = "## 适用场景" + rest.split("## 适用场景", 1)[1]
                    text = pre.rstrip() + "\n\n" + section + rest
                else:
                    text = pre.rstrip() + "\n\n" + section
            elif "## 适用场景" in text:
                pre, post = text.split("## 适用场景", 1)
                text = pre.rstrip() + "\n\n" + section + "## 适用场景" + post
            else:
                continue
            readme.write_text(text, encoding="utf-8")
            updated += 1
    return updated


def patch_root_readme() -> None:
    readme = ROOT / "README.md"
    text = readme.read_text(encoding="utf-8")
    block = """\
## 形象架构图

每个模式都配有一张「生活类比」架构图（气象站广播、咖啡加料、审批公章接力……），
而不是抽象 UML 类图。

- 图鉴总览：[`docs/README.md`](docs/README.md)
- 各语言下每个模式的 `README.md` 在「意图」之后也嵌入了同一张图，打开即可对照代码。

"""
    marker = "## 形象架构图"
    if marker in text:
        # replace until next ##
        import re

        text = re.sub(
            r"## 形象架构图\n.*?(?=\n## )",
            block,
            text,
            count=1,
            flags=re.S,
        )
    else:
        needle = "## 语言与运行方式"
        if needle not in text:
            raise SystemExit("root README missing expected heading")
        text = text.replace(needle, block + needle, 1)
    readme.write_text(text, encoding="utf-8")


def patch_language_indexes() -> None:
    extra = (
        "每个模式 README 在「意图」之后都有一张形象架构图；"
        "23 张图的图鉴见 [`../docs/README.md`](../docs/README.md)。\n"
    )
    for lang in LANGS:
        path = ROOT / lang / "README.md"
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        if "形象架构图" in text:
            continue
        needle = None
        for candidate in ("## 模式一览", "## 模式索引", "## 统一运行方式", "## 统一约定", "## 运行方式"):
            if candidate in text:
                needle = candidate
                break
        if needle is None:
            # fall back to the first markdown heading after the title
            import re

            m = re.search(r"\n## ", text)
            if not m:
                continue
            needle = text[m.start() + 1 : text.find("\n", m.start() + 1)]
        text = text.replace(needle, extra + "\n" + needle, 1)
        path.write_text(text, encoding="utf-8")


def main() -> None:
    write_docs_gallery()
    n = embed_into_pattern_readmes()
    patch_root_readme()
    patch_language_indexes()
    print(f"Wrote docs/README.md and updated {n} pattern READMEs")


if __name__ == "__main__":
    main()
