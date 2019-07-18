<template>
<div class="topo-properties">
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
                        <td width="50%" style="padding:5px 0px;background-color:#eee;">Property</td>
                        <td width="50%" style="padding:5px 0px;background-color:#eee;">Value</td>
                    </tr>
                </table>
                <q-list separator no-border>
                    <q-expansion-item label="Position" default-opened>
                        <table>
                            <tr>
                                <td width="50%">X</td>
                                <td width="50%">
                                    <q-input type="number" suffix="px" :value="configObject.style.position.x" @change="val => { configObject.style.position.x = val }" style="padding-right:5px;" />
                                </td>
                            </tr>
                            <tr>
                                <td>Y</td>
                                <td>
                                    <q-input type="number" suffix="px" :value="configObject.style.position.y" @change="val => { configObject.style.position.y = val }" style="padding-right:5px;" />
                                </td>
                            </tr>
                            <tr>
                                <td>W</td>
                                <td>
                                    <q-input type="number" suffix="px" :value="configObject.style.position.w" @change="val => { configObject.style.position.w = val }" style="padding-right:5px;" />
                                </td>
                            </tr>
                            <tr>
                                <td>H</td>
                                <td>
                                    <q-input type="number" suffix="px" :value="configObject.style.position.h" @change="val => { configObject.style.position.h = val }" style="padding-right:5px;" />
                                </td>
                            </tr>
                        </table>
                    </q-expansion-item>

                    <q-expansion-item label="Border" default-opened>
                        <table>
                            <tr>
                                <td width="50%">BorderWidth</td>
                                <td width="50%">
                                    <q-input type="number" suffix="px" style="padding-right:5px;" :value="configObject.style.borderWidth" @change="val => { configObject.style.borderWidth = val }" />
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
                                <td :style="{background: configObject.style.borderColor}">
                                    <q-color format-model="hexa" :value="configObject.style.borderColor" @change="val => { configObject.style.borderColor = val }" />
                                </td>
                            </tr>
                        </table>
                    </q-expansion-item>

                    <q-expansion-item label="Base" default-opened>
                        <table>
                            <tr>
                                <td width="50%">z-index</td>
                                <td width="50%">
                                    <q-input type="number" :value="configObject.style.zIndex" @change="val => { configObject.style.zIndex = val }" />
                                </td>
                            </tr>
                            <tr>
                                <td>Rolate</td>
                                <td>
                                    <q-input type="number" suffix="deg" style="padding-right:5px;" :value="configObject.style.transform" @change="val => { configObject.style.transform = val }" />
                                </td>
                            </tr>
                            <tr>
                                <td>BackColor</td>
                                <td :style="{background: configObject.style.backColor}">
                                    <q-color format-model="hexa" :value="configObject.style.backColor" @change="val => { configObject.style.backColor = val }" />
                                    <!-- <q-input v-model="configObject.style.backColor" readonly /> -->
                                </td>
                            </tr>
                            <tr v-if="configObject.style.url != undefined && configObject.style.url != null">
                                <td>URL</td>
                                <td>
                                    <q-input :value="configObject.style.url" @change="val => { configObject.style.url = val }" />
                                </td>
                            </tr>
                            <tr v-if="configObject.style.text != undefined">
                                <td>Text</td>
                                <td>
                                    <q-input :value="configObject.style.text" @change="val => { configObject.style.text = val }" />
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
                                <td :style="{background: configObject.style.foreColor}">
                                    <q-color format-model="hexa" :value="configObject.style.foreColor" @change="val => { configObject.style.foreColor = val }" />
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
                                    <q-input type="number" suffix="px" style="padding-right:5px;" :value="configObject.style.fontSize" @change="val => { configObject.style.fontSize = val }" />
                                </td>
                            </tr>
                            <tr v-if="configObject.style.radius != undefined">
                                <td>Radius</td>
                                <td>
                                    <q-input type="number" :value="configObject.style.radius" @change="val => { configObject.style.radius = val }" />
                                </td>
                            </tr>
                            <tr v-if="configObject.style.lineWidth != undefined">
                                <td>LineWidth</td>
                                <td>
                                    <q-input type="number" suffix="px" style="padding-right:5px;" :value="configObject.style.lineWidth" @change="val => { configObject.style.lineWidth = val }" />
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
            <div class="not-surpport">暂不支持</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'TopoProperties',
    data() {
        return {
            sceneID: null,
            sceneConfigData: {},
            configObject: null,
            snOptions: [],
            bizOption: [],
            bizTypeOption: [{
                label: 'live',
                value: 'live'
            }, {
                label: 'hour',
                value: 'hour'
            }],
            bizDataOption: [{
                label: 'active',
                value: 'active'
            }, {
                label: 'person',
                value: 'person'
            }, {
                label: 'total',
                value: 'total'
            }], //数据指纹专用
            sceneDeviceMap: {},
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
            curComponent: '',
            componentOptions: []
        }
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
