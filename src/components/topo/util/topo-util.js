const topoUtil = {};

//如果需要手动映射type和组件的关系，请在这里配置
topoUtil.viewRegisterMap = {
  triangle: "view-triangle",
  rect: "view-rect",
  circular: "view-circular",
  line: "view-line",
  "line-arrow": "view-line-arrow",
  "chart-line": "view-chart",
  "chart-line-step": "view-chart",
  "chart-bar": "view-chart",
  "chart-pie": "view-chart-pie",
  "chart-gauge": "view-chart-gauge",
  dashed: "view-dashed"
};

//优先匹配map，否则将自动匹配
topoUtil.parseViewName = function(component) {
  var viewName = topoUtil.viewRegisterMap[component.type];
  console.log("viewName :", viewName, component.type);
  if (viewName == undefined) {
    console.info(
      `没有手动配置组件映射，将根据数据的type自动匹配，当前组件类型=${component.type}`
    );
    viewName = "view-" + component.type;
  }
  return viewName;
};

topoUtil.parseEchartType = function(component, option) {
  delete option.series[0]["step"];
  delete option.series[0]["smooth"];
  if (component.type == "chart-line") {
    option.series[0].type = "line";
    option.series[0]["smooth"] = true;
  } else if (component.type == "chart-bar") {
    option.series[0].type = "bar";
  } else if (component.type == "chart-line-step") {
    option.series[0].type = "line";
    option.series[0].step = "start";
  }
};

export default topoUtil;
