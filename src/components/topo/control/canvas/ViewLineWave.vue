<template>
<canvas ref="view-line-wave" :width="detail.style.position.w" :height="detail.style.position.h">
    Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas';

export default {
    name: 'view-line-wave',
    extends: canvasView,
    methods: {
        drawLine(ctx, width, height , lineWidth, color) {
            let len = Math.sqrt(width * width + height * height);
            // 起点 
            this.ctx.beginPath();
            let x = 0;
            let y = 0;
            let amplitude = 5;
            // 振幅 
            let frequency = 5;
            // 频率 
            while (x < len) {
                y = amplitude * Math.sin(x / frequency);
                this.ctx.lineTo(x, y);
                x = x + 1;
            }
            ctx.stroke();
        },
        onResize() {
            var w = this.detail.style.position.w;
            var h = this.detail.style.position.h;
            var el = this.$refs['view-line-wave'];
            var ctx = el.getContext("2d");
            ctx.clearRect(0, 0, w, h);
            var color = this.getForeColor();
            var lineWidth = this.detail.style.lineWidth;
            if (lineWidth == undefined || typeof lineWidth != 'number') {
                lineWidth = 2;
            }
            this.drawLine(ctx, w, h, lineWidth, color);
        }
    },
    mounted() {
        this.onResize();
    }
}
</script>
