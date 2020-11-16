import Vue from "vue";

import { uid } from "quasar";
import { deepCopy } from "@/assets/libs/utils";

/**
 * 执行编辑命令
 * 注意：这里不要用箭头函数，防止this无法调用
 * @param {*} state
 * @param {*} command 命令对象
 */
export const execute = function(state, command) {
  //暂时不做参数校验
  //在这里分发命令--这里暂时先用switch分发，应该用表格分发
  switch (command.op) {
    case "add":
      var component = command.component;
      var fuid = uid;
      component.identifier = fuid();
      component.name = component.type + state.topoData.components.length;
      component.style.visible = true;
      component.style.transform = 0;
      component.style.borderWidth = component.style.borderWidth
        ? component.style.borderWidth
        : 0;
      component.style.borderStyle = component.style.borderStyle
        ? component.style.borderStyle
        : "solid";
      component.style.borderColor = component.style.borderColor
        ? component.style.borderColor
        : "#ccccccff";
      //component.style.fontFamily = "Arial";
      state.topoData.components.push(component);
      break;
    case "del":
      var keys = [];
      for (var i = 0; i < state.topoData.components.length; i++) {
        var identifier = state.topoData.components[i].identifier;
        if (state.selectedComponentMap[identifier] != undefined) {
          keys.push(i);
        }
      }
      //排序
      keys.sort((a, b) => {
        return a - b;
      });
      //逆向循环删除
      for (var i = keys.length - 1; i >= 0; i--) {
        state.topoData.components.splice(keys[i], 1);
      }
      break;
    case "move":
      var dx = command.dx,
        dy = command.dy;
      for (var key in command.items) {
        var component = command.items[key];
        component.style.position.x = component.style.position.x + dx;
        component.style.position.y = component.style.position.y + dy;
      }
      break;
    case "copy-add":
      debugger;
      this.commit("topoEditor/clearSelectedComponent");
      var fuid = uid;
      for (let i = 0; i < command.items.length; i++) {
        var t = command.items[i];
        var component = deepCopy(t);
        component.identifier = fuid();
        component.name = component.type + state.topoData.components.length;
        component.style.visible = true;
        //这里应该根据选中的的组件确定位置-暂时用个数
        component.style.position.x =
          component.style.position.x + 25 * (state.copyCount + 1);
        component.style.position.y =
          component.style.position.y + 25 * (state.copyCount + 1);
        state.topoData.components.push(component);
        this.commit("topoEditor/addSelectedComponent", component);
        this.commit("topoEditor/increaseCopyCount");
      }
      break;
    default:
      console.warn("不支持的命令.");
      break;
  }
  //记录操作
  state.undoStack.push(command);
};

export const undo = state => {
  var command = state.undoStack.pop();
  if (command == undefined) {
    console.log("none undo command.");
    return;
  }

  switch (command.op) {
    case "add":
      var component = command.component;
      //逆向循环删除
      for (var i = state.topoData.components.length - 1; i >= 0; i--) {
        if (component.identifier == state.topoData.components[i].identifier) {
          state.topoData.components.splice(i, 1);
          break;
        }
      }
      break;
    case "del":
      break;
    case "move":
      var dx = command.dx,
        dy = command.dy;
      for (var key in state.selectedComponentMap) {
        var component = state.selectedComponentMap[key];
        component.style.position.x = component.style.position.x - dx;
        component.style.position.y = component.style.position.y - dy;
      }
      break;
    case "copy-add":
      console.log("undo暂不支持：copy-add");
      break;
    default:
      break;
  }

  state.redoStack.push(command);
};

export const redo = function(state) {
  var command = state.redoStack.pop();
  if (command == undefined) {
    console.log("none redo command.");
    return;
  }
  this.commit("topoEditor/execute", command);
};

/**
 * 设置 当前选中的组件-单选
 * @param {*} state
 * @param {*} component
 */
export const setSelectedComponent = (state, component) => {
  var fuid = uid;
  if (!component.identifier) {
    component.identifier = fuid();
  }
  state.selectedComponents = [component.identifier];
  state.selectedComponentMap = {};
  Vue.set(state.selectedComponentMap, component.identifier, component);
  Vue.set(state, "selectedComponent", component);
};

/**
 * 增加选中的组件--多选模式
 * @param {*} state
 * @param {*} component
 */
export const addSelectedComponent = (state, component) => {
  var fuid = uid;
  if (!component.identifier) {
    component.identifier = fuid();
  }
  if (state.selectedComponentMap[component.identifier]) {
    return;
  }
  state.selectedComponents.push(component.identifier);
  Vue.set(state.selectedComponentMap, component.identifier, component);
  if (state.selectedComponents.length == 1) {
    Vue.set(state, "selectedComponent", component);
  } else {
    Vue.set(state, "selectedComponent", null);
  }
};

/**
 * 将一个组件从已选中当中移除
 * @param {*} state
 * @param {*} component
 */
export const removeSelectedComponent = (state, component) => {
  if (!component.identifier) return;
  var index = -1;
  for (var i = 0; i < state.selectedComponents.length; i++) {
    if (state.selectedComponents[i] == component.identifier) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    state.selectedComponents.splice(index, 1);
  }
  Vue.delete(state.selectedComponentMap, component.identifier);
  //如果移除的是选中组件
  if (
    state.selectedComponent != null &&
    component.identifier == state.selectedComponent.identifier
  ) {
    Vue.set(state, "selectedComponent", null);
  }
  //如果只有一个组件，则默认选中
  if (state.selectedComponents.length == 1) {
    var _component = state.selectedComponentMap[state.selectedComponents[0]];
    Vue.set(state, "selectedComponent", _component);
  }
};

/**
 * 清理所有选中的组件
 * @param {*} state
 */
export const clearSelectedComponent = state => {
  state.selectedComponents = [];
  for (var key in state.selectedComponentMap) {
    Vue.delete(state.selectedComponentMap, key);
  }
  Vue.set(state, "selectedComponent", null);
};

export const setLayerSelected = (state, selected) => {
  state.selectedIsLayer = selected;
};

export const setCopySrcItems = (state, items) => {
  state.copySrcItems = items;
  state.copyCount = 0;
};
export const increaseCopyCount = state => {
  state.copyCount++;
};
