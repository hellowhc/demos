<template>
    <div class="m-geo">
        <div class="position">
            <i class="el-icon-location" />
            {{$store.state.position.name}}
            <router-link class="changeCity" :to="{name: 'changeCity'}">切换城市</router-link>
            [
               <a href="#" v-for="item in $store.state.position.nearCity" :key="item.id">{{item.name}}</a>
            ]
        </div>
        <div class="m-user" v-if="!$store.state.user">
            <router-link class="login" :to="{name: 'login'}">立即登录</router-link>
            <router-link class="register" :to="{name: 'register'}">注册</router-link>
        </div>
        <div class="m-user" v-else>
             <router-link class="login" :to="{name: 'user'}">{{$store.state.user}}</router-link>
            <router-link class="register" :to="{name: 'exit'}">推出</router-link>

        </div>
    </div>
</template>

<script>
export default {

}
</script>


