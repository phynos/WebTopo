export default {
  topoData: {
    name: '--',
    components: []
  }, //当前场景的组态数据
  selectedIsLayer: true, //当前选择的是不是layer层
  selectedComponents: [], //当前选择的组件--只存identifier
  selectedComponentMap: {}, //当前选择的组件--key=identifier，本数据和selectedComponents同步，主要用于渲染判断
}
