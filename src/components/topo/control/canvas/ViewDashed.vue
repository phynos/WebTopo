<template>
  <canvas
    ref="elCanvas"
    :width="detail.style.position.w"
    :height="detail.style.position.h"
  >Your browser does not support the HTML5 canvas tag.</canvas>
</template>

<script>
import canvasView from "./ViewCanvas";
let stop = null;
// 虚线
export default {
  name: "ViewDashed",
  extends: canvasView,
  computed: {
    //虚线样式
    setLineDash () {
      let setLineDash = this.detail.style.setLineDash ? this.detail.style.setLineDash.split(',') : [5, 5];
      return setLineDash;
    },
    //点之间的间隔
    dotSpace () {
      return this.detail.style.dotSpace || 10;
    },
    //点宽度
    dotWidth () {
      return this.detail.style.dotWidth || 5;
    }
  },
  methods: {
    drawLine (options) {
      let x1 = options.x1, y1 = options.y1, x2 = options.x2, y2 = options.y2, lineWidth = options.lineWidth, color = options.color;
      var el = this.$refs.elCanvas;
      var ctx = el.getContext("2d");

      // console.log('setLineDash :', setLineDash);
      /**
       * 第一个参数用于规定第一个虚线的长度。
       * 第二个参数用于规定第一个虚线与第二个虚线之间的间隔。
       * 第三个参数用于规定第二个虚线的长度。
       */
      ctx.setLineDash(this.setLineDash);
      ctx.lineWidth = lineWidth; //设置线宽状态
      ctx.strokeStyle = color; //设置线的颜色状态
      ctx.beginPath();
      ctx.moveTo(x1, y1); //设置起点状态
      ctx.lineTo(x2, y2); //设置末端状态
      ctx.stroke(); //进行绘制
      ctx.closePath();
    },
    onResize () {
      var w = this.detail.style.position.w;
      var h = this.detail.style.position.h;
      var el = this.$refs.elCanvas;
      var ctx = el.getContext("2d");
      ctx.clearRect(0, 0, w, h);
      var x1 = 0,
        y1 = h / 2,
        x2 = w,
        y2 = h / 2;
      var color = this.getForeColor();
      var lineWidth = this.detail.style.lineWidth;
      // console.log('lineWidth :', lineWidth, typeof lineWidth);
      if (lineWidth == undefined) {
        lineWidth = 2;
      }
      if (this.detail.direction && this.detail.direction == "vertical") {
        //竖线
        x1 = w / 2;
        x2 = w / 2;
        y1 = 0;
        y2 = h;
      }
      //使用动画
      let animations = this.detail.style.animations;
      // console.log('animations :', animations);
      let options = { x1: x1, y1: y1, x2: x2, y2: y2, lineWidth: lineWidth, color: color };
      if (animations && animations.value) {
        switch (animations.value) {
          case "up":
            this.drawColUpLine(options);
            break;
          case "right":
            this.drawRowRightLine(options);
            break;
          case "down":
            this.drawColDownLine(options);
            break;
          case "left":
            this.drawRowLeftLine(options);
            break;
        }
      } else {
        cancelAnimationFrame(stop);//可以取消该次动画。
        this.drawLine(options);
      }
    },
    //循环执行
    doLopo (el, ctx, drawLine) {
      // 画布渲染
      var render = function () {
        // 清除画布
        ctx.clearRect(0, 0, el.width, el.height);
        // 绘制(在canvas画布上绘制图形的代码)
        drawLine();
        // 继续渲染
        stop = requestAnimationFrame(render);
      };
      render();
    },
    //动态画横线-右
    drawRowRightLine (options) {
      let x1 = options.x1, y1 = options.y1, x2 = options.x2, y2 = options.y2, lineWidth = options.lineWidth, color = options.color;
      var el = this.$refs.elCanvas;
      var ctx = el.getContext("2d");
      ctx.lineWidth = lineWidth; //设置线宽状态
      ctx.strokeStyle = color; //设置线的颜色状态
      let dotSpace = this.dotSpace;
      let dotWidth = this.dotWidth;
      let dotsNum = x2 / dotSpace;
      let index = 0;
      function drawLine () {
        index++;
        //生成线
        for (let i = 0; i < dotsNum; i++) {
          let x = x1 + dotSpace * i + index;
          ctx.beginPath();
          ctx.moveTo(x, y1); //设置起点状态
          ctx.lineTo(x + dotWidth, y2); //设置末端状态
          ctx.stroke(); //进行绘制

          ctx.closePath();
        }
        if (index == dotSpace) {
          index = 0;
        }
      }
      this.doLopo(el, ctx, drawLine);
    },
    //动态画横线-左
    drawRowLeftLine (options) {
      let x1 = options.x1, y1 = options.y1, x2 = options.x2, y2 = options.y2, lineWidth = options.lineWidth, color = options.color;
      var el = this.$refs.elCanvas;
      var ctx = el.getContext("2d");
      ctx.lineWidth = lineWidth; //设置线宽状态
      ctx.strokeStyle = color; //设置线的颜色状态
      let dotSpace = this.dotSpace;
      let dotWidth = this.dotWidth;
      let dotsNum = x2 / dotSpace;
      let index = 0;
      function drawLine () {
        index++;
        //生成线
        for (let i = dotsNum; i > 0; i--) {
          let x = x1 + dotSpace * i - index;
          ctx.beginPath();

          ctx.moveTo(x, y1); //设置起点状态
          ctx.lineTo(x - dotWidth, y2); //设置末端状态
          ctx.stroke(); //进行绘制

          ctx.closePath();
        }
        if (index == dotSpace) {
          index = 0;
        }
      }
      this.doLopo(el, ctx, drawLine);
    },
    //动态画向上竖线
    drawColUpLine (options) {
      let x1 = options.x1, y1 = options.y1, x2 = options.x2, y2 = options.y2, lineWidth = options.lineWidth, color = options.color;
      console.log("drawColUpLine:", x1, y1, x2, y2, lineWidth, color); //15 0 15 200 2 grey
      var el = this.$refs.elCanvas;
      var ctx = el.getContext("2d");
      ctx.lineWidth = lineWidth; //设置线宽状态
      ctx.strokeStyle = color; //设置线的颜色状态
      let dotSpace = this.dotSpace;
      let dotWidth = this.dotWidth;
      let dotsNum = y2 / dotSpace;
      let index = 0;
      function drawLine () {
        index++;
        //生成线
        for (let i = dotsNum; i > 0; i--) {
          let y = y1 + dotSpace * i - index;
          ctx.beginPath();
          ctx.moveTo(x1, y); //设置起点状态
          ctx.lineTo(x2, y - dotWidth); //设置末端状态
          ctx.stroke(); //进行绘制

          ctx.closePath();
        }
        if (index == dotSpace) {
          index = 0;
        }
      }
      this.doLopo(el, ctx, drawLine);
    },
    //动态画向下竖线
    drawColDownLine (options) {
      let x1 = options.x1, y1 = options.y1, x2 = options.x2, y2 = options.y2, lineWidth = options.lineWidth, color = options.color;
      var el = this.$refs.elCanvas;
      var ctx = el.getContext("2d");
      let dotSpace = this.dotSpace;
      let dotWidth = this.dotWidth;
      ctx.lineWidth = lineWidth; //设置线宽状态
      ctx.strokeStyle = color; //设置线的颜色状态

      let dotsNum = y2 / dotSpace;
      let index = 0;
      function drawLine () {
        index++;
        //生成线
        for (let i = 0; i < dotsNum; i++) {
          let y = y1 + dotSpace * i + index;
          ctx.beginPath();

          ctx.moveTo(x1, y); //设置起点状态
          ctx.lineTo(x2, y + dotWidth); //设置末端状态
          ctx.stroke(); //进行绘制

          ctx.closePath();
        }
        if (index == dotSpace) {
          index = 0;
        }
      }
      this.doLopo(el, ctx, drawLine);
    }
  },
  mounted () {
    this.onResize();
  }
};
</script>
