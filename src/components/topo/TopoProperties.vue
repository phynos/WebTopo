<template>
  <div class="topo-properties">
    <div class="topo-properties-nav">
      <!-- <q-select v-model="curComponent" :options="componentOptions" @input="changeComponent" style="margin-right:0px;height:43px;border:none;" /> -->
      <template v-if="isLayer">
        <q-input v-model="topoData.name" />
      </template>
      <template v-if="configObject != null && isLayer == false">
        <q-input v-model="configObject.name" />
      </template>
    </div>
    <template v-if="configObject != null && isLayer == false">
      <div class="topo-properties-tabs">
        <div
          class="topo-properties-tab"
          @click="changeTab(0)"
          :class="{'topo-properties-tab-active': tabIndex == 0}"
        >样式</div>
        <div
          class="topo-properties-tab"
          @click="changeTab(1)"
          :class="{'topo-properties-tab-active': tabIndex == 1}"
        >数据</div>
        <div
          class="topo-properties-tab"
          @click="changeTab(2)"
          :class="{'topo-properties-tab-active': tabIndex == 2}"
        >行为</div>
      </div>
      <div class="topo-properties-table">
        <div v-show="tabIndex == 0">
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
                    <q-input
                      type="number"
                      suffix="px"
                      v-model.number.lazy="configObject.style.position.x"
                      style="padding-right:5px;"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Y</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="px"
                      v-model.number.lazy="configObject.style.position.y"
                      style="padding-right:5px;"
                    />
                  </td>
                </tr>
                <tr>
                  <td>W</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="px"
                      v-model.number.lazy="configObject.style.position.w"
                      style="padding-right:5px;"
                    />
                  </td>
                </tr>
                <tr>
                  <td>H</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="px"
                      v-model.number.lazy="configObject.style.position.h"
                      style="padding-right:5px;"
                    />
                  </td>
                </tr>
              </table>
            </q-expansion-item>

            <q-expansion-item label="Border" default-opened>
              <table>
                <tr>
                  <td width="50%">BorderWidth</td>
                  <td width="50%">
                    <q-input
                      type="number"
                      suffix="px"
                      style="padding-right:5px;"
                      v-model.number.lazy="configObject.style.borderWidth"
                    />
                  </td>
                </tr>
                <tr>
                  <td>BorderStyle</td>
                  <td>
                    <q-select
                      v-model="configObject.style.borderStyle"
                      :options="borderStyleOptions"
                    />
                  </td>
                </tr>
                <tr>
                  <td>BorderColor</td>
                  <td>
                    <q-input filled v-model="configObject.style.borderColor" class="my-input">
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
                    <q-select
                      v-model="configObject.style.visible"
                      :options="[{label: 'Visible',value: true},{label: 'Invisible',value: false}]"
                    />
                  </td>
                </tr>
                <tr>
                  <td>z-index</td>
                  <td>
                    <q-input type="number" v-model.number.lazy="configObject.style.zIndex" />
                  </td>
                </tr>
                <tr>
                  <td>Rolate</td>
                  <td>
                    <q-input
                      type="number"
                      v-model.number.lazy="configObject.style.transform"
                      suffix="deg"
                      style="padding-right:5px;"
                    />
                  </td>
                </tr>
                <tr>
                  <td>BackColor</td>
                  <td>
                    <q-input filled v-model="configObject.style.backColor" class="my-input">
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
                    <q-input filled v-model="configObject.style.foreColor" class="my-input">
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
                    <q-input
                      type="number"
                      suffix="px"
                      style="padding-right:5px;"
                      v-model.number.lazy="configObject.style.fontSize"
                    />
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
                    <q-input
                      type="number"
                      suffix="px"
                      style="padding-right:5px;"
                      v-model.number.lazy="configObject.style.lineWidth"
                    />
                  </td>
                </tr>
                <tr v-if="configObject.style.setLineDash != undefined">
                  <td>LineDash</td>
                  <td>
                    <q-input type="text" v-model.lazy="configObject.style.setLineDash" />
                  </td>
                </tr>
              </table>
            </q-expansion-item>
            <!-- 目前只有虚线有动画 -->
            <q-expansion-item v-if="configObject.type=='dashed'" label="动画" default-opened>
              <table class="data-tb">
                <tr>
                  <td>Direction</td>
                  <td>
                    <q-select
                      v-model="configObject.style.animations"
                      clearable
                      :options="animations"
                    />
                  </td>
                </tr>
                <template v-if="configObject.style.animations">
                  <tr>
                    <td>DotSpace</td>
                    <td>
                      <q-input
                        type="number"
                        suffix="px"
                        class="suffix"
                        v-model.number.lazy="configObject.style.dotSpace"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>DotWidth</td>
                    <td>
                      <q-input
                        type="number"
                        suffix="px"
                        class="suffix"
                        v-model.number.lazy="configObject.style.dotWidth"
                      />
                    </td>
                  </tr>
                </template>
              </table>
            </q-expansion-item>
          </q-list>
        </div>
        <div v-show="tabIndex == 1">
          <div class="not-surpport">根据实际系统设计</div>
        </div>
        <div v-show="tabIndex == 2">
          <template v-if="configObject && configObject.action">
            <template v-for="(event,index) in configObject.action">
              <div :key="index" style="margin-top:10px;">
                <div
                  style="padding:5px;border-left:#ccc solid 1px;border-right:#ccc solid 1px;border-top:#ccc solid 1px;"
                >
                  交互-{{index+1}}
                  <q-icon
                    name="delete"
                    color="negative"
                    style="float:right;cursor:pointer;"
                    @click.native="removeAction(index)"
                  />
                </div>
                <table>
                  <tr>
                    <td width="50%">事件</td>
                    <td width="50%">
                      <q-select
                        emit-value
                        map-options
                        option-label="label"
                        v-model="event.type"
                        :option-disable="(item) => item === null ? true : item.cannotSelect"
                        :options="[{label:'点击',value:'click'},{label:'双击',value:'dblclick'},{label:'鼠标移入',value:'mouseenter',cannotSelect: true},{label:'鼠标双击',value:'mouseleave',cannotSelect: true}]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>动作</td>
                    <td>
                      <q-select
                        emit-value
                        map-options
                        option-label="label"
                        v-model="event.action"
                        :option-disable="(item) => item === null ? true : item.cannotSelect"
                        :options="[{label:'打开链接',value:'link',cannotSelect: true},{label:'赋值变量',value:'val',cannotSelect: true},{label:'展示隐藏',value:'visible'},{label:'调用服务',value:'service',cannotSelect: true}]"
                      />
                    </td>
                  </tr>

                  <tr v-if="event.action == 'visible'">
                    <td>点击出现</td>
                    <td>
                      <q-select
                        filled
                        emit-value
                        multiple
                        use-chips
                        map-options
                        option-label="label"
                        v-model="event.showItems"
                        :options="generateTargetComponentOptions()"
                      />
                    </td>
                  </tr>
                  <tr v-if="event.action == 'visible'">
                    <td>点击隐藏</td>
                    <td>
                      <q-select
                        filled
                        emit-value
                        multiple
                        use-chips
                        map-options
                        option-label="label"
                        v-model="event.hideItems"
                        :options="generateTargetComponentOptions()"
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <div style="width:100%;padding:10px 10px 10px 10px;">
              <q-btn label="Add" outline @click="addAction" style="width:100%;" />
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-if="isLayer">
      <table style="margin-top: 10px">
        <tr>
          <td width="40%">BackColor</td>
          <td>
            <q-input v-model.lazy="topoData.layer.backColor" />
          </td>
        </tr>
        <tr>
          <td>BackImage</td>
          <td>
            <q-input v-model.lazy="topoData.layer.backgroundImage" />
          </td>
        </tr>
        <tr>
          <td>分辨率</td>
          <td>
            <q-select v-model="layerWH" :options="whOptions" />
          </td>
        </tr>
        <tr v-if="layerWH == 'custom'">
          <td>W</td>
          <td>
            <q-input v-model.number.lazy="topoData.layer.width" />
          </td>
        </tr>
        <tr v-if="layerWH == 'custom'">
          <td>H</td>
          <td>
            <q-input v-model.number.lazy="topoData.layer.height" />
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'TopoProperties',
  data () {
    return {
      tabIndex: 0,
      fontFamilyOptions: ['Arial', "Helvetica", "sans-serif", "宋体", "黑体", "微软雅黑"],
      textAlignOptions: ["left", "right", "center", "justify"],
      borderStyleOptions: ["solid", "dashed", "dotted"],
      whOptions: ['1024x768', '1366x768', '1280x800', '1440x900', '1600x900', '1920x1080', 'custom'],
      layerWHTemp: '',
    }
  },
  computed: {
    layerWH: {
      get: function () {
        if (!this.topoData.layer.width || !this.topoData.layer.height) {
          this.topoData.layer.width = 1600;
          this.topoData.layer.height = 900;
        }
        if (this.layerWHTemp == '') {
          var wh = this.topoData.layer.width + 'x' + this.topoData.layer.height;
          if (this.whOptions.indexOf(wh, 0) == -1) {
            this.layerWHTemp = 'custom';
          } else {
            this.layerWHTemp = wh;
          }
        } else {
          var wh = this.topoData.layer.width + 'x' + this.topoData.layer.height;
          if (this.whOptions.indexOf(wh, 0) == -1) {
            this.layerWHTemp = 'custom';
          }
        }
        return this.layerWHTemp;
      },
      set: function (val) {
        this.layerWHTemp = val;
        if (val == 'custom') {

        } else {
          var wh = val.split('x');
          this.topoData.layer.width = parseInt(wh[0]);
          this.topoData.layer.height = parseInt(wh[1]);
        }
      }
    },
    ...mapState({
      topoData: state => state.topoEditor.topoData,
      selectedComponents: state => state.topoEditor.selectedComponents,
      selectedComponentMap: state => state.topoEditor.selectedComponentMap,
      isLayer: state => state.topoEditor.selectedIsLayer,
      configObject: state => state.topoEditor.selectedComponent,
    }),
    animations () {
      let items = [];
      if (this.configObject.type == 'dashed') {
        items = (this.configObject.direction && this.configObject.direction == 'vertical') ?
          [{ label: '向上', value: 'up' }, { label: '向下', value: 'down' }] : [{ label: '向右', value: 'right' }, { label: '向左', value: 'left' }];
      }
      return items;
    }
  },
  methods: {
    initPage (configData) {
      this.configData = configData;
    },
    changeTab (tabIndex) {
      this.tabIndex = tabIndex;
    },
    bindData (configObject, index, isLayer) {
      this.configObject = configObject;
      this.isLayer = isLayer;
      if (isLayer === false) {

      }
    },
    generateTargetComponentOptions () {
      var options = [];
      this.topoData.components.forEach(component => {
        if (this.configObject.identifier != component.identifier) {
          options.push({
            label: component.name || component.type,
            value: component.identifier
          });
        }
      });
      return options;
    },
    removeAction (index) {
      this.configObject.action.splice(index, 1);
    },
    addAction () {
      var action = {
        type: 'click',
        action: 'visible',
        showItems: [],
        hideItems: []
      };
      this.configObject.action.push(action);
    }
  },
  mounted () {

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
    background-color: white;

    .topo-properties-tab {
      height: 35px;
      text-align: center;
      line-height: 35px;
      flex: 1;
      color: #666;
    }

    .topo-properties-tab + .topo-properties-tab {
      border-left: #ccc solid 1px;
    }

    .topo-properties-tab:hover {
      cursor: pointer;
    }

    .topo-properties-tab-active {
      color: #000;
      border-bottom: #3388ff solid 2px;
      font-weight: bold;
    }
  }

  .topo-properties-table {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 92px);

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
