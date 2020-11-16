<template>
  <div class="topo-toolbox">
    <q-list highlight separator class="full-height">
      <template v-for="(group,index1) in toolbox">
        <q-expansion-item :icon="group.icon" :label="group.title" v-bind:key="index1">
          <div class="toolbox-group">
            <template v-for="(value,index) in group.items">
              <div
                class="toolbox-item"
                v-bind:key="index"
                draggable="true"
                @dragstart="onDragstart($event,value)"
              >
                <!-- 判断是不是字体图标 -->
                <template v-if="value.isFontIcon === true">
                  <div class="toolbox-item-icon">
                    <q-icon :name="value.icon" size="30px" />
                  </div>
                  <div class="toolbox-item-text">{{value.text}}</div>
                </template>
                <!-- 阿里巴巴矢量图标 -->
                <template v-else-if="value.isFontIcon === 1">
                  <div class="item-icon">
                    <i class="icon iconfont" :class="value.icon"></i>
                  </div>
                  <div class="toolbox-item-text">{{ value.text }}</div>
                </template>
                <template v-else>
                  <div class="toolbox-item-icon">
                    <img class="topo-dom" :src="value.icon" style="width: 40px;height: 40px;" />
                  </div>
                  <div class="toolbox-item-text">{{value.text}}</div>
                </template>
              </div>
            </template>
          </div>
        </q-expansion-item>
      </template>
    </q-list>
  </div>
</template>

<script>
import jsonBase from './data-toolbox/base.json';
import jsonChart from './data-toolbox/chart.json';
import jsonOffice from './data-toolbox/office.json';
import jsonSvg from './data-toolbox/svg.json';
import jsonSvgDianli from './data-toolbox/svg-dianli.json';
export default {
  name: 'TopoToolbox',
  data () {
    return {
      toolbox: [

      ],
      selectedIndex: -1,
    }
  },
  methods: {
    onDragstart (event, info) {
      var infoJson = JSON.stringify(info.info);
      event.dataTransfer.setData('my-info', infoJson);
    },
  },
  mounted () {
    this.toolbox = [];
    this.toolbox.push(jsonBase);
    this.toolbox.push(jsonChart);
    this.toolbox.push(jsonOffice);
    this.toolbox.push(jsonSvg);
    //this.toolbox.push(jsonSvgDianli);        
  }
}
</script>

<style lang="scss">
.topo-toolbox {
  border: #ccc solid 1px;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;

  .toolbox-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-between;

    .toolbox-item {
      width: 70px;
      margin: 10px 5px;
      padding: 5px;
      color: #777;
      border: transparent solid 1px;
      &.base {
        width: 64px;
      }
      .toolbox-item-icon {
        text-align: center;
      }

      .toolbox-item-text {
        margin-top: 10px;
        text-align: center;
      }
    }

    .toolbox-item:hover {
      border: #ccc solid 1px;
      background: #ccc;
      color: #3388ff;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss" scoped>
.item-icon {
  height: 30px;
  .iconfont {
    font-size: 30px;
    margin-left: 14px;
  }
}
</style>