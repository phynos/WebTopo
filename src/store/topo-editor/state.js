export default {
  topoData: {
    name: '--',
    layer: {
      backColor: '',
      backgroundImage: '',
      widthHeightRatio: '',
      width: 1600,
      height: 900
    },
    components: []
  }, //当前场景的组态数据
  selectedIsLayer: true, //当前选择的是不是layer层
  selectedComponent: null,//当前选择的单个组件--仅仅当只有一个组件选中有效，当有多个组件选中，则置为null
  selectedComponents: [], //当前选择的组件--只存identifier
  selectedComponentMap: {}, //当前选择的组件--key=identifier，本数据和selectedComponents同步，主要用于渲染判断
  copySrcItems: [],//当前是否使用了CTRL+C命令
  copyCount: 0,//copy计数，对于同一个复制源，每次复制后计数+1
  undoStack: [],//
  redoStack: [],//
}
