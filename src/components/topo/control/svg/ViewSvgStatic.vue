<template>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" :width="detail.style.position.w" :height="detail.style.position.h" style="pointer-events: none;" v-html="svgContent">
    
</svg>    
</template>

<script>
import svgView from './ViewSvg';

export default {
    name: 'ViewSvgStatic',
    extends: svgView,
    data(){
        return  {
            svgContent: ''
        }
    },
    methods: {   
        loadData() {
            var that = this;
            this.$axios.get(this.svgURL)
            .then(function (response) {
                console.log(response);                
                that.svgContent = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },  
        onResize() {
            
        }
    },
    mounted() {
        this.loadData();
    }
}
</script>
