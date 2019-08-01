<template>
<div class="topo-editor">
    <wresize-panel-3 class="full-height">
        <template v-slot:left>
            <topo-toolbox ref="topoToolbox" class="topo-toolbox" />
        </template>

        <template v-slot:center>
            <topo-main ref="topoMain" class="topo-main" :onClickItem="bindData" />
        </template>

        <template v-slot:right>
            <topo-properties ref="topoProperties" class="topo-properties" />
        </template>
    </wresize-panel-3>
</div>
</template>

<script>
import WresizePanel3 from '@/components/panel/WresizePanel3';

import TopoToolbox from '@/components/topo/TopoToolbox';
import TopoMain from '@/components/topo/TopoMain';
import TopoProperties from '@/components/topo/TopoProperties';

export default {
    name: 'TopoEditor',
    components: {
        WresizePanel3,
        TopoToolbox,
        TopoMain,
        TopoProperties
    },
    data() {
        return {

        }
    },
    methods: {
        bindData(configData, type, index) {
            this.$refs.topoProperties.bindData(configData, type, index);
        },
    }
}
</script>

<style lang="scss">
.topo-editor {
    padding: 10px;
    position: relative;
    width: 100%;
    height: calc(100vh - 0px);
    background-color: #eee;

    .topo-toolbox {
        width: 100%;
        height: 100%;
    }

    .topo-main {
        width: 100%;
        height: 100%;
    }

    .topo-properties {
        width: 100%;
        height: 100%;
    }
}
</style>
