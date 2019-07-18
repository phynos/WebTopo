<template>
<canvas ref="view-line-arrow" :width="detail.style.position.w" :height="detail.style.position.h">
Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas';

export default {
    name: 'view-line-arrow',
    extends: canvasView,
    methods: {
        drawArrow(ctx, x1, y1, x2, y2, color) { // (x1, y1)是线段起点  (x2, y2)是线段终点
            ctx.beginPath();
            // 反正切函数计算夹角     
            let endRadians = Math.atan((y2 - y1) / (x2 - x1));
            // 三角形的底边与线段垂直，所以还要再转 π / 2   
            endRadians += ((x2 >= x1) ? 90 : -90) * Math.PI / 180;
            ctx.beginPath(); // 坐标原点 => (x2, y2)   
            ctx.translate(x2, y2);
            ctx.rotate(endRadians);
            ctx.moveTo(0, 0);
            ctx.lineTo(5, 15);
            ctx.lineTo(-5, 15);
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
            var el = this.$refs['view-line-arrow'];
            var ctx = el.getContext("2d");
            ctx.clearRect(0, 0, w, h);
            var x1 = 0,
                y1 = h / 2,
                x2 = w,
                y2 = h / 2;
            var color = this.getForeColor();
            var lineWidth = this.detail.style.lineWidth;
            if (lineWidth == undefined || typeof lineWidth != 'number') {
                lineWidth = 2;
            }
            this.drawLine(ctx, x1, y1, x2, y2, lineWidth, color);
            this.drawArrow(ctx, x1, y1, x2, y2, color);
        }
    },
    mounted() {
        this.onResize();
    }
}
</script>
