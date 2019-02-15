var express = require("express");
var gloConf = require("./conf");
var loader = require("./loader");
var app = new express();

app.use(express.static("./page/"))

app.post("/editEveryDay", loader.get("/editEveryDay"));

app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));

app.get("/queryBlogByPage", loader.get("/queryBlogByPage"))

app.get("/queryBlogById", loader.get("/queryBlogById"));

app.get("/queryRandomTags", loader.get("/queryRandomTags"))

app.get("/queryBlogCount", loader.get("/queryBlogCount"))

app.get("/queryAllBlog", loader.get("/queryAllBlog"))

app.get("/queryRandomCode", loader.get("/queryRandomCode"));

app.get("/queryComentsByBlogId", loader.get("/queryComentsByBlogId"));

app.get("/queryComentsCountByBlogId", loader.get("/queryComentsCountByBlogId"))

app.get("/queryBlogHot", loader.get("/queryBlogHot"))

app.get("/addComents", loader.get("/addComents"))

app.get("/queryNewComments", loader.get("/queryNewComments"));

app.get("/queryByTag", loader.get("/queryByTag"))

app.listen(gloConf["port"], function () {
    console.log("成功")
})