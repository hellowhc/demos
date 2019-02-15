<template>
  <div>
    <span class="name">按省份选择:</span>
    <m-select
      :list="provinceList"
      title="省份"
      chooseClass="province"
      :value="province"
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
       @change="changeProvince"
    />
    <m-select
      :list="cityList"
      title="城市"
      :value="city"
      chooseClass="city"
      :showWrapperActive="cityActive"
      @change_active="changeCityActive"
      @change="changeCity"
      :disabled="disabledCity"
    />
    <span>直接搜索:</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in searchList" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </div>
</template>
<script>
import MSelect from "./select.vue";
import api from '@/api/index.js';
export default {
  data() {
    return {
      provinceList: [],
      province: "省份",
      cityList: ["哈尔滨", "佳木斯", "牡丹江", "鹤岗"],
      city: "城市",
      cityActive: false,
      provinceActive: false,
      searchList: ["哈尔滨", "佳木斯", "牡丹江", "鹤岗"],
      searchWord: '',
      loading: false,
      disabledCity: true,
    };
  },
  components: {
    MSelect
  },
  created() {
    api.getProvinceList().then((res) => {
      if (res.data.status == 'success') {
        // console.log()
        this.provinceList = res.data.data.map((item) => {
          item.name = item.provinceName;
          return item;
        });
      }
    })
  },
  methods: {
    changeProvinceActive(flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    changeProvince(item) {
        this.province = item.name;
        this.cityList = item.cityInfoList;
        this.disabledCity = false;
    },
    changeCity(item) {
        this.city = item.name;
        this.$store.dispatch('setPosition', item);
        this.$router.push({name: 'index'})
    },
    remoteMethod(val) {
        // 请求后端接口
        console.log(document.cookie, localStorage)
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>


