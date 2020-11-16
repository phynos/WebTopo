<script>

export default {
    name: 'View',
    props: {
        editMode: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        },
        detail: {
            type: Object,
            default: {}
        }
    },
    computed: {
        textAlign: function(){
            if(this.detail.style.textAlign == undefined) {
                return "center";
            } else {
                return this.detail.style.textAlign;
            }
        },
        lineHeight: function() {
            if(this.detail.style.lineHeight == undefined) {
                return this.detail.style.position.h;
            }
            return this.detail.style.lineHeight;
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        refreshData(val,sceneName) {

        },
        onResize() {

        },        
    }
}
</script>
