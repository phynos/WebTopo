<template>
<div class="view-chart-gauge" ref="chartView">
    Click to bind data.
</div>
</template>

<script>
import echarts from "echarts";
import BaseView from '../View';


export default {
    name: 'ViewChartGauge',
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
            eventValue: '0.00',
            eventUnit: '',
            option: {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                series: [{
                    name: '业务指标',
                    type: 'gauge',
                    detail: {
                        formatter: '{value}%'
                    },
                    data: [{
                        value: 50,
                        name: '完成率'
                    }]
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
        },        
    },
    mounted() {
        if(this.editMode) {
            this.initPage(100);
        }        
    }
}
</script>

<style lang="scss">
.view-chart-gauge {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
