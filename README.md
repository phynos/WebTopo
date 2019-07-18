## WEB组态
本项目为配套SpringCloud的前端工程，基于vue+quasar构建

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
