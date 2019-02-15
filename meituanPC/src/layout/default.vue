<template>
    <el-container class="layout-default">
        <el-header height="">
            <my-header />
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer height="">
            <my-footer />
        </el-footer>
    </el-container>

</template>
<script>
import myHeader from '@/components/header/index.vue'
import myFooter from '@/components/footer/index.vue'
import api from '@/api/index.js'
export default {
    components: {
        myHeader,
        myFooter
    },
    computed: {
    
    },
    created() {
        api.getCurPoisition().then((res) => {
            console.log(res.data.data);
            this.$store.dispatch('setPosition', res.data.data)
        })
        
    }
}
</script>

<style lang="scss">
    @import '@/assets/css/public/layout.scss'
</style>
