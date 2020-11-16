<template>
<div class="view-image">
    <template v-if="editMode">
        <template v-if="imageURL != ''">
            <img style="width:100%;height:100%;" :src="detail.style.url" @dragstart.prevent @dragover.prevent @drop.prevent />
        </template>
        <q-icon v-else name="photo_size_select_actual" size="120px" color="light" />
    </template>
    <template v-else>
        <img style="width:100%;height:100%;" :src="imageURL" @dragstart.prevent @dragover.prevent @drop.prevent />
    </template>
</div>
</template>

<script>
import BaseView from './View';
export default {
    name: 'view-image',
    extends: BaseView,
    props: {

    },
    computed: {
        imageURL: function () {
            if (this.detail.style.url == undefined || this.detail.style.url == '') {
                return '';
            } else {
                return this.detail.style.url;
            }
        }
    },
    components: {},
    data() {
        return {

        }
    },
    methods: {

    }

}
</script>

<style lang="scss">
.view-image {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>