<template>
<div class="wresize-panel-2" @mouseup="onMouseup($event)" @mousemove="onMousemove($event)">
    <template v-if="fixedWidthMode == 'left'">
        <div class="wresize-panel-left" :style="{width: divLeft.width + 'px'}">
            <slot name="left"></slot>
        </div>

        <div class="wresize-handler" @mousedown="onMouseDownLeft($event)" :style="{left: divHandler.left + 'px'}"></div>

        <div class="wresize-panel-right" :style="{left: divRight.left + 'px'}">
            <slot name="right"></slot>
        </div>
    </template>
    <template v-else>
        <div class="wresize-panel-left" :style="{right: divLeft.right + 'px'}">
            <slot name="left"></slot>
        </div>

        <div class="wresize-handler" @mousedown="onMouseDownRight($event)" :style="{left: divHandler.right + 'px'}"></div>

        <div class="wresize-panel-right" :style="{width: divRight.width + 'px'}">
            <slot name="right"></slot>
        </div>
    </template>
</div>
</template>

<script>
export default {
    name: 'wresize-panel-2',
    props: {
        fixedWidth: { 
            type: Number,
            default: 200
        },
        fixedWidthMode: { //左边还是右边定宽
            type: String,
            default: "left"
        },
        onResize: {
            type: Function,
            default: undefined
        }
    },
    data() {
        return {
            flag: false,
            disx: 0,
            divLeft: {
                width: this.fixedWidth,
                right: this.fixedWidth + 5,
                temp: 0,
            },            
            divRight: {
                width: this.fixedWidth,
                left: this.fixedWidth + 5,
                temp: 0,
            },
            divHandler: {
                left: this.fixedWidth,
                right: this.fixedWidth,
                temp: 0
            }
        }
    },
    methods: {
        onMouseDownLeft(event) {
            this.flag = true;
            var dom = event.currentTarget;
            this.disx = event.pageX;
            this.divHandler.temp = this.divHandler.left;
            this.divLeft.temp = this.divLeft.width;
            this.divRight.temp = this.divRight.left;
        },
        onMouseDownRight(event) {
            this.flag = true;
            var dom = event.currentTarget;
            this.disx = event.pageX;
            this.divHandler.temp = this.divHandler.right;
            this.divRight.temp = this.divRight.width;
            this.divLeft.temp = this.divLeft.right;
        },
        onMouseup(event) {            
            this.flag = false;
            if(this.onResize) {
                this.onResize();
            }
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
            if (this.fixedWidthMode == "left") {
                this.divHandler.left = this.divHandler.temp + dx;
                this.divLeft.width = this.divLeft.temp + dx;
                this.divRight.left = this.divRight.temp + dx;
            } else {
                this.divHandler.right = this.divHandler.temp - dx;
                this.divRight.width = this.divRight.temp - dx;
                this.divLeft.right = this.divLeft.temp - dx;
            }
        },
    }
}
</script>

<style lang="scss">
.wresize-panel-2 {
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

    .wresize-handler {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 5px;
        cursor: w-resize;
    }
}
</style>
