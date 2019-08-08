<template>
    <div class="topo-render">
        <template v-for="(component,index) in configData.components">
            <div class="topo-render-wrapper"
                    :key="index"
                    @click="doClickComponent(component)"
                    :class="{'topo-render-wrapper-clickable': component.action.length > 0 }"
                    v-show="component.style.visible == undefined? true:component.style.visible"
                    :style="{
                        left: component.style.position.x + 'px',
                        top: component.style.position.y + 'px',
                        width: component.style.position.w + 'px',
                        height: component.style.position.h + 'px',
                        backgroundColor: component.style.backColor,
                        borderWidth: component.style.borderWidth + 'px',
                        borderStyle: component.style.borderStyle,
                        borderColor: component.style.borderColor,
                        transform: component.style.transform? `rotate(${component.style.transform}deg)`:'rotate(0deg)',
                    }">
                <component v-bind:is="parseView(component)" :detail="component" ref="spirit" />
            </div>
        </template>
    </div>
</template>

<script>
import ViewText from './control/ViewText';
import ViewImage from './control/ViewImage';

import ViewCircular from './control/canvas/ViewCircular';
import ViewLine from './control/canvas/ViewLine';
import ViewLineArrow from './control/canvas/ViewLineArrow';
import ViewLineWave from './control/canvas/ViewLineWave';
import ViewRect from './control/canvas/ViewRect';
import ViewTriangle from './control/canvas/ViewTriangle';

import ViewChart from './control/chart/ViewChart';
import ViewChartPie from './control/chart/ViewChartPie';
import ViewChartGauge from './control/chart/ViewChartGauge';

import topoUtil from './util/topo-util';

export default {
    name: 'TopoRender',
    components: {
        ViewText,
        ViewImage,
        ViewCircular,
        ViewLine,
        ViewLineArrow,
        ViewLineWave,
        ViewRect,
        ViewTriangle,
        ViewChart,
        ViewChartPie,
        ViewChartGauge,
    },
    data() {
        return {
            configData: {
                components: []
            },
        }
    },
    methods: {
        parseView(component) {
            return topoUtil.parseViewName(component);
        },
        doClickComponent(component){
            //处理action
            var _this = this;
            for(var i = 0; i < component.action.length; i++) {
                var action = component.action[i];                
                if(action.type == 'click') {  
                    if(action.action == 'visible'){
                        if(action.showItems.length > 0) {
                            action.showItems.forEach(identifier => {
                                _this.showComponent(identifier,true);
                            });
                        }
                        if(action.hideItems.length > 0) {
                            action.hideItems.forEach(identifier => {
                                _this.showComponent(identifier,false);
                            });
                        }
                    } else if(action.action == 'service') {                        
                        _this.sendFun(action);
                    }                    
                }
            }        
        },
        showComponent(identifier,visible) {
            console.log('show:' + identifier + ',visible:' + visible);
            var spirits = this.$refs['spirit'];
            for(var i = 0; i < spirits.length; i++){
                var spirit = spirits[i];
                if(spirit.detail.identifier == identifier) {
                    spirit.detail.style.visible = visible;
                    break;
                }
            }
        },
    },
    mounted() {    
        //这里只是纯前端项目，实际应该从后台拿取数据    
        var temp = localStorage.getItem('topoData');
        this.configData = JSON.parse(temp);
    }
}
</script>

<style lang="scss">
    .topo-render {
        overflow: auto;
        background-color: white;
        position: relative;
        height: 100%;

        .topo-render-wrapper {
            position: absolute;
        }

        .topo-render-wrapper-clickable {
            cursor: pointer;
        }
    }
</style>

