// import something here
import x2js from 'x2js' //xml数据处理插件

// "async" is optional
export default async ({ /* app, router, Vue, ... */ Vue }) => {
  Vue.prototype.$x2js = new x2js() //创建x2js对象，挂到vue原型上
}
