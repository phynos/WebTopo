<template>
<div class="topo-properties">
    <template v-if="selectedComponents.length == 1 && isLayer == false">
        <div class="topo-properties-nav">
            <!-- <q-select v-model="curComponent" :options="componentOptions" @input="changeComponent" style="margin-right:0px;height:43px;border:none;" /> -->
            <q-input v-model="configObject.name" />
        </div>      
        <div class="topo-properties-tabs">
            <div class="topo-properties-tab" @click="changeTab(0)" :class="{'topo-properties-tab-active': tabIndex == 0}">样式</div>
            <div class="topo-properties-tab" @click="changeTab(1)" :class="{'topo-properties-tab-active': tabIndex == 1}">数据</div>
            <div class="topo-properties-tab" @click="changeTab(2)" :class="{'topo-properties-tab-active': tabIndex == 2}">行为</div>
        </div>
        <div class="topo-properties-table">
            <div v-show="tabIndex == 0">
                <template v-if="configObject != null && isLayer == false">
                    <table style="display: none">
                        <tr>
                            <td width="50%" style="padding:5px 0px;background-color:#eee;">属性</td>
                            <td width="50%" style="padding:5px 0px;background-color:#eee;">值</td>
                        </tr>
                    </table>
                    <q-list separator no-border>
                        <q-expansion-item label="Position" default-opened>
                            <table>
                                <tr>
                                    <td width="50%">X</td>
                                    <td width="50%">
                                        <q-input type="number" suffix="px" v-model.lazy="configObject.style.position.x" style="padding-right:5px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Y</td>
                                    <td>
                                        <q-input type="number" suffix="px" v-model.lazy="configObject.style.position.y" style="padding-right:5px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>W</td>
                                    <td>
                                        <q-input type="number" suffix="px" v-model.lazy="configObject.style.position.w" style="padding-right:5px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>H</td>
                                    <td>
                                        <q-input type="number" suffix="px" v-model.lazy="configObject.style.position.h" style="padding-right:5px;" />
                                    </td>
                                </tr>
                            </table>
                        </q-expansion-item>

                        <q-expansion-item label="Border" default-opened>
                            <table>
                                <tr>
                                    <td width="50%">BorderWidth</td>
                                    <td width="50%">
                                        <q-input type="number" suffix="px" style="padding-right:5px;" v-model.lazy="configObject.style.borderWidth" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>BorderStyle</td>
                                    <td>
                                        <q-select v-model="configObject.style.borderStyle" :options="borderStyleOptions" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>BorderColor</td>
                                    <td>
                                        <q-input
                                            filled
                                            v-model="configObject.style.borderColor"
                                            class="my-input"
                                        >
                                            <template v-slot:append>
                                            <q-icon name="colorize" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-color v-model="configObject.style.borderColor" />
                                                </q-popup-proxy>
                                            </q-icon>
                                            </template>
                                        </q-input>
                                    </td>
                                </tr>
                            </table>
                        </q-expansion-item>

                        <q-expansion-item label="Base" default-opened>
                            <table>
                                <tr>
                                    <td width="50%">Visible</td>
                                    <td width="50%">
                                        <q-select v-model="configObject.style.visible" :options="[{label: 'Visible',value: true},{label: 'Invisible',value: false}]" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>z-index</td>
                                    <td>
                                        <q-input type="number" v-model.lazy="configObject.style.zIndex" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rolate</td>
                                    <td>
                                        <q-input type="number" v-model.lazy="configObject.style.transform" suffix="deg" style="padding-right:5px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>BackColor</td>
                                    <td>
                                        <q-input
                                            filled
                                            v-model="configObject.style.backColor"
                                            class="my-input"
                                        >
                                            <template v-slot:append>
                                            <q-icon name="colorize" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-color v-model="configObject.style.backColor" />
                                                </q-popup-proxy>
                                            </q-icon>
                                            </template>
                                        </q-input>
                                    </td>
                                </tr>
                                <tr v-if="configObject.style.url != undefined && configObject.style.url != null">
                                    <td>URL</td>
                                    <td>
                                        <q-input v-model.lazy="configObject.style.url" />
                                    </td>
                                </tr>
                                <tr v-if="configObject.style.text != undefined">
                                    <td>Text</td>
                                    <td>
                                        <q-input v-model.lazy="configObject.style.text" />
                                    </td>
                                </tr>
                                <tr v-if="configObject.style.textAlign != undefined">
                                    <td>TextAlign</td>
                                    <td>
                                        <q-select v-model="configObject.style.textAlign" :options="textAlignOptions" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>ForeColor</td>
                                    <td>
                                        <q-input
                                            filled
                                            v-model="configObject.style.foreColor"
                                            class="my-input"
                                        >
                                            <template v-slot:append>
                                            <q-icon name="colorize" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-color v-model="configObject.style.foreColor" />
                                                </q-popup-proxy>
                                            </q-icon>
                                            </template>
                                        </q-input>
                                    </td>
                                </tr>
                                <tr v-if="configObject.style.fontFamily != undefined">
                                    <td>Font Family</td>
                                    <td>
                                        <q-select v-model="configObject.style.fontFamily" :options="fontFamilyOptions" />
                                    </td>
                                </tr>
                                <tr v-if="configObject.style.fontSize != undefined">
                                    <td>Font Size</td>
                                    <td>
                                        <q-input type="number" suffix="px" style="padding-right:5px;" v-model.lazy="configObject.style.fontSize" />
                                    </td>
                                </tr>
                                <tr v-if="configObject.style.radius != undefined">
                                    <td>Radius</td>
                                    <td>
                                        <q-input type="number" v-model.lazy="configObject.style.radius" />
                                    </td>
                                </tr>
                                <tr v-if="configObject.style.lineWidth != undefined">
                                    <td>LineWidth</td>
                                    <td>
                                        <q-input type="number" suffix="px" style="padding-right:5px;" v-model.lazy="configObject.style.lineWidth" />
                                    </td>
                                </tr>
                            </table>
                        </q-expansion-item>
                    </q-list>
                </template>
            </div>
            <div v-show="tabIndex == 1">

                <div class="not-surpport">根据实际系统设计</div>

            </div>
            <div v-show="tabIndex == 2">
                <template v-if="configObject && configObject.action">
                    <template v-for="(event,index) in configObject.action">
                        <table :key="index" style="margin-top:10px;">
                            <tr>
                                <td>事件</td>
                                <td>
                                    <q-select v-model="event.type" :options="[{label:'点击',value:'click'},{label:'双击',value:'dbclick'},{label:'鼠标移入',value:'mouseenter'},{label:'鼠标双击',value:'mouseleave'}]" />
                                </td>
                            </tr>
                            <tr>
                                <td>动作</td>
                                <td>
                                    <q-select v-model="event.action" :options="[{label:'打开链接',value:'link'},{label:'赋值变量',value:'val'},{label:'展示隐藏',value:'visible'},{label:'调用服务',value:'service'}]" />
                                </td>
                            </tr>

                            <tr v-if="event.action == 'visible'">
                                <td>点击出现</td>
                                <td>
                                    <q-select multiple chips v-model="event.showItems" :options="generateTargetComponentOptions()" />
                                </td>
                            </tr>
                            <tr v-if="event.action == 'visible'">
                                <td>点击隐藏</td>
                                <td>
                                    <q-select multiple chips v-model="event.hideItems" :options="generateTargetComponentOptions()" />
                                </td>
                            </tr>
                        </table>
                    </template>
                    <div style="width:100%;padding:10px 10px 10px 10px;">
                        <q-btn label="Add" outline @click="addAction" style="width:100%;" />
                    </div>
                </template>
            </div>
        </div>
    </template>
