//首页的每日一句部分
var day = new Vue({
    el: "#everyDay",
    data: {
        title: "每日一句📢",
        content: "",
        famous: '我跨越了时间的瀚海来把你寻找',
        works: '———————《惊情四百年》'
    },
    computed: {
        getContent() {
            return this.content;
        }
    },
    created() {
        var self = this;
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function (resp) {
            var cont = resp.data.data[0].content;
            self.content = cont;

        }).catch(function (resp) {
        })
    },
});
//首页的每篇文章部分
//
var article = new Vue({
        el: "#artiList",
        data: {
            page: 1,
            pageSize: 5,
            count: null,
            pageNumList: [],
            articleLists: []
        },
        computed: {
            getPage: function () {
                return function (page,pageSize) {
                var searchParmas = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0; i < searchParmas.length; i++) {
                    if (searchParmas[i].split("=")[0] == "tag") {
                        try {
                            tag = searchParmas[i].split("=")[1];
                        } catch (e) {
                        }
                    }
                }
                if (tag == ""){
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.article_title = result[i].title;
                            temp.article_content = result[i].content;
                            temp.articleNum = result[i].view;
                            temp.article_time = result[i].ctime;
                            temp.article_tags = result[i].tag;
                            temp.id = result[i].id;
                            temp.link = "/blog_dbutil.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article.page = page;
                        article.articleLists = list;
                    }).catch(function (resp) {
                    });

                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(function (resp) {
                        article.count = resp.data.data[0].count;
                        article.getCreatePageTool();

                    }).catch(function (resp) {
                    })
                }
                else{
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag="+tag
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.article_title = result[i].title;
                            temp.article_content = result[i].content;
                            temp.articleNum = result[i].view;
                            temp.article_time = result[i].ctime;
                            temp.article_tags = result[i].tag;
                            temp.id = result[i].id;
                            temp.link = "/blog_dbutil.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article.page = page;
                        article.articleLists = list;
                    }).catch(function (resp) {
                    });
                }

                }
            },
            getCreatePageTool() {
                var nowPage = this.page;
                var pageSize = this.pageSize;
                var totalCount = this.count;
                var result = [];
                result.push({text: "<<", page: 1});
                if (nowPage > 2) {
                    result.push({text: nowPage - 2, page: nowPage - 2})
                }
                if (nowPage > 1) {
                    result.push({text: nowPage - 1, page: nowPage - 1})
                }
                result.push({text: nowPage, page: nowPage})
                if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                    result.push({text: nowPage + 1, page: nowPage + 1})
                }
                if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                    result.push({text: nowPage + 2, page: nowPage + 2})
                }
                result.push({text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize)})
                this.pageNumList = result;
                return result;
            },
            jumpTo() {
                return function (page) {
                    this.getPage(page, this.pageSize)
                }

            }
        },


    created() {
        this.getPage(this.page, this.pageSize);
    }

})

var randomTags = new Vue({
    el:"#random_tags",
        data:{
            tags:[]
        },
    computed: {
        randomSize(){
            return function () {
               var red = Math.random()*255+50;
               var blue = Math.random()*255+50;
               var green = Math.random()*255+50;
               return "rgb("+red+","+blue+","+green+")"
            }
        },
        randomColor(){
            return function () {
                var size = Math.random()*20 +12 + "px";
                return size;
            }
        }
    },
    created(){
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function (resp) {
                var result = [];
            for(var i= 0;i<resp.data.data.length;i++){
                result.push(resp.data.data[i]);

            }
            randomTags.tags =result
        })
    }
});

var hotBlog = new Vue({
    el:"#new_hot",
    data:{
        titleList:[

        ]
    },
    created() {
        axios({
            method:"get",
            url:'/queryBlogHot'
        }).then(function (resp) {
            var result = [];
            for(var i = 0; i < resp.data.data.length; i ++){
                var obj = {};
                obj.title = resp.data.data[i].tag;
                obj.link ="/blog_dbutil.html?bid="+resp.data.data[i].id;
                result.push(obj);

            }
            hotBlog.titleList = result;
        })
    }
});

var hotComments = new Vue({
    el:"#new_comments",
    data:{
titleList: []
    },
    created(){
        axios({
            method:"get",
            url:'/queryNewComments'
        }).then(function (resp) {
            var result = [];
            for(var i = 0; i < resp.data.data.length; i ++){
                var obj = {};
                obj.name = resp.data.data[i].user_name;
                obj.time =resp.data.data[i].ctime;
                obj.coments = resp.data.data[i].coments
                result.push(obj);

            }
            hotComments.titleList = result;
        })
    }
})