import Vue from 'vue';

import {
    uid
} from 'quasar';

/**
 * 设置 当前选中的组件-单选
 * @param {*} state 
 * @param {*} component 
 */
export const setSelectedComponent = (state,component) => {    
    var fuid = uid;
    if(!component.identifier) {
        component.identifier = fuid();
    }    
    state.selectedComponents = [component.identifier];
    state.selectedComponentMap = {};
    Vue.set(state.selectedComponentMap,component.identifier,component);
};

/**
 * 增加选中的组件--多选模式
 * @param {*} state 
 * @param {*} component 
 */
export const addSelectedComponent = (state,component) => {
    var fuid = uid;
    if(!component.identifier) {
        component.identifier = fuid();
    }    
    state.selectedComponents.push(component.identifier);
    Vue.set(state.selectedComponentMap,component.identifier,component);
};

/**
 * 将一个组件从已选中当中移除
 * @param {*} state 
 * @param {*} component 
 */
export const removeSelectedComponent = (state,component) => {
    if(!component.identifier)
        return;
    var index = -1;
    for(var i = 0; i < state.selectedComponents.length; i++) {
        if(state.selectedComponents[i] == component.identifier) {
            index = i;
            break;
        }
    }
    if(index > -1) {
        state.selectedComponents.splice(index,1);
    }    
    Vue.delete(state.selectedComponentMap,component.identifier);
};

/**
 * 清理所有选中的组件
 * @param {*} state 
 */
export const clearSelectedComponent = (state) => {
    state.selectedComponents = [];
    for(var key in state.selectedComponentMap) {
        Vue.delete(state.selectedComponentMap,key);
    }
}