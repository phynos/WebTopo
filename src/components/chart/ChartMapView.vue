<template>
<div ref="xwin" style="height:100%;width:100%;">

</div>
</template>

<script>
import echarts from "echarts";
import moment from 'moment';

import optionMap from '@/assets/data/chart-map.json';
import geoJson from '@/assets/echarts-map-json/province/henan.json';

export default {
    name: "ChartMapView",
    data() {
        return {
            echart: null,
            isEmpty: true,
        }
    },
    methods: {
        loadData() {
            var option = optionMap;
            echarts.registerMap('henan', geoJson);
            if (this.echart) {
                this.echart.dispose();
            }
            let view = this.$refs.xwin;
            this.echart = echarts.init(view);
            this.echart.setOption(option);
        },
        onResize(size) {
            if (this.echart) {
                this.echart.resize();
            }
        }
    },
    mounted() {

    }
}
</script>
