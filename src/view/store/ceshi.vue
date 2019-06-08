<template>
    <baidu-map class="map" center="北京">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" v-on:locationSuccess="dingweisuccess" :autoLocation="true"></bm-geolocation>
    </baidu-map>
</template>

<style>
    .map {
        width: 100%;
        height: 400px;
    }
</style>
<script>
    export default {
        name: "storeinsert",
        data() {
            return{

            }
        },
        methods:{
            dingweisuccess:function (point, AddressComponent, marker) {
                window.console.log(point);
                window.console.log(AddressComponent);
                window.console.log(marker);
            }
        }
    }
</script>