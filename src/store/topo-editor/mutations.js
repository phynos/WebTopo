import Vue from 'vue';

export const setSelectedComponents = (state,selectedComponents) => {
    state.selectedComponents = selectedComponents;
};

export const setSelectedComponent = (state,params) => {
    Vue.set(state.selectedComponents,params.index,params.component);
};

export const addSelectedComponent = (state,component) => {
    state.selectedComponents.push(component);
};