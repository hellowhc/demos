<template>
  <div class="m-life">
    <el-row>
      <ul class="nav">
        <li>
          <router-link to="/" class="takeout">美团外卖</router-link>
        </li>
        <li>
          <router-link to="/" class>猫眼电影</router-link>
        </li>
        <li>
          <router-link to="/" class>美团酒店</router-link>
        </li>
        <li>
          <router-link to="/" class="apartment">民宿/公寓</router-link>
        </li>
        <li>
          <router-link to="/" class="business">商家入驻</router-link>
        </li>
        <li>
          <router-link to="/" class>美团公益</router-link>
        </li>
      </ul>
    </el-row>
    <el-row>
      <el-col :span="14">
        <slider/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <h4>
            <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt>
          </h4>

          <p class="m-life-login-name">{{$store.state.user ? $store.state.user: 'Hi,你好'}}</p>
          <p v-if="!$store.state.user">
            <router-link :to="{name: 'register'}">
              <el-button round>注册</el-button>
            </router-link>
          </p>
          <p v-if="!$store.state.user">
            <router-link :to="{name: 'login'}">
              <el-button round>立即登陆</el-button>
            </router-link>
          </p>
        
            <div v-else class="item clearfix">
              <div class="fn-item">
                <a href="https://www.meituan.com/orders/ " target="_blank">
                  <div class="icon">
                    <i class="el-icon-document"></i>
                  </div>
                  <p class="fn-name">我的订单</p>
                </a>
              </div>
              <div class="fn-item">
                <a href="https://www.meituan.com/collections/" target="_blank">
                  <div class="icon">
                    <i class="el-icon-star-on"></i>
                  </div>
                  <p class="fn-name">我的收藏</p>
                </a>
              </div>
              <div class="fn-item">
                <a href="https://www.meituan.com/vouchers/" target="_blank">
                  <div class="icon">
                    <i class="el-icon-tickets"></i>
                  </div>
                  <p class="fn-name">抵用券</p>
                </a>
              </div>
              <div class="fn-item">
                <a href="https://www.meituan.com/orders/ " target="_blank">
                  <div class="icon">
                    <i class="el-icon-document"></i>
                  </div>
                  <p class="fn-name">我的订单</p>
                </a>
              </div>
              <div class="fn-item">
                <a href="https://www.meituan.com/collections/" target="_blank">
                  <div class="icon">
                    <i class="el-icon-star-on"></i>
                  </div>
                  <p class="fn-name">我的收藏</p>
                </a>
              </div>
            </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"></div>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"></div>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP">
          <p>美团APP手机版</p>
          <p class="last-p">
            <span class="red">1元起</span>
            吃喝玩乐
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Slider from "./slider.vue";
export default {
  components: {
    Slider
  }
};
</script>
<style lang="scss">
@import "@/assets/css/index/life.scss";
</style>

