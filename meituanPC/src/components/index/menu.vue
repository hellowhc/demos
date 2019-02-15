<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="menuLeave">
            <dt>全部分类</dt>
            <dd v-for="(item, index) in menuList" :key="index" @mouseenter="menuEnter(item)">
                <i :class="item.type"></i>
                {{item.title}}
                <span class="arrow"></span>
            </dd>
        </dl>
        <div v-if="curDetail" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
            <template v-for="(item, index) in curDetail.itemList" >
                <h4 :key="index">{{item.title}}</h4>
                <span v-for="(v, i) in item.items" :key="v + '_'+ i">{{v}}</span>
            </template>
        </div>
    </div>
</template>
<script>
import api from '@/api/index.js'
export default {
    data() {
        return {
            curDetail: null,
            menuList:  [
        {
          type: "food",
          title: "吃喝玩乐",
          itemList: [
            {
              title: "美食",
              items: ["香蕉", "苹果", "梨子", "自助餐", "小吃快餐"]
            },
            {
              title: "火锅",
              items: ["麻辣", "三鲜", "鸳鸯", "自助餐", "小吃快餐"]
            },
            {
              title: "pap",
              items: ["sdsd", "dsd", "火dsd", "自助餐", "小吃快餐"]
            }
          ]
        },
         {
          type: "food",
          title: "美食",
          itemList: [
            {
              title: "吃的",
              items: ["香蕉dfdf", "苹果jhjhkjkjk", "梨子", "自助餐", "小吃快餐"]
            },
            {
              title: "喝的",
              items: ["麻辣jhjhj", "三鲜", "鸳鸯", "自助餐", "小吃快餐"]
            },
            {
              title: "练的",
              items: ["sdsd", "dsd", "火dsd", "自助餐", "小吃快餐"]
            }
          ]
        },
         {
          type: "food",
          title: "电影",
          itemList: [
            {
              title: "学的",
              items: ["香lkk蕉", "苹果", "梨子", "自助餐", "小吃快餐"]
            },
            {
              title: "火锅",
              items: ["麻辣gfdgsg", "三鲜dsfdsf", "鸳鸯", "自助餐", "小吃快餐"]
            },
            {
              title: "pap",
              items: ["sdsd", "dsd", "火dsd", "自助餐", "小吃快餐"]
            }
          ]
        },
       
      ],
        }
    },
    created() {
        // api.getMenuList().then(res => {
        //     if (res.data.status == 'success') {
        //         this.menuList = res.data.data;
        //     }
        // } )
    },
    methods: {
        menuEnter(item) {
            this.curDetail = item;
        },
        menuLeave() {
            var self = this;
            this.timer = setTimeout(function () {
                self.curDetail = null;
            }, 200);
        },
        detailEnter() {
            clearTimeout(this.timer);
        },
        detailLeave() {
            this.curDetail = null;
        }
    }
}
</script>

