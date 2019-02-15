<template>
    <div class="list-wrapper">
        <div class="header">
            <h2>My Note</h2>
            <button 
                class="btn " 
                :class="{'isFav':isAll}"
                @click="isAll=true"
            >All NOTE</button>
            <button 
                class="btn"
                :class="{'isFav':!isAll}"
                @click=" isAll=false "
            >FAV Note</button>
        </div>
        <div class="listArt">
           <p 
            v-for="(item,index) in (isAll ? list : favList) " :key="index"
                :class="{'isAct':$store.state.favArt==item}"
                @click="changeAct(item)"
            >{{ item.title}}
           </p>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapGetters} from 'vuex';
    export default{
        data(){
            return{
                isAll:true
            }
        },
        computed:{
           ...mapState(['ListArt']),
           ...mapGetters(['favList']),
             list(){
                 console.log(this.isAll)
                    return this.$store.state.ListArt
            }
        },
        methods:{
         ...mapMutations(['changeAct']),
        }
    }

</script>

<style>
    
    .list-wrapper{
        width: 300px;
        height: 100%;
        border: 1px solid black;
        float: left;
       
    }
    .listArt{
        width: 100%;
        height: 85%;
         overflow: auto;
    }
    .header{
        width: 100%;
        height: 15%;
        border-bottom: 1px solid #ccc;
    }
    p{
        font-size: 20px;
        padding: 8px 0px;
    }
    .isAct{
        background: #07408b;
        color: white;
    }
    .isFav{
        background: blue;
    }
</style>