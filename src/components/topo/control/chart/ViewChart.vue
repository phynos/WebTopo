<template>
<div class="view-chart" ref="chartView">
    Click to bind data.
</div>
</template>

<script>
import echarts from "echarts";
import BaseView from '../View';

export default {
    name: 'ViewChart',
    extends: BaseView,
    props: {

    },
    watch: {
        detail: function (newVal) {
            this.setOption(this.option);
        },
    },
    data() {
        return {
            echart: null,
            dataStepLine: [100, 0, 100, 100, 0, 0, 100],
            dataLine: [820, 932, 901, 934, 1290, 1330, 1320],
            option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    silent: true
                },
                yAxis: {
                    type: 'value',
                    silent: true
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    clickable: false,
                    type: 'line',
                    smooth: true
                }]
            }
        }
    },
    methods: {
        initPage(timeout) {
            var _this = this;
            setTimeout(() => {
                _this.setOption(_this.option);
            }, timeout || 100);
        },
        setOption(option) {
            if (this.echart) {
                this.echart.dispose();
            }
            if (this.detail.type === 'chart-line') {
                this.option.series[0].type = 'line';
                this.option.series[0].data = this.dataLine;
                delete this.option.series[0]['step'];
                this.option.series[0]['smooth'] = true;
            } else if (this.detail.type == 'chart-line-step') {
                this.option.series[0].type = 'line';
                this.option.series[0].data = this.dataStepLine;
                this.option.series[0].step = 'start';
                delete this.option.series[0]['smooth'];
            } else if (this.detail.type == 'chart-bar') {
                this.option.series[0].type = 'bar';
                this.option.series[0].data = this.dataLine;
                delete this.option.series[0]['step'];
            }
            let view = this.$refs.chartView;
            this.echart = echarts.init(view);
            this.echart.setOption(option);
        },
        onResize() {
            if (this.echart) {
                this.echart.resize();
            }
        },
        updateView() {
            this.setOption(this.option);
        }
    },
    mounted() {
        this.initPage(100);
    }
}
</script>

<style lang="scss">
.view-chart {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
