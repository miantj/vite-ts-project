<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'proj4leaflet'

const CRS_900913 = new L.Proj.CRS(
    'EPSG:900913',
    '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
    {
        resolutions: (function () {
            var res = []
            res[0] = Math.pow(2, 18)
            for (var i = 1; i < 19; i++) {
                res[i] = Math.pow(2, 18 - i)
            }
            return res
        })(),
        origin: [0, 0],
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244]),
    }
)

const initMap = () => {
    var map = L.map('container', {
        // minZoom: 3,
        // maxZoom: 13,
        center: [23.14268, 113.338371], // 地图中心
        zoom: 9, //缩放比列
        crs: CRS_900913,
    })

    L.tileLayer(`http://${window.location.host}/src/assets/newtask/{z}/{x}/{y}.png`, {
        minZoom: 9,
        maxZoom: 9,
        tms: true,
    }).addTo(map)
    L.marker([23.14268, 113.338371]).addTo(map).bindPopup('广州世安').openPopup()
}

onMounted(() => {
    initMap()
})
</script>

<template>
    <div id="container" style="height: 80vh; width: 100%"></div>
</template>

<style lang="scss" scoped>
#mapview {
    height: calc(100vh - 86px);
}

:deep(.amap-marker-label) {
    border: none !important;
}
</style>
