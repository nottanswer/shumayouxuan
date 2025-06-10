Page({
  data: {
    productlist: [
      {'pid':1,'pname':'iPhone 15 Pro Max','price':9999,'num':10,'pic':'/images/iphone-15-pro-max - 副本.png','catalog':'手机','note':'处理器: Apple A17 Pro（3nm 制程）\n'+'屏幕: 6.7 英寸 Super Retina XDR OLED，120Hz ProMotion刷新率，2556×1179 分辨率\n'+
    '摄像头:主摄：4800 万像素（f/1.78，传感器位移防抖）,超广角：1200 万像素（f/2.2）,长焦：1200 万像素（5 倍光学变焦）\n'+
    '电池: 4422mAh，支持 27W 有线快充、15W MagSafe 无线充\n'+
    '存储: 256GB/512GB/1TB（无扩展）\n'+
    '系统: iOS 17\n'+
    '其他: 钛金属边框、Action 按键、USB-C 接口、IP68 防水\n'},

    {'pid':2,'pname':'三星 Galaxy S24 Ultra','price':9699,'num':10,'pic':'/images/三星 Galaxy S24 Ultra.avif','catalog':'手机','note':'处理器: 骁龙 8 Gen 3（4nm）\n'+
    '屏幕: 6.8 英寸 Dynamic AMOLED 2X，120Hz 刷新率，3088×1440 分辨率，峰值亮度 2500nit\n'+
    '摄像头:主摄：200MP（f/1.7，光学防抖,）超广角：12MP（f/2.2）,长焦：10MP（3 倍光变） + 50MP（5 倍光变）\n'+
    '电池: 5000mAh，45W 有线快充，15W 无线充\n'+
    '存储: 12GB+256GB/512GB/1TB（支持 microSD 扩展）\n'+
    '系统: One UI 6（基于 Android 14）\n'+
   ' 其他: S Pen 手写笔、钛金属机身、IP68、卫星通信'},

    {'pid':3,'pname':'华为 Mate 60 Pro','price':6999,'num':10,'pic':'/images/华为 Mate 60 Pro.jpg','catalog':'手机','note':'处理器: 麒麟 9000s（支持 5G，7nm 制程）\n'+
    '屏幕: 6.82 英寸 OLED 曲面屏，120Hz 刷新率，2720×1260 分辨率\n'+
    '摄像头:主摄：5000 万像素（f/1.4-f/4.0 可变光圈）,超广角：1200 万像素（f/2.2）,长焦：4800 万像素（3.5 倍光变）\n'+
    '电池: 5000mAh，88W 有线快充，50W 无线充\n'+
    '存储: 12GB+256GB/512GB/1TB（无扩展）\n'+
    '系统: HarmonyOS 4.0\n'+
    '其他: 北斗卫星消息、IP68、第二代昆仑玻璃'},

    {'pid':4,'pname':'小米 14 Ultra','price':6499,'num':10,'pic':'/images/小米 14 Ultra.jpg','catalog':'手机','note':'处理器: 骁龙 8 Gen 3\n'+
    '屏幕: 6.73 英寸 AMOLED 2K+，120Hz LTPO，3200×1440 分辨率\n'+
    '摄像头:主摄：5000 万像素（1 英寸 IMX989，f/1.6-f/4.0 可变光圈）,超广角：5000 万像素（f/1.8）, 长焦：5000 万像素（3.2 倍光变） + 5000 万像素（5 倍光变）\n'+
    '电池: 5300mAh，90W 有线快充，80W 无线充\n'+
    '存储: 12GB/16GB+256GB/512GB/1TB\n'+
    '系统: HyperOS（基于 Android 14）\n'+
    '其他: 双卫星通信、纳米素皮机身、IP68'},

    {'pid':5,'pname':'OPPO Find X7 Ultra','price':5999,'num':10,'pic':'/images/OPPO Find X7 Ultra - 副本.jpg','catalog':'手机','note':'处理器: 骁龙 8 Gen 3\n'+
    '屏幕: 6.82 英寸 2K AMOLED，120Hz LTPO，3168×1440 分辨率\n'+
    '摄像头:主摄：5000 万像素（LYT-900，1 英寸，f/1.8）, 超广角：5000 万像素（f/2.2）,长焦：5000 万像素（3 倍光变） + 5000 万像素（6 倍光变）\n'+
    '电池: 5000mAh，100W 有线快充，50W 无线充\n'+
    '存储: 12GB/16GB+256GB/512GB/1TB\n'+
    '系统: ColorOS 14（基于 Android 14）\n'+
    '其他: 哈苏影像调校、卫星通信IP68'},

    {'pid':6,'pname':'苹果 MacBook Pro 16英寸 (M2 Max)','price':24999,'num':10,'pic':'/images/苹果 MacBook Pro 16.jpg','catalog':'电脑','note':'处理器: Apple M2 Max（12核CPU + 38核GPU，4nm制程）\n'+
    '内存: 32GB/64GB 统一内存\n'+
    '存储: 1TB/2TB/4TB/8TB SSD\n'+
    '屏幕: 16.2英寸 Liquid Retina XDR（3456×2234分辨率，120Hz ProMotion，1000nit持续亮度，1600nit峰值）\n'+
    '续航: 22小时视频播放，100W快充\n'+
    '接口: 3×雷电4 (USB-C) + HDMI + SDXC卡槽 + MagSafe 3\n'+
    '系统: macOS Ventura\n'+
    '重量: 2.15kg\n'+
    '特点: Mini-LED屏幕、六扬声器、无风扇静音设计、专业级创作性能\n'+
    '适用人群: 视频剪辑师、设计师、程序员'},

    {'pid':7,'pname':'华为 MateBook X Pro 2023','price':9999,'num':10,'pic':'/images/华为 MateBook X Pro 2023 - 副本.jpg','catalog':'电脑','note':'处理器: 第13代酷睿i7-1360P（12核16线程）\n'+
    '内存: 16GB/32GB LPDDR5\n'+
    '存储: 1TB/2TB PCIe 4.0 SSD\n'+
    '屏幕: 14.2英寸 3.1K触控屏（3120×2080，90Hz，100% P3色域）\n'+
    '显卡: Intel Iris Xe 核显;续航: 12小时办公，支持65W快充（1小时充80%）\n'+
    '接口: 2×雷电4 (USB-C) + 1×USB-A 3.2\n'+
    '系统: Windows 11 + 华为多屏协同\n'+
    '重量: 1.38kg\n'+
    '特点: 超薄金属机身、压感触控板、超级终端互联（手机/平板一碰传）\n'+
    '适用人群: 商务人士、轻办公用户'},

    {'pid':8,'pname':'联想拯救者 Y9000P 2023','price':19999,'num':10,'pic':'/images/联想拯救者 Y9000P 2023 - 副本.jpg','catalog':'电脑','note':'处理器: 英特尔酷睿i9-13900HX（24核32线程）\n'+
    '内存: 16GB/32GB DDR5 5600MHz（可扩展至64GB）\n'+
    '存储: 1TB PCIe 4.0 SSD（双M.2插槽）\n'+
    '屏幕: 16英寸 2.5K IPS（2560×1600，240Hz刷新率，100% sRGB）\n'+
    '显卡: NVIDIA RTX 4090 Laptop（16GB GDDR6）\n'+
    '散热: 双风扇+VC均热板+液态金属导热\n'+
    '续航: 80Wh电池（支持140W PD快充）\n'+
    '接口: 2×雷电4 + 3×USB-A 3.2 + HDMI 2.1 + RJ45网口\n'+
    '系统: Windows 11;重量: 2.53kg\n'+
    '特点: 超频模式、RGB背光键盘、独显直连切换\n'+
    '适用人群: 游戏玩家、3D建模/渲染工作者'},

    {'pid':9,'pname':'华硕 ROG 幻16 Air','price':14999,'num':10,'pic':'/images/华硕 ROG 幻16 Air - 副本.png','catalog':'电脑','note':'处理器: AMD Ryzen 9 7940HS（8核16线程，Zen4架构）\n'+
    '内存: 32GB LPDDR5X（板载不可扩展）\n'+
    '存储: 2TB PCIe 5.0 SSD\n'+
    '屏幕: 16英寸 2.8K OLED（2880×1800，120Hz，100% DCI-P3，HDR True Black 600认证）\n'+
    '显卡: NVIDIA RTX 4070 Laptop（8GB GDDR6）\n'+
    '续航: 90Wh电池（支持100W PD充电）\n'+
    '接口: 2×USB4（Type-C）+ 2×USB-A 3.2 + HDMI 2.1\n'+
    '系统: Windows 11\n'+
    '重量: 1.95kg\n'+
    '特点: 超窄边框、潘通色彩认证、180°开合设计\n'+
    '适用人群: 内容创作者、兼顾便携与性能的用户'},

    
    {'pid':10,'pname':'戴尔 XPS 13 Plus','price':12999,'num':10,'pic':'/images/戴尔 XPS 13 Plus - 副本.jpg','catalog':'平板','note':'处理器: 第13代酷睿i7-1360P\n'+
    '内存: 16GB/32GB LPDDR5\n'+
    '存储: 512GB/1TB/2TB PCIe 4.0 SSD\n'+
    '屏幕: 13.4英寸 4K触控屏（3840×2400，100% Adobe RGB，Dolby Vision）\n'+
    '显卡: Intel Iris Xe 核显\n'+
    '续航: 12小时（4K屏）/ 18小时（FHD+屏）\n'+
    '接口: 2×雷电4（USB-C，无传统USB-A接口）\n'+
    '系统: Windows 11\n'+
    '重量: 1.26kg\n'+
    '特点: 无边框键盘、隐藏式触控板、碳纤维掌托\n'+
    '适用人群: 高端商务用户、追求极致轻薄的设计师'},

    {'pid':11,'pname':'苹果 AirPods Pro（第二代）','price':1899,'num':10,'pic':'/images/苹果 AirPods Pro - 副本.jpg','catalog':'耳机','note':'类型: 真无线降噪耳机\n'+'降噪: 主动降噪（ANC）+ 自适应通透模式\n'+
    '驱动单元: 定制高振幅动圈单元\n'+
    '续航: 单次6小时（降噪开）/ 总续航30小时（含充电盒）\n'+
    '防水等级: IPX4（抗汗抗水）\n'+
    '其他功能:H2芯片（支持空间音频、头部追踪） MagSafe无线充电 自适应EQ调音\n'+
    '适用场景: 苹果生态用户、通勤/日常降噪'},

    {'pid':12,'pname':'索尼 WH-1000XM5','price':2599,'num':10,'pic':'/images/索尼 WH-1000XM5.png','catalog':'耳机','note':'类型: 头戴式无线降噪耳机\n'+
    '降噪: 双芯片驱动（V1 + QN1），AI环境声控制\n'+
    '驱动单元: 30mm 碳纤维复合振膜\n'+
    '续航: 30小时（降噪开，支持3分钟快充续航3小时）\n'+
    '无线协议: LDAC、蓝牙5.2\n'+
    '其他功能: 360临场音效（支持Hi-Res Audio）,多点连接（同时连两台设备）,触控面板+智能免摘对话\n'+
    '适用场景: 长途旅行、音质/降噪双需求'},
    {'pid':13,'pname':' Bose QuietComfort消噪耳塞','price':2299,'num':10,'pic':'/images/Bose QuietComfort - 副本.jpg','catalog':'耳机','note':'类型: 真无线降噪耳机\n'+
    '降噪: 自适应当降噪（CustomTune技术）\n'+
    '驱动单元: 动态音质均衡技术\n'+
    '续航: 单次6小时（降噪开）/ 总续航24小时（含充电盒）\n'+
    '防水等级: IPX4\n'+
    '其他功能: 鲨鱼鳍耳套（防脱落设计）支持无线充电,通透模式可调节等级\n'+
    '适用场景: 运动爱好者、注重佩戴舒适性 '},

    {'pid':14,'pname':'森海塞尔 IE 900','price':9999,'num':10,'pic':'/images/森海塞尔 IE 900.jpg','catalog':'耳机','note':'类型: 入耳式Hi-Fi耳机\n'+
    '驱动单元: 专有X3R超宽频换能器（单动圈三腔吸声系统）\n'+
    '阻抗: 16Ω（易驱动）\n'+
    '频响范围: 5Hz-48kHz（超宽频）\n'+
    '线材: 可拆卸3.5mm/2.5mm/4.4mm镀银无氧铜线\n'+
    '其他功能:航天级铝合金外壳 ,人体工学佩戴设计 ,原厂提供7种耳塞尺寸适配\n'+
    '场景: 专业音乐人、发烧友级音质追求者'},
    {'pid':15,'pname':'华为 FreeBuds Pro 3','price':1499,'num':10,'pic':'/images/华为 FreeBuds Pro 3 - 副本.jpg','catalog':'耳机','note':'类型: 真无线降噪耳机\n'+
    '降噪: 智能动态降噪2.0（最大降噪深度50dB）\n'+
    '驱动单元: 双磁路动圈 + 超高频微平板单元\n'+
    '续航: 单次7小时（降噪关）/ 总续航31小时（含充电盒）\n'+
    '无线协议: 星闪连接（NearLink，低延迟+高抗干扰）\n'+
    '其他功能:空间音频（头部追踪）双设备连接（鸿蒙/安卓/iOS通用）IP54防尘防水\n'+
    '适用场景: 华为设备用户、多场景降噪需求'},
    {'pid':16,'pname':'罗技 G Pro X Superlight','price':1299,'num':10,'pic':'/images/罗技 G Pro X Superlight - 副本.jpg','catalog':'鼠标','note':'传感器: HERO 25K（最高25,600 DPI，零延迟追踪）\n'+
    '重量: 63g（超轻量化设计）\n'+
    '连接方式: 2.4GHz无线 + Lightspeed低延迟技术\n'+
    '续航: 70小时（关闭RGB），支持USB-C快充\n'+
    '按键: 5个可编程按键（欧姆龙机械微动）\n'+
    '材质: 哑光涂层 + PTFE脚贴\n'+
    '特点: 对称式设计（左右手通用）、支持PowerPlay无线充电\n'+
    '适用场景: FPS/MOBA电竞玩家、追求轻量化的专业用户'},
    {'pid':17,'pname':'雷蛇 毒蝰 V3 Pro','price':1199,'num':10,'pic':'/images/雷蛇 毒蝰 V3 Pro.jpg','catalog':'鼠标','note':'传感器: Focus Pro 30K（30,000 DPI，智能追踪校准）\n'+
    '重量: 54g（蜂窝镂空外壳）\n'+
    '连接方式: 2.4GHz无线 + HyperSpeed技术\n'+
    '续航: 90小时（无RGB）\n'+
    '按键: 6个可编程按键（光学微动，0.2ms响应）\n'+
    '材质: 防滑侧裙 + 超柔伞绳线（有线模式备用）\n'+
    '特点: 非对称人体工学（右手专用）、4KHz轮询率（需单独接收器）\n'+
    '适用场景: 职业电竞选手、高强度竞技玩家'},
    {'pid':18,'pname':'微软 Surface Precision','price':799,'num':10,'pic':'/images/微软 Surface Precision.jpg','catalog':'鼠标','note':'传感器: 蓝影追踪（支持玻璃/金属表面）\n'+
    '连接方式: 蓝牙 + 2.4GHz无线\n'+
    '续航: 3个月（单节AA电池）\n'+
    '按键: 6键自定义（含横向滚轮）\n'+
    '材质: 金属滚轮 + 类肤涂层\n'+
    '特点: 多设备切换（同时连接3台设备）、支持Surface Dial兼容\n'+
    '适用场景: 多屏办公用户、设计师（精准滚轮操控'},

    {'pid':19,'pname':'罗技 MX Master 3S','price':899,'num':10,'pic':'/images/罗技 MX Master 3S.jpg','catalog':'鼠标','note':'传感器: Darkfield 4000 DPI（任意表面追踪）\n'+
    '连接方式: 蓝牙 + Bolt USB接收器\n'+
    '续航: 70天（USB-C快充1分钟用3小时)\n'+
    '按键: 7键自定义（电磁滚轮 + 拇指手势键）\n'+
    '特点:无极滚轮（金属材质，支持自动切换）跨设备文件传输（Flow技术，Win/Mac多系统互通）\n'+
    '适用场景: 程序员、视频剪辑师（高效多任务操作)'},

    {'pid':20,'pname':'雷柏 VT9 Pro','price':299,'num':10,'pic':'/images/雷柏 VT9 Pro.webp','catalog':'鼠标','note':'传感器: 原相PAW3395（26,000 DPI）\n'+
    '重量: 68g\n'+
    '连接方式: 2.4GHz无线/蓝牙/有线三模\n'+
    '续航: 160小时（关闭RGB）\n'+
    '按键: 8键可编程（欧姆龙微动，5,000万次寿命）\n'+
    '特点:支持4KHz回报率（需单独接收器）可更换磁吸侧键（左手/右手模式）\n'+
    '适用场景: 预算有限的游戏玩家、多平台用户'},

    {'pid':21,'pname':'斐尔可（FILCO）圣手三代 104键','price':1099,'num':10,'pic':'/images/斐尔可（FILCO）圣手三代 104键.jpg','catalog':'键盘','note':'轴体可选: 樱桃MX红轴/茶轴/青轴键帽\n'+
    '材质: PBT双色注塑（耐磨抗油光）\n'+
    '连接方式: 有线（USB-C接口）\n'+
    '布局: 标准104键（全尺寸）\n'+
    '特点:钢板加固结构（敲击稳定）全键无冲设计o经典窄边框设计（简约风格）\n'+
    '适用场景: 程序员、文字工作者（长时打字舒适）'},

    {'pid':22,'pname':'罗技 G Pro X TK','price':1299,'num':10,'pic':'/images/罗技 G Pro X TKL.jpg','catalog':'键盘','note':'轴体可选: GL 矮轴（红轴/青轴，支持热插拔更换）\n'+
    '连接方式: 有线（USB-C） + 2.4GHz无线（Lightspeed技术）\n'+
    '布局: 87键紧凑型（TKL）\n'+
   ' RGB灯光: 每键独立可编程\n'+
   '其他功能:可拆卸磁吸腕托 板载内存（保存5组配置文件）\n'+
   '特点: 超低延迟（1ms响应），航空级铝合金框架\n'+
   '适用场景: 电竞玩家、追求便携的极客用户'},

    {'pid':23,'pname':'阿米洛（Varmilo）静电容V2系列','price':899,'num':10,'pic':'/images/jianpan.jpg','catalog':'键盘','note':'轴体类型: 静电容轴（45g压力克数，类红轴手感）\n'+
    '键帽材质: 五面热升华PBT（主题定制图案）\n'+
    '连接方式: 有线（USB-C）+ 蓝牙5.0;布局: 108键（带独立多媒体按键）\n'+
    '特点:全键无冲 + 防泼溅设计,内置吸音棉（减少空腔音）支持Mac/Windows双系统切换\n'+
    '适用场景:设计师、文艺创作者（颜值与手感兼备）'},

    {'pid':24,'pname':'Keychron Q3 Pro Max','price':799,'num':10,'pic':'/images/Keychron Q3 Pro Max - 副本.jpg','catalog':'键盘','note':'轴体可选: 佳达隆G Pro 3.0（红/茶/黄轴） + 热插拔PCBl\n'+
    '结构: Gasket Mount（硅胶垫片减震）\n'+
    '材质: 全CNC铝合金外壳（2.5kg重量）\n'+
    '连接方式: 三模（有线/蓝牙/2.4GHz）\n'+
    'RGB灯光: 下灯位设计（支持VIA改键）\n'+
    '其他功能:旋钮编码器（音量/亮度调节）支持QMK/VIA开源改键\n'+'适用场景: 键盘发烧友、客制化DIY玩家'},

    {'pid':25,'pname':'雷蛇黑寡妇蜘蛛V4 75%','price':1199,'num':10,'pic':'/images/lei.jpg','catalog':'键盘','note':'轴体类型: 雷蛇第三代绿轴（段落感，1.2mm触发）\n'+
    '连接方式: 有线（USB-C编织线）\n'+
    '布局: 75%配列（84键，独立方向键）\n'+
    '特色功能:双侧RGB灯带（支持雷云同步）,多功能数字旋钮（游戏快捷操作）,磁吸人造皮革腕托\n'+
    '其他参数: 8,000Hz轮询率（超低延迟）\n'+
    '适用场景: MOBA/MMO网游玩家（快捷操作优化）'},

    {'pid':26,'pname':'微软 Xbox Elite 无线手柄二代','price':1399,'num':10,'pic':'/images/微软 Xbox Elite 无线手柄二代.jpg','catalog':'手柄','note':'兼容平台: PC、Xbox Series X/S、Xbox One\n'+
    '连接方式: 蓝牙 + 2.4GHz无线 + USB-C有线\n'+
    '电池续航: 40小时（可更换电池）\n'+
    '按键自定义:4个背键（磁吸设计）,3组摇杆（可更换高度/形状）,2组十字键（磁吸圆盘/8方向）\n'+
    '特色功能:摇杆灵敏度调节（0-100%线性）扳机键三段行程（可锁短行程） 支持配置文件快速切换\n'+
    '适用场景: 竞技游戏玩家、专业级操控需求'},

    {'pid':27,'pname':'索尼 PlayStation DualSense','price':599,'num':10,'pic':'/images/索尼 PlayStation DualSense.webp','catalog':'手柄','note':'兼容平台: PS5、PC（需驱动支持）\n'+
    '连接方式: USB-C有线 + 蓝牙\n'+
    '电池续航: 约12小时\n'+
    '特色功能:自适应扳机键（支持不同阻力反馈）触觉反馈（精准震动模拟不同场景） 内置麦克风 + 扬声器（支持语音通话）\n'+
    '其他参数: 陀螺仪/加速度计（支持体感操作）\n'+
    '适用场景: PS5玩家、沉浸式游戏体验追求者;'},

    {'pid':28,'pname':' 任天堂 Switch Pro','price':459,'num':10,'pic':'/images/任天堂 Switch Pro 手柄.jpg','catalog':'手柄','note':'兼容平台: Switch、PC（蓝牙/有线）\n'+
    '连接方式: USB-C有线 + 蓝牙\n'+
    '电池续航: 约40小时\n'+
    '特色功能:HD震动（细腻场景反馈） 红外摄像头（仅支持部分游戏）支持NFC（Amiibo读取）\n'+
    '其他参数: 对称式摇杆布局、类Xbox手柄握感\n'+
    '适用场景: Switch玩家、PC/Steam游戏兼容用户'},

    {'pid':29,'pname':'雷蛇 Wolverine V2 Pro','price':1599,'num':10,'pic':'/images/雷蛇 Wolverine V2 Pro.jpg','catalog':'手柄','note':'兼容平台: PC、PS5/PS4（通过切换模式）\n'+
    '连接方式: 2.4GHz无线 + USB-C有线\n'+
    '电池续航: 约28小时\n'+
    '按键自定义: 6个额外背键（可编程）,可更换摇杆帽（3种高度）,机械按键（0.65mm超短触发）\n'+
    '特色功能:3组配置文件快速切换oRGB灯效（雷云同步）,扳机锁（短键程射击模式）\n'+
    '适用场景: FPS电竞选手、高精度操作需求'},

    {'pid':30,'pname':'八位堂 8BitDo Pro 2','price':899,'num':10,'pic':'/images/八位堂 8BitDo Pro 2 - 副本.jpg','catalog':'手柄','note':'兼容平台: Switch、PC、Android、iOS、Steam\n'+
    '连接方式: 蓝牙/2.4GHz无线 + USB-C有线\n'+
    '电池续航: 约20小时\n'+
    '特色功能:双背键（可自定义）,支持宏编程（通过手机App）,复古十字键设计（街机游戏优化）\n'+
    '其他参数: 对称式布局、握持感舒适适用场景: 多平台用户、怀旧游戏玩家'},
    ],
    pd1: null,
    pd2: null
  },

  // 处理选择器变化（使用 ES5 语法）
  handlePickerChange: function (e) {
    var field = e.currentTarget.dataset.field;
    var index = parseInt(e.detail.value, 10);
    var selectedProduct = this.data.productlist[index];

    var updateData = {};
    updateData[field] = selectedProduct;
    this.setData(updateData);
  },

  // 规格说明拆分为键值对数组
  splitNotes: function (notes) {
    if (!notes || typeof notes !== 'string') return [];
    // 修改分隔符为换行符 \n
    return notes.split('\n').map(function (item) {
      var parts = item.split(':');
      return {
        key: parts[0] ? parts[0].trim() : '',
        value: parts[1] ? parts[1].trim().replace(/;/g, '\n• ') : '' // 把分号转换为换行符+项目符号
      };
    });
  }
});
