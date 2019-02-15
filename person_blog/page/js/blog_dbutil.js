var blogDeTail = new Vue({
    el: "#blog_dbutil",
    data: {
        title: '',
        content: '',
        msg: '',
        tags: '',
        ctime: '',
        view: ""
    },
    created() {
        var searchParmas = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchParmas == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < searchParmas.length; i++) {
            if (searchParmas[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchParmas[i].split("=")[1]);
                } catch (e) {
                }
            }
        }

        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (resp) {
            var result = resp.data.data[0];
            blogDeTail.title = result.title;
            blogDeTail.content = result.content;
            blogDeTail.ctime = result.ctime;
            blogDeTail.tag = result.tag;
            blogDeTail.view = result.view;

        }).catch(function (resp) {
        })
    }
})


var sendComent = new Vue({
    el: "#send_coment",
    data: {
        vCode: "",
        rightCode: ""
    },
    computed: {
        sendComent: function () {
            return function () {
                var code = document.getElementById("coment_code").value.toUpperCase();
                if (code != sendComent.rightCode.toUpperCase()) {
                    alert("验证码不正确" + code);
                    return;
                }
                var searchParmas = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchParmas == "") {
                    return;
                }
                var bid = -10;
                for (var i = 0; i < searchParmas.length; i++) {
                    if (searchParmas[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searchParmas[i].split("=")[1]);
                        } catch (e) {
                        }
                    }
                }

                var reply = document.getElementById("reply").value;
                var replyName = document.getElementById("reply_name").value;
                var name = document.getElementById("coment_name").value;
                var email = document.getElementById("coment_email").value;
                var content = document.getElementById("coment_content").value;

                axios({
                    method: "get",
                    url: "/addComents?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then(function (resp) {
                }).catch(function (resp) {
                })

            }
        },
        changeCode() {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode",
                }).then(function (resp) {
                    sendComent.vCode = resp.data.data.data;
                    sendComent.rightCode = resp.data.data.text;
                })
            }
        }
    },
    created() {
        this.changeCode();
    }

})


var blogComents = new Vue({
    el: "#blog_coments",
    data: {
        total: 100,
        coments: []
    },
    computed: {
        reply() {
            return function (id, userName) {
                document.getElementById("reply").value = id;
                document.getElementById("reply_name").value = userName;
                location.href = "#blog_coments";

            }
        }
    },
    created() {
        var searchParmas = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchParmas == "") {
            return;
        }
        var bid = -10;
        for (var i = 0; i < searchParmas.length; i++) {
            if (searchParmas[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchParmas[i].split("=")[1]);
                } catch (e) {
                }
            }
        }
        axios({
            method: "get",
            url: "/queryComentsByBlogId?bId=" + bid
        }).then(function (resp) {
            blogComents.coments = resp.data.data;
            for (var i = 0; i < blogComents.coments.length; i++) {
                if (blogComents.coments[i].parent > -1) {
                    blogComents.coments[i].options = "回复@" + blogComents.coments[i].parent_name;
                }
            }
        });
        axios({
            method: "get",
            url: "/queryComentsCountByBlogId?bid=" + bid
        }).then(function (resp) {
            blogComents.total = resp.data.data[0].count;
        })
    }
})

var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomSize() {
            return function () {
                var red = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                return "rgb(" + red + "," + blue + "," + green + ")"
            }
        },
        randomColor() {
            return function () {
                var size = Math.random() * 20 + 12 + "px";
                return size;
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function (resp) {
            var result = [];
            for (var i = 0; i < resp.data.data.length; i++) {
                result.push(resp.data.data[i]);

            }
            randomTags.tags = result
        })
    }
});

var hotBlog = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    created() {
        axios({
            method: "get",
            url: '/queryBlogHot'
        }).then(function (resp) {
            var result = [];
            for (var i = 0; i < resp.data.data.length; i++) {
                var obj = {};
                obj.title = resp.data.data[i].tag;
                obj.link = "/blog_dbutil.html?bid=" + resp.data.data[i].id;
                result.push(obj);

            }
            hotBlog.titleList = result;
        })
    }
});

var hotComments = new Vue({
    el: "#new_comments",
    data: {
        titleList: []
    },
    created() {
        axios({
            method: "get",
            url: '/queryNewComments'
        }).then(function (resp) {
            var result = [];
            for (var i = 0; i < resp.data.data.length; i++) {
                var obj = {};
                obj.name = resp.data.data[i].user_name;
                obj.time = resp.data.data[i].ctime;
                obj.coments = resp.data.data[i].coments
                result.push(obj);

            }
            hotComments.titleList = result;
        })
    }
})