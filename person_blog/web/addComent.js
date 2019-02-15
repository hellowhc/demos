var path = new Map();
var utilTime = require("../util/timeUtil.js");
var blogDao = require("../dao/BlogDao.js");
var tagDao = require("../dao/TagDao.js");
var comentsDao = require("../dao/ComentDao.js")
let tagBlogMappingDao = require("../dao/TagBlogMappingDao.js")
let respUtil = require("../util/respUtil.js");
let url = require("url");
let captcha = require("svg-captcha");


var path = new Map();

function  addComents(request,response) {
    var parmas = url.parse(request.url,true).query;
    comentsDao.insetComents(parseInt(parmas.bid),parseInt(parmas.parent),parmas.parentName,parmas.userName,parmas.content,parmas.email,utilTime.getTime(),utilTime.getTime(),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',null))
        response.end();
    })
}
path.set("/addComents",addComents)

function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success","评论成功",img));
    response.end()
}

path.set("/queryRandomCode",queryRandomCode)

function queryComentsByBlogId(request,response){
    var parmas = url.parse(request.url, true).query;
    comentsDao.queryComentsBlogId(parmas.bId,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","成功",result));
        response.end()
    })
}
path.set("/queryComentsByBlogId",queryComentsByBlogId)


function queryComentsCountByBlogId(request,response){
    let parmas = url.parse(request.url, true).query;
    comentsDao.queryComentsCount(parseInt(parmas.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","成功",result));
        response.end()
    })
}

path.set("/queryComentsCountByBlogId",queryComentsCountByBlogId)

function queryNewComments(request,response){
    comentsDao.queryNewComents(6,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","成功",result));
        response.end()
    })
}
path.set("/queryNewComments",queryNewComments)

module.exports.path = path;