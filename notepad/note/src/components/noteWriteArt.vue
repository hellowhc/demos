<template>
    <div class="Write-wrapper">
         <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="input" class="form-control" id="exampleInputEmail1" v-model="TVal">
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Content</label>
            <textarea type="text" id="exampleInputPassword1" class="form-control" :value="artContent" @input="editArticle({content: $event.target.value})"/>
        </div>
    </div>
   
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex';

    export default{
        computed:{
            TVal:{
                set(){
                    return this.$store.getters.tiCon 
                },
                get(value){
                   this.$store.commit('editArticle', {title: value})
                }
            },
             ...mapGetters(['artContent']),
        },
        methods:{
            ...mapMutations(['editArticle'])
        }

    }


</script>

<style>
    .Write-wrapper{
        width: 600px;
        height: 100%;
        border: 1px solid #ccc;
        float: left;
    }
    #exampleInputPassword1{
        width: 100%;
        height: 500px;
        border: 1px solid #ccc;
        display: block;
        
    }

</style>