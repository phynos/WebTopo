<template>
<canvas ref="view-line" :width="detail.style.position.w" :height="detail.style.position.h">
Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas';

export default {
    name: 'view-line',
    extends: canvasView,
    methods: {
        drawLine(x1, y1, x2, y2, lineWidth, color) {
            var el = this.$refs['view-line'];
            var ctx = el.getContext("2d");
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
            var el = this.$refs['view-line'];
            var ctx = el.getContext("2d");
            ctx.clearRect(0, 0, w, h);
            var x1 = 0,
                y1 = h / 2,
                x2 = w,
                y2 = h / 2;
            var color = this.getForeColor();
            var lineWidth = this.detail.style.lineWidth;
            if(lineWidth == undefined || typeof lineWidth != 'number') {
                lineWidth = 2;
            }
            this.drawLine(x1, y1, x2, y2, lineWidth, color);
        }
    },
    mounted() {
        this.onResize();
    }
}
</script>
