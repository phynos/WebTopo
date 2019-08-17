<template>
<div class="topo-main">
    <vue-ruler-tool :parent="true" :is-scale-revise="true" style="width:100%;height: calc(100% - 40px);">
        <div
            tabindex="0"
            id="surface-edit-layer"
            class="topo-layer"                            
            :class="{'topo-layer-view-selected': selectedIsLayer}"
            :style="layerStyle"
            @click="onLayerClick($event)" 
            @mouseup="onLayerMouseup($event)" 
            @mousemove="onLayerMousemove($event)" 
            @mousedown="onLayerMousedown($event)" 
            @keyup.delete="removeItem()"
            @dragover.prevent
            @drop="onDrop">
            <template v-for="(component,index) in configData.components">
                <div  
                     :key="index"
                     tabindex="0"
                     class="topo-layer-view"
                     :class="{'topo-layer-view-selected': selectedComponentMap[component.identifier] == undefined? false:true }" 
                     @click.stop="clickComponent(index,component,$event)"
                     @mousedown.stop="controlMousedown(component,$event,index)"
                     @keyup.delete="removeItem()"
                     @keydown.up.exact.prevent="moveItems('up')"
                     @keydown.right.exact.prevent="moveItems('right')"
                     @keydown.down.exact.prevent="moveItems('down')"
                     @keydown.left.exact.prevent="moveItems('left')"                                     
                     @keydown.ctrl.67="copyItem(index,component)"
                     @keydown.ctrl.86="pasteItem"
                     :style="{
                            left: component.style.position.x + 'px',
                            top: component.style.position.y + 'px',
                            width: component.style.position.w + 'px',
                            height: component.style.position.h + 'px',
                            'background-color': component.style.backColor,
                            zIndex: component.style.zIndex,
                            borderWidth: component.style.borderWidth + 'px',
                            borderStyle: component.style.borderStyle,
                            borderColor: component.style.borderColor,
                            transform: component.style.transform? `rotate(${component.style.transform}deg)`:'rotate(0deg)',
                        }">
                    <component v-bind:is="parseView(component)" :detail="component" :editMode="true" :ref="'comp' + index"/>                                    
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-lt')" v-show="selectedComponentMap[component.identifier]" class="resize-left-top"></div>
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-lc')" v-show="selectedComponentMap[component.identifier]" class="resize-left-center"></div>
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-lb')" v-show="selectedComponentMap[component.identifier]" class="resize-left-bottom"></div>
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-rt')" v-show="selectedComponentMap[component.identifier]" class="resize-right-top"></div>
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-rc')" v-show="selectedComponentMap[component.identifier]" class="resize-right-center"></div>
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-rb')" v-show="selectedComponentMap[component.identifier]" class="resize-right-bottom"></div>
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-ct')" v-show="selectedComponentMap[component.identifier]" class="resize-center-top"></div>
                    <div @mousedown.stop="resizeMousedown(component,$event,index,'resize-cb')" v-show="selectedComponentMap[component.identifier]" class="resize-center-bottom"></div>
                </div>
            </template>
            <div class="topo-frame-selection" :style="{width: frameSelectionDiv.width + 'px',height: frameSelectionDiv.height + 'px',top: frameSelectionDiv.top + 'px',left: frameSelectionDiv.left + 'px'}">
            </div>
        </div>
    </vue-ruler-tool>
    <div style="height: 40px;border-top: #ccc solid 1px;position:relative;background-color:white;">
        <div style="position:absolute;left: 0px;top: 0px;" class="row">
            <div style="line-height:40px;height:40px;">
                已选组件个数：{{selectedComponents.length}}
            </div>
            <q-btn label="预览" color="primary" size="xs" style="margin-left:100px;height:30px;margin-top:5px;" @click="fullScreen" />

            <q-btn label="当前数据" color="primary" size="xs" style="margin-left:100px;height:30px;margin-top:5px;" @click="printData" />
        </div>
        <div style="position:absolute;right: 10px;top: 0px;" class="row">                            
            <div style="line-height:40px;height:40px;padding: 0px 5px;">
                缩放
            </div>
            <q-slider
                v-model="selectedValue"
                :min="30"
                :max="200"
                :step="1"
                label
                :label-value="`${selectedValue}%`"
                snap
                style="width:200px;"
                />
        </div>                        
    </div>