</div>
</template>

<script>

import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
    name: 'TopoProperties',
    data() {
        return {
            configObject: null,
            isLayer: false,
            tabIndex: 0,
            fontFamilyOptions: [{
                    label: "Arial",
                    value: "Arial"
                },
                {
                    label: "Helvetica",
                    value: "Helvetica"
                },
                {
                    label: "sans-serif",
                    value: "sans-serif"
                },
                {
                    label: "宋体",
                    value: "宋体"
                },
                {
                    label: "黑体",
                    value: "黑体"
                },
                {
                    label: "微软雅黑",
                    value: "微软雅黑"
                },
            ],
            textAlignOptions: [{
                    label: "Left",
                    value: "left"
                },
                {
                    label: "Right",
                    value: "right"
                },
                {
                    label: "Center",
                    value: "center"
                },
                {
                    label: "Justify",
                    value: "justify"
                },
            ],
            borderStyleOptions: [{
                    label: "_____ (Solid)",
                    value: "solid"
                },
                {
                    label: "- - - (Dashed)",
                    value: "dashed"
                },
                {
                    label: ". . . (Dotted)",
                    value: "dotted"
                },
            ],
        }
    },
    computed: {
        ...mapState({
            sceneConfigData: state => state.topoEditor.topoData,
            selectedComponents: state => state.topoEditor.selectedComponents,
            selectedComponentMap: state => state.topoEditor.selectedComponentMap,
        })
    },
    methods: {
        initPage(configData) {
            this.configData = configData;
        },
        changeTab(tabIndex) {
            this.tabIndex = tabIndex;
        },
        bindData(configObject, index, isLayer) {
            this.configObject = configObject;
            this.isLayer = isLayer;
            if (isLayer === false) {

            }
        },
        generateTargetComponentOptions() {            
            var options = [];
            this.sceneConfigData.components.forEach(component => {
                if (this.configObject.identifier != component.identifier) {
                    options.push({
                        label: component.name || component.type,
                        value: component.identifier
                    });
                }
            });
            return options;
        },
        addAction() {
            var action = {
                type: 'click',
                action: 'visible',
                showItems: [],
                hideItems: []
            };
            this.configObject.action.push(action);
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">
.topo-properties {
    border: #ccc solid 1px;
    background-color: white;
    height: 100%;

    .topo-properties-tabs {
        height: 35px;
        display: flex;
        border-bottom: #ccc solid 1px;

        .topo-properties-tab {
            height: 35px;
            text-align: center;
            line-height: 35px;
            flex: 1;
            background-color: white;
        }

        .topo-properties-tab+.topo-properties-tab {
            border-left: #ccc solid 1px;
        }

        .topo-properties-tab:hover {
            cursor: pointer;
            opacity: 0.8;
        }

        .topo-properties-tab-active {
            background-color: #ddd;
        }
    }

    .topo-properties-table {
        overflow-x: hidden;
        overflow-y: auto;
        height: calc(100% - 36px);

        table {
            width: 100%;
            border-collapse: collapse;

            td {
                text-align: center;
                padding: 0px;
                border: #ccc solid 1px;
            }

            .q-input {
                border: none;
            }

            .q-select {
                border: none;
                margin-right: 0px;
            }
        }
    }

    .not-surpport {
        margin: 20px auto;
        text-align: center;
    }
}
</style>
