<template>
<div class="wresize-panel-3" @mouseup="onMouseup($event)" @mousemove="onMousemove($event)">

    <div class="wresize-panel-left" :style="{width: divLeft.width + 'px'}">
        <slot name="left"></slot>
    </div>

    <div class="wresize-handler-left" @mousedown="onMouseDownLeft($event)" :style="{left: divLeftHandler.left + 'px'}"></div>

    <div class="wresize-panel-center" :style="{left: divCenter.left + 'px', right: divCenter.right + 'px'}">
        <slot name="center"></slot>
    </div>

    <div class="wresize-handler-right" @mousedown="onMouseDownRight($event)" :style="{right: divRightHandler.right + 'px'}"></div>

    <div class="wresize-panel-right" :style="{width: divRight.width + 'px'}">
        <slot name="right"></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'wresize-panel-3',
    props: {
        leftWidth: {
            type: Number,
            default: 235
        },
        rightWidth: {
            type: Number,
            default: 265
        },
        onResize: {
            type: Function,
            default: undefined
        }
    },
    data() {
        return {
            flag: '',
            disx: 0,
            divLeft: {
                width: this.leftWidth,
                temp: 0,
            },
            divCenter: {
                left: this.leftWidth + 5,
                right: this.rightWidth + 5,
                temp: 0
            },
            divRight: {
                width: this.rightWidth,
                temp: 0,
            },
            divLeftHandler: {
                left: this.leftWidth,
                temp: 0
            },
            divRightHandler: {
                right: this.rightWidth,
                temp: 0
            }
        }
    },
    methods: {
        onMouseDownLeft(event) {
            this.flag = 'left';
            var dom = event.currentTarget;
            this.disx = event.pageX;
            this.divLeftHandler.temp = this.divLeftHandler.left;
            this.divLeft.temp = this.divLeft.width;
            this.divCenter.temp = this.divCenter.left;
        },
        onMouseDownRight(event) {
            this.flag = 'right';
            var dom = event.currentTarget;
            this.disx = event.pageX;
            this.divRightHandler.temp = this.divRightHandler.right;
            this.divRight.temp = this.divRight.width;
            this.divCenter.temp = this.divCenter.right;
        },
        onMouseup(event) {
            if(this.flag == '') {
                return;
            }
            if(this.onResize) {
                this.onResize(this.flag);
            }
            this.flag = '';
        },
        onMousemove(event) {
            if(event.which != 1) {
                if(this.flag != '') {
                    this.flag = '';
                }
                return;
            }
            if(!this.flag) {
                return;
            }
            var dx = event.pageX - this.disx;
            if (this.flag == "left") {
                this.divLeftHandler.left = this.divLeftHandler.temp + dx;
                this.divLeft.width = this.divLeft.temp + dx;
                this.divCenter.left = this.divCenter.temp + dx;
            } else if (this.flag == "right") {
                this.divRightHandler.right = this.divRightHandler.temp - dx;
                this.divRight.width = this.divRight.temp - dx;
                this.divCenter.right = this.divCenter.temp - dx;
            }
        },
    }
}
</script>

<style lang="scss">
.wresize-panel-3 {
    position: relative;

    .wresize-panel-left {
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0px;
    }

    .wresize-panel-center {
        position: absolute;
        top: 0px;
        bottom: 0px;
    }

    .wresize-panel-right {
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
    }

    .wresize-handler-left {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 5px;
        cursor: w-resize;
    }

    .wresize-handler-right {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 5px;
        cursor: w-resize;
    }
}
</style>
