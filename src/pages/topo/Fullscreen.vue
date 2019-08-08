<template>
    <div class="topo-fullscreen">        
        <TopoRender />
    </div>
</template>

<script>

import TopoRender from '@/components/topo/TopoRender';

export default {
    name: 'TopoFullscreen',
    components: {
        TopoRender
    },
    methods: {

    },
    created() {

    },
    mounted() {
        alert("dfdf");
    }

}
</script>

<style lang="scss">
    .topo-fullscreen {
        height: 100vh;
        width: 100%;
    }
</style>