</div>
</template>

<script>
import VueRulerTool from './ruler';

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

import uid from '@/assets/libs/uid.js'

import topoUtil from './util/topo-util';
import {
    deepCopy
} from "@/assets/libs/utils";

import {
    checkInRange,checkByPointInRect,checkByRectCollisionDetection
} from "@/assets/libs/topo";

import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
    name: 'TopoMain',
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
        VueRulerTool
    },
    props: [],
    computed: {
        ...mapState({
            selectedComponents: state => state.topoEditor.selectedComponents,
            selectedComponentMap: state => state.topoEditor.selectedComponentMap,
            configData: state => state.topoEditor.topoData,
            selectedIsLayer: state => state.topoEditor.selectedIsLayer,
            copyFlag: state => state.topoEditor.copyFlag,
            copyCount: state => state.topoEditor.copyCount,            
        }),
        layerStyle:function () {
            var scale = this.selectedValue / 100;
            var styles = [`transform:scale(${scale})`];
            if(this.configData.layer.backColor) {
                styles.push(`background-color: ${this.configData.layer.backColor}`);
            }
            if(this.configData.layer.backgroundImage) {
                styles.push(`background-image: url("${this.configData.layer.backgroundImage}")`);
            }
            if(this.configData.layer.width > 0) {
                styles.push(`width: ${this.configData.layer.width}px`);
            }
            if(this.configData.layer.height > 0) {
                styles.push(`height: ${this.configData.layer.height}px`);
            }
            var style = styles.join(';');
            return style;
        }
    },
    data() {
        return {
            moveItem: {
                startX: 0,
                startY: 0
            }, //移动组件 相关变量
            resizeItem: {
                startPx: 0,
                startPy: 0,
                x: 0,
                y: 0,
                w: 0,
                h: 0,
            }, //resize组件 相关变量  
            frameSelectionDiv: {
                width: 0,
                height: 0,
                top: 10,
                left: 10,
                startX: 0,
                startY: 0,
                startPageX: 0,                
                startPageY: 0,
            },          
            flag: '', //当前操作标志位
            curControl: null,
            curIndex: -1,
            selectedValue: 100
        }
    },
    methods: {
        ...mapMutations('topoEditor',[
            'setSelectedComponent',
            'addSelectedComponent',
            'removeSelectedComponent',
            'clearSelectedComponent',
            'setLayerSelected',
            'setCopyFlag',
            'increaseCopyCount',
        ]),
        ...mapActions('topoEditor',[
            'loadDefaultTopoData'
        ]),
        controlMousedown(component,event,index) {
            if(event.ctrlKey) {                
                return;
            }
            this.flag = 'move';
            this.curControl = component;
            this.clickItem(component,index);
            this.moveItem.startX = event.pageX;
            this.moveItem.startY = event.pageY; 
            //记录初始信息--move
            for(var key in this.selectedComponentMap) {
                var component = this.selectedComponentMap[key];
                component.style.temp = {};
                component.style.temp.position = {};
                component.style.temp.position.x = component.style.position.x;
                component.style.temp.position.y = component.style.position.y;
            }         
        },
        resizeMousedown(component,$event,index,flag) {//resize-鼠标按下事件
            this.flag = flag;
            this.curControl = component;
            this.curIndex = index;
            this.clickItem(component,index);
            var dom = event.currentTarget;
            this.resizeItem.startPx = event.pageX;
            this.resizeItem.startPy = event.pageY;
            //记录初始信息-resize
            this.resizeItem.x = this.curControl.style.position.x;
            this.resizeItem.y = this.curControl.style.position.y;
            this.resizeItem.w = this.curControl.style.position.w;
            this.resizeItem.h = this.curControl.style.position.h;            
        },
        onLayerMousemove(event) {
            if(event.which != 1) {
                this.flag = '';
                return;
            }
            if (this.flag == '')
                return;
            if(this.flag.startsWith('resize')) {
                var dx = event.pageX - this.resizeItem.startPx,
                    dy = event.pageY - this.resizeItem.startPy;
                switch (this.flag) {
                    case 'resize-lt':
                        this.curControl.style.position.x = this.resizeItem.x + dx;
                        this.curControl.style.position.y = this.resizeItem.y + dy;
                        dx = -dx;
                        dy = -dy;
                        break;
                    case 'resize-lc':
                        this.curControl.style.position.x = this.resizeItem.x + dx;
                        dy = 0;
                        dx = -dx;                        
                        break;
                    case 'resize-lb':
                        this.curControl.style.position.x = this.resizeItem.x + dx;
                        dx = -dx;
                        break;
                    case 'resize-rt':
                        this.curControl.style.position.y = this.resizeItem.y + dy;
                        dy = -dy;                        
                        break;
                    case 'resize-rc':
                        dy = 0;
                        break;
                    case 'resize-rb':                        
                        break;
                    case 'resize-ct':
                        this.curControl.style.position.y = this.resizeItem.y + dy;
                        dx = 0;
                        dy = -dy;                        
                        break;
                    case 'resize-cb':
                        dx = 0;                        
                        break;
                }
                if((this.resizeItem.w + dx) > 20) {
                    this.curControl.style.position.w = this.resizeItem.w + dx;
                }
                if((this.resizeItem.h + dy) > 20) {
                    this.curControl.style.position.h = this.resizeItem.h + dy;
                }
                //canvas组件需要重新渲染
                // DOM 还没有更新
                this.$nextTick(function () {
                    // DOM 更新了
                    var a = this.$refs['comp' + this.curIndex][0];
                    a.onResize();
                });
            } else if(this.flag ==  'move') {
                //移动组件
                var dx = event.pageX - this.moveItem.startX,
                    dy = event.pageY - this.moveItem.startY;
                for(var key in this.selectedComponentMap) {
                    var component = this.selectedComponentMap[key];
                    component.style.position.x = component.style.temp.position.x + dx;
                    component.style.position.y = component.style.temp.position.y + dy;
                }
            } else if(this.flag == 'frame_selection') {
                this.onFrameSelection(event);                                
            }            
        },
        onLayerMouseup(event) {
            if(this.flag.startsWith('resize')) {                
                var a = this.$refs['comp' + this.curIndex][0];
                a.onResize();
            } else if(this.flag == 'frame_selection') {
                //由于和onLayerClick冲突，这里模拟下点击空白区域
                this.onFrameSelection(event);
                this.frameSelectionDiv.width = 0;
                this.frameSelectionDiv.height = 0;
                this.frameSelectionDiv.top = 0;
                this.frameSelectionDiv.left = 0;
            }
            this.flag = '';
        },     
        onLayerMousedown($event) {
            this.flag = 'frame_selection';
            this.frameSelectionDiv.startX = event.offsetX;
            this.frameSelectionDiv.startY = event.offsetY;
            this.frameSelectionDiv.startPageX = event.pageX;
            this.frameSelectionDiv.startPageY = event.pageY;
        },
        onLayerClick() {
            // this.clearSelectedComponent(); 
            // this.setLayerSelected(true); 
        },
        onFrameSelection(event){
            var dx = event.pageX - this.frameSelectionDiv.startPageX;
            var dy = event.pageY - this.frameSelectionDiv.startPageY;  
            this.frameSelectionDiv.width = Math.abs(dx);
            this.frameSelectionDiv.height = Math.abs(dy);              
            if(dx > 0 && dy > 0) {            
                this.frameSelectionDiv.top = this.frameSelectionDiv.startY;
                this.frameSelectionDiv.left = this.frameSelectionDiv.startX;
            } else if(dx > 0 && dy < 0) {
                this.frameSelectionDiv.top = this.frameSelectionDiv.startY + dy;
                this.frameSelectionDiv.left = this.frameSelectionDiv.startX;
            } else if(dx < 0 && dy > 0) {
                this.frameSelectionDiv.top = this.frameSelectionDiv.startY;
                this.frameSelectionDiv.left = this.frameSelectionDiv.startX + dx;
            } else if(dx < 0 && dy < 0) {
                this.frameSelectionDiv.top = this.frameSelectionDiv.startY + dy;
                this.frameSelectionDiv.left = this.frameSelectionDiv.startX + dx;
            }
            //判断各个组件是否在方框内
            var _this = this;
            var rect = {
                x: this.frameSelectionDiv.left,
                y: this.frameSelectionDiv.top,
                width: this.frameSelectionDiv.width,
                height: this.frameSelectionDiv.height
            };
            var components = this.configData.components;
            components.forEach(component => {
                var itemRect = {
                    x: component.style.position.x,
                    y: component.style.position.y,
                    width: component.style.position.w,
                    height: component.style.position.h,
                };
                if(checkByRectCollisionDetection(rect,itemRect)) {
                    _this.addSelectedComponent(component);
                } else {
                    _this.removeSelectedComponent(component);
                }
            });            
            if(this.selectedComponents.length > 0) {
                this.setLayerSelected(false);
            } else {
                this.setLayerSelected(true);
            }
        }, 
        onDrop(event) {
            event.preventDefault();        
            var infoJson = event.dataTransfer.getData('my-info');
            var component = JSON.parse(infoJson);
            if(this.checkAddComponent(component) == false) {
                return;
            }
            //判断当前着陆点是不是layer
            if(event.target.id == "surface-edit-layer") {
                component.style.position.x = event.offsetX;
                component.style.position.y = event.offsetY; 
            } else {
                //解决着陆灯不是layer的情形
                var layer = event.currentTarget;
                var position = layer.getBoundingClientRect();
                var x = event.clientX - position.left;
                var y = event.clientY - position.top;
                component.style.position.x = x;
                component.style.position.y = y; 
            }
            //处理默认值
            var fuid = uid;
            component.identifier = fuid();
            component.name = component.type + this.configData.components.length;
            component.style.visible = true;
            component.style.transform = 0;
            component.style.borderWidth = component.style.borderWidth? component.style.borderWidth : 0;
            component.style.borderStyle = component.style.borderStyle? component.style.borderStyle : 'solid';
            component.style.borderColor = component.style.borderColor? component.style.borderColor : '#ccccccff';            
            //component.style.fontFamily = "Arial";
            this.configData.components.push(component);                                    
            //默认选中，并点击
            this.clickItem(component,this.configData.components.length - 1);
        },
        moveItems(direction){
            var dx = 0,dy = 0;
            if(direction == 'up') {
                dy = -1;
            } else if(direction == 'right') {
                dx = 1;
            } else if(direction == 'down') {
                dy = 1;
            } else if(direction == 'left') {
                dx = -1;
            }
            for(var key in this.selectedComponentMap) {
                var component = this.selectedComponentMap[key];
                component.style.position.x = component.style.position.x + dx;
                component.style.position.y = component.style.position.y + dy;
            }
        },
        checkAddComponent(info){
            if(info == null) {
                this.$q.notify({
                    type: 'negative',
                    position: "bottom-right",
                    message: 'This component not surpport.'
                });
                return false;
            }
            return true;
        },
        parseView(component) {
            return topoUtil.parseViewName(component);
        },
        clickItem(component, index) {
            this.setLayerSelected(false);
            if(this.selectedComponentMap[component.identifier] == undefined) {
                this.setSelectedComponent(component);
            } else {
                //如果已经选中，则不做任何处理
            }
        },
        clickComponent(index,component,event){//点击组件
            if(event.ctrlKey == true) { //点击了ctrl
                this.setLayerSelected(false);
                if(this.selectedComponentMap[component.identifier] == undefined) {
                    this.addSelectedComponent(component);
                } else {
                    this.removeSelectedComponent(component);
                }
            } else {
                //这里不再处理点击事件，改为鼠标左键
                //this.clickItem(component,index);
            }                       
        },
        copyItem(index,component){ // 设定复制源            
            this.setCopyFlag(true);
        },
        pasteItem() {
            if(this.copyFlag) {
                var fuid = uid;
                for(var key in this.selectedComponentMap) {
                    var s = this.selectedComponentMap[key];
                    var component = deepCopy(s);           
                    component.identifier = fuid();
                    component.name = component.type + this.configData.components.length;      
                    component.style.visible = true;
                    component.style.position.x = component.style.position.x + 25 * (this.copyCount + 1);
                    component.style.position.y = component.style.position.y + 25 * (this.copyCount + 1);
                    this.configData.components.push(component); 
                }
                this.increaseCopyCount();
            }
        },
        removeItem(index,component) { //移除组件
            var keys = [];
            for(var i = 0; i < this.configData.components.length; i++) {
                var identifier = this.configData.components[i].identifier;
                if(this.selectedComponentMap[identifier] != undefined) {
                    keys.push(i);
                }
            }
            //排序
            keys.sort((a,b) =>{ return a-b;});
            //逆向循环删除
            for(var i = keys.length - 1; i >= 0; i--) {
                this.configData.components.splice(keys[i],1);
            }
            this.setLayerSelected(true);  
        },        
        fullScreen() {
            localStorage.setItem('topoData',JSON.stringify(this.configData));
            let {href} = this.$router.resolve({
               path: '/fullscreen',
               name: 'TopoFullscreen',
               query: {
                   sceneId: this.sceneId,
                   sceneName: this.sceneName
               },
               params: { 
                   sceneId: this.sceneId,
                   sceneName: this.sceneName
               }
            });
            window.open(href, '_blank');
        },
        printData(){
            var json = JSON.stringify(this.configData);
            console.log(json);
            alert(json);
        }        
    },
    mounted() {
        this.loadDefaultTopoData();
    }
}
</script>

<style lang="scss">
.topo-main {
    background-color: white;
    border: #ccc solid 1px;    
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;

    .topo-layer {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-origin: left top;
        overflow: auto;
        background-color: white;
        background-clip: padding-box;
        background-origin: padding-box;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .topo-frame-selection {
            background-color: #8787e7;
            opacity: 0.3;
            border: #0000ff solid 1px;
            position: absolute;   
            z-index: 999;         
        }

        .topo-layer-view {
            position: absolute;
            height: 100px;
            width: 100px;
            background-color: #999;
            cursor: move;
            border: #ccc solid 1px;

            .resize-left-top {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                left: -5px;
                top: -5px;
                cursor: nwse-resize;
            }

            .resize-left-center {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                left: -5px;
                top: 50%;
                margin-top: -5px;
                cursor: ew-resize;
            }

            .resize-left-bottom {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                left: -5px;
                bottom: -5px;
                cursor: nesw-resize;
            }

            .resize-right-top {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                right: -5px;
                top: -5px;
                cursor: nesw-resize;
            }

            .resize-right-center {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                right: -5px;
                top: 50%;
                margin-top: -5px;
                cursor: ew-resize;
            }

            .resize-right-bottom {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                right: -5px;
                bottom: -5px;
                cursor: nwse-resize;
            }

            .resize-center-top {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                top: -5px;
                left: 50%;
                margin-left: -5px;
                cursor: ns-resize;
            }

            .resize-center-bottom {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                bottom: -5px;
                left: 50%;
                margin-left: -5px;
                cursor: ns-resize;
            }
        }

        .topo-layer-view-selected {
            outline: 1px solid #0cf;
        }
    }
}
</style>
