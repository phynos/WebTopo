<template>
<canvas ref="elCanvas" :width="detail.style.position.w" :height="detail.style.position.h">
Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas';

export default {
    name: 'ViewLineArrow',
    extends: canvasView,
    data() {
        return {
            FACTOR_H: 5, //箭头 水平高度倍数
            FACTOR_V: 4, //箭头 垂直长度倍数
        }
    },
    methods: {
        drawArrow(ctx, x1, y1, x2, y2,lineWidth, color) { // (x1, y1)是线段起点  (x2, y2)是线段终点
            ctx.beginPath(); // 坐标原点 => (x2, y2)   
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - lineWidth * this.FACTOR_H, y2 - lineWidth * this.FACTOR_V);
            ctx.lineTo(x2 - lineWidth * this.FACTOR_H, y2 + lineWidth * this.FACTOR_V);
            ctx.closePath();
            ctx.fillStyle = color; //设置线的颜色状态
            ctx.fill();
        },
        drawLine(ctx, x1, y1, x2, y2, lineWidth, color) {
            ctx.beginPath();
            ctx.moveTo(x1, y1); //设置起点状态
            ctx.lineTo(x2, y2); //设置末端状态
            ctx.lineWidth = lineWidth; //设置线宽状态
            ctx.strokeStyle = color; //设置线的颜色状态
            ctx.stroke(); //进行绘制
            ctx.closePath();
        },
        onResize() {
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
            if (lineWidth == undefined) {
                lineWidth = 2;
            } else if(typeof lineWidth == 'string') {
                lineWidth = parseInt(lineWidth);
            }
            this.drawLine(ctx, x1, y1, x2 - this.FACTOR_H * lineWidth, y2, lineWidth, color);
            this.drawArrow(ctx, x1, y1, x2, y2, lineWidth, color);
        }
    },
    mounted() {
        this.onResize();
    }
}
</script>
