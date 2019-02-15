<template>
    
    <div class="note-change">
        <i 
            class="glyphicon glyphicon-plus"
            @click="add"></i>
        <i class="glyphicon glyphicon-heart"
            @click="changeFav"
            :class="{'isFav':favArt.isFav}"
        ></i>
        <i 
        @click="deleteL"
        class="glyphicon glyphicon-remove"
        ></i>
    </div>

</template>

<script>

import {mapMutations,mapState,mapGetters} from 'vuex';
    
    export default{
        methods:{
            ...mapMutations(['add','changeFav','deleteL']),
        },
        computed:{
            ...mapState(['favArt']),
            
        }
    }


</script>

<style>
.note-change{
    width: 80px;
    height: 100%;
    background: rgba(17, 78, 158, 0.336);
    float: left;
    text-align: center;
}
.note-change>i{
    font-size: 30px;
    margin-bottom: 20px;
    display: block; 
    cursor: pointer;
}
.note-change>i.isFav{
    color: red;
}
</style>
