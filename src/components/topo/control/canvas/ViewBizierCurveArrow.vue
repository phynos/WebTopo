<template>
  <div
    class="view-bizier-curve-arrow"
    @mousemove="onMousemove($event)"
    @mouseup="onMouseUp($event)"
  >
    <canvas
      ref="elCanvas"
      :width="detail.style.position.w"
      :height="detail.style.position.h"
    >Your browser does not support the HTML5 canvas tag.</canvas>

    <template v-if="editMode && selected">
      <template v-for="(pass,index) in points">
        <div
          :key="index"
          class="passby"
          @mousedown.stop="aroowPassDown(pass,$event,index)"
          :style="{
                            left: pass.x - 5 + 'px',
                            top: pass.y - 5 + 'px',                           
                        }"
        ></div>
      </template>
    </template>
  </div>
</template>

<script>
import canvasView from './ViewCanvas';

export default {
  name: 'ViewBizierCurveArrow',
  extends: canvasView,
  data () {
    return {
      lineWidth: 2,
      flag: false,
      passItem: {},
      points: [], //控制点（包含起始和终点）
      FACTOR_H: 5, //箭头 水平高度倍数
      FACTOR_V: 4, //箭头 垂直长度倍数
    }
  },
  methods: {
    drawLine (ctx) {
      var lineWidth = this.lineWidth,
        color = this.getForeColor();
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      ctx.bezierCurveTo(
        this.points[1].x,
        this.points[1].y,
        this.points[2].x,
        this.points[2].y,
        this.points[3].x,
        this.points[3].y);
      ctx.lineWidth = lineWidth; //设置线宽状态
      ctx.strokeStyle = color; //设置线的颜色状态
      ctx.stroke(); //进行绘制
      ctx.closePath();
    },
    reDraw () {
      var w = this.detail.style.position.w;
      var h = this.detail.style.position.h;
      var el = this.$refs.elCanvas;
      var ctx = el.getContext("2d");
      ctx.clearRect(0, 0, w, h);
      this.drawLine(ctx);
    },
    onResize () {
      this.reDraw();
    },
    aroowPassDown (pass, event, index) {
      this.flag = true;
      pass.startX = event.pageX;
      pass.startY = event.pageY;
      pass.temp = {};
      pass.temp.x = pass.x;
      pass.temp.y = pass.y;
      this.passItem = pass;
    },
    onMousemove (event) {
      if (!this.flag)
        return;
      event.cancelBubble = true;
      var dx = event.pageX - this.passItem.startX,
        dy = event.pageY - this.passItem.startY;
      this.passItem.x = this.passItem.temp.x + dx;
      this.passItem.y = this.passItem.temp.y + dy;
      this.reDraw();
    },
    onMouseUp (event) {
      this.flag = false;
    }
  },
  mounted () {
    var lineWidth = this.detail.style.lineWidth;
    if (lineWidth == undefined) {
      lineWidth = 2;
    } else if (typeof lineWidth == 'string') {
      lineWidth = parseInt(lineWidth);
    }
    this.points = this.detail.style.points;
    //增加2个中间节点，应该可以动态控制，这里暂时写死    
    this.onResize();
  }
}
</script>

<style lang="scss">
.view-bizier-curve-arrow {
  height: 100%;
  width: 100%;
  position: relative;

  .passby {
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: white;
    border: 1px solid rgb(34, 14, 223);
    cursor: move;
  }
}
</style>
