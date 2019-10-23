## WEB组态
基于vue+quasar的web组态，核心代码基于vue，quasar仅仅是为了方便构建

## 功能清单
| 功能 | 状态 | 
| -  | -: | 
| 面板标尺 | 完成 |
| 拖曳添加组件 | 完成 |
| 位置移动-鼠标 | 完成 |
| 位置移动-方向键 | 完成 |
| 位置移动-批量 | 完成 |
| 拖动位置磁性吸附 | 未完成 |
| 尺寸锚点（8个） | 完成 |
| 旋转锚点 | 未完成 |
| 选中效果 | 完成 |
| 层叠控制 | 完成 |
| 面板比例缩放 | 完成 |
| CTRL+C/V复制黏贴 | 完成 |
| CTRL+A多选 | 完成 |
| 鼠标框选 | 完成 |
| DELETE删除（支持删除多个） | 完成 |
| 样式配置（文字、大小、位置、边框、颜色、旋转） | 完成 |
| 组件继承体系 | 完成 |
| DOM组件（文字、图片） | 完成 |
| canvas组件（圆形、三角形、矩形、线条、箭头线条） | 完成 |
| 折线箭头 | 未完成 |
| echarts组件 | 完成 |
| SVG组件 | 完成 |
| 组件同步/异步数据加载 | 完成 |
| 通讯机制-事件总线 | 完成 |
| 通讯机制-VUEX | 未开始 |
| 事件总线-WebSocket | 未开始 |
| 事件总线-MQTT | 未开始 |
| VUEX-WebSocket | 未开始 |
| VUEX-MQTT | 未开始 |


## 高级功能
| 功能 | 状态 | 
| -  | -: | 
| 批量编辑属性 | 未完成 |
| 对齐工具 | 未完成 |
| 撤销和反撤销 | 未完成 |
| 容器组件 | 未完成 |
| 动画 | 未完成 |

## 如何拓展控件
1. 定义数据文件（参见 \src\components\topo\data-toolbox下的json文件）
2. 新增控件，根据数据文件的数据自己实现显示方式（在\src\components\topo\control下新增控件，继承组件，可参考其他组件实现方式，整个思想就是利用第一步的数据绘制dom节点或canvas图像）
3. 注册控件到工具栏（在TopoToolbox.vue中）
4. 注册控件到工作界面（在TopoMain.vue中）
5. 注册界面到渲染界面（这一步可选，在TopoRender.vue中）  
其实整体思想很简单，就是定义一些数据，然后自己新增vue组件根据这些数据控制渲染和行为，其他的一些组态编辑操作是公共的。

## 组件和服务器通讯
3种机制：独立http、VUEX、事件总线（基于一个消息中心，订阅和发布消息的模式）
### 独立通讯-http
每个组件独立使用http接口和定时器实现，适用于少量组件的应用（组件太多会导致过多连接和定时器）
### 通讯机制-事件总线-演示
参见/src/assets/libs/simpleEventBus.js和ViewRect.vue组件的演示代码（直接进入预览可看见矩形变色）
### 通知机制-VUEX-演示
未开始
### VUEX通讯-WebSocket
未开始
### VUEX通讯-MQTT
未开始
### 事件总线-WebSocket
准备中
### 事件总线-MQTT
未开始


## 构建过程[更新]
- 安装NodeJs
- 安装vue-cli：npm install -g @vue/cli
- 安装quasar-cli：npm install -g @quasar/cli  
** 如果之前有安装过，可以先卸载
npm uninstall -g vue-cli
npm uninstall -g quasar-cli  
** 建议使用cnpm安装

### 运行开发服务器(使用默认主题)
$ quasar dev
### 运行开发服务器(使用特定主题)
$ quasar dev -t mat
$ quasar dev -t ios
### 运行在特定端口
$ quasar dev -p 9090
### PWA模式
$ quasar dev -m pwa
### 手机App
$ quasar dev -m cordova -T [android|ios] -t [mat|ios]
### Electron应用
$ quasar dev -m electron
### 使用iOS主题...
$ quasar dev -m electron -t ios

## 如何打包
1. 编辑quasar.conf.js下的publicPath，修改为实际的名称
2. 去编译后的dist文件夹将文件拷贝到web服务器即可
3. 目前publicPath默认为WebTopo，所以构建后访问http://127.0.0.1/WebTopo/即可  
注意：由于VUE使用history模式，使用nginx等服务器需要解决路径404问题（本项目只有2个url）


## 运行截图
![avatar](/doc/shot.png)
