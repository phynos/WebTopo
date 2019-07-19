## WEB组态
基于vue+quasar的web组态，核心代码基于vue，quasar仅仅是为了方便构建

## 功能清单
| 功能 | 状态 | 
| -  | -: | 
| 面板标尺 | 完成 |
| 拖曳添加组件 | 完成 |
| 位置拖动 | 完成 |
| 拖动位置磁性吸附 | 完成 |
| 尺寸锚点（8个） | 完成 |
| 旋转锚点 | 未完成 |
| 选中效果 | 完成 |
| 层叠控制 | 完成 |
| 面板比例缩放 | 未完成 |
| CTRL+C/V复制黏贴 | 完成 |
| CTRL+A多选 | 完成 |
| 鼠标方框多选 | 未完成 |
| DELETE删除（支持删除多个） | 完成 |
| 样式配置（文字、大小、位置、边框、颜色、旋转） | 完成 |
| 组件继承体系 | 完成 |
| DOM组件（文字、图片） | 完成 |
| canvas组件（圆形、三角形、矩形、线条、箭头线条） | 完成 |
| echarts组件 | 未完成 |
| 组件同步/异步数据加载 | 完成 |


## 构建过程[更新]
- 安装NodeJs
- 安装vue-cli：npm install -g @vue/cli
- 安装quasar-cli：npm install -g @quasar/cli
** 如果之前有安装过，可以先卸载
npm uninstall -g vue-cli
npm uninstall -g quasar-cli

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

## 运行截图
![avatar](https://github.com/phynos/WebTopo/shot.png)
