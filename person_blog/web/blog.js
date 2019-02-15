var path = new Map();
var utilTime = require("../util/timeUtil.js");
var blogDao = require("../dao/BlogDao.js");
var tagDao = require("../dao/TagDao.js");
let tagBlogMappingDao = require("../dao/TagBlogMappingDao.js")
let respUtil = require("../util/respUtil.js");
let url = require("url");

function editBlog(request,response){
    var parmas = url.parse(request.url,true).query;
    var tags = parmas.tags.replace(/ /g," ").replace("，", ",");
    request.on("data",function (data) {
        blogDao.insertBlog(parmas.title,data.toString().trim(),0,tags, utilTime.getTime(), utilTime.getTime(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null))
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0; i< tagList.length; i ++){
                if(tagList[i] == ""){
                    continue;
                }else{
                    queryTags(tagList[i],blogId)
                }
            }
        })
    })
}
path.set("/editBlog",editBlog);

function queryAllBlog(request,response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',result))
        response.end();
    })
}
path.set("/queryAllBlog",queryAllBlog)

function queryBlogHot(request,response) {

    blogDao.queryHotBlog(5,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',result))
        response.end();
    })
}
path.set("/queryBlogHot",queryBlogHot)
function  queryBlogId(request,response) {
    var bid = url.parse(request.url,true).query;
    blogDao.queryBlogId(parseInt(bid.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',result))
        response.end();
        blogDao.addViews(parseInt(bid.bid),function (result) {
        })
    })
}
path.set("/queryBlogById",queryBlogId)

function queryBlogByPage(request,response) {
    var parmas = url.parse(request.url,true).query;
    blogDao.queryBlogPage(parseInt(parmas.page),parseInt(parmas.pageSize),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',result))
        response.end();
    })
}

path.set("/queryBlogByPage",queryBlogByPage)

function queryBlogCount(request,response){
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',result))
        response.end();
    })
}

path.set("/queryBlogCount",queryBlogCount)


    function  queryTags(tag,blogId) {
        tagDao.queryTag(tag,function (result) {
            if(result == null || result.length == 0){
                insertTag(tag,blogId);
            }else{
                tagBlogMappingDao.insertTagBlogMapping(utilTime.getTime(),utilTime.getTime(),result[0].id,blogId,function (result) {
                    
                })
            }

        })
    }
    
    function insertTag(tag,blogId) {
        tagDao.insertTag(tag,utilTime.getTime(),utilTime.getTime(),function (result) {
            insertTagBlogMapping(result.insertId,blogId)
        })
    }

    function insertTagBlogMapping(tagId,blogId) {
        tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,utilTime.getTime(),utilTime.getTime(),function (result) {

        })
    }


    module.exports.path = path;