const topoUtil = {};

topoUtil.viewRegisterMap = {
  "text": "view-text",
  "image": "view-image",
  "triangle": "view-triangle",
  "rect": "view-rect",
  "circular": "view-circular",
  "line": "view-line",
  "line-arrow": "view-line-arrow",
  "chart-line": "view-chart",
  "chart-line-step": "view-chart",
  "chart-bar": "view-chart",
  "chart-pie": "view-chart-pie",
  "chart-gauge": "view-chart-gauge",
  "video": "view-video",
  "signal": "view-signal",
  "list": "view-list",
  "image-list": "view-image-list",
  "image-carousel": "view-image-carousel",
  "fingerprint":"view-fingerprint",
  "fingerprint-flow":"view-fingerprint-flow",
  "image-state": "view-image-state",
  "pedestrian-detection": "view-pedestrian-detection",
  "svg-ellipse": "view-svg-ellipse",
};

//优先匹配map，否则将自动匹配
topoUtil.parseViewName = function (component) {
  var viewName = topoUtil.viewRegisterMap[component.type];
  if(viewName == undefined) {
    console.error(`无法匹配到控件，当前组件类型=${component.type}`);    
    viewName = "view-" + component.type;
  }
  return viewName;
};

topoUtil.parseEchartType = function (component, option) {
  delete option.series[0]['step'];
  delete option.series[0]['smooth'];
  if (component.type == 'chart-line') {
    option.series[0].type = 'line';
    option.series[0]['smooth'] = true;
  } else if (component.type == 'chart-bar') {
    option.series[0].type = 'bar';
  } else if (component.type == 'chart-line-step') {
    option.series[0].type = 'line';
    option.series[0].step = 'start';
  }
}

export default topoUtil;
