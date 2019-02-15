import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        ListArt:[],
        favArt:{}
    },
    getters:{
        favList(state){
            return state.ListArt.filter( art => art.isFav)
        },
        artContent(state) {
            return state.favArt.content
        },
        artTitle(state) {
            return state.activeArticle.title
        },
    },
    mutations:{
        add(state){    
            var art = {
                title:'',
                content:'',
                isFav:false,
                time: new Date().getTime(),
            }
            state.ListArt.push(art);
            state.favArt = art;
        },
        changeAct(state,item){
            state.favArt = item;
        },
        changeFav(state){
            state.favArt.isFav = !state.favArt.isFav;
        },
        deleteL(state){
           state.ListArt= state.ListArt.filter(art => (state.favArt !== art ))
           state.favArt = (state.ListArt.length>0)?state.ListArt[0]:{};
        },
        editArticle(state, obj) {
            Object.assign(state.favArt, obj)
        }
        
    }
})