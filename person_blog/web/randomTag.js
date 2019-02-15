var path = new Map();
var utilTime = require("../util/timeUtil.js");
var tagsDao = require("../dao/RandomTagsDao")
let respUtil = require("../util/respUtil.js")
let tagDao = require("../dao/TagDao.js");
let blogDao = require("../dao/BlogDao")
let url = require("url")
var path = new Map()

function queryRandomTags(request, response) {
    tagsDao.queryTags(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result))
        response.end();
    })
}

path.set("/queryRandomTags", queryRandomTags)

function queryByTag(request, response) {
    var parmas = url.parse(request.url, true).query;

    tagDao.queryTag(parmas.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', result))
            response.end();
        } else {
            tagDao.quertByTag(result[0].id, parseInt(parmas.page), parseInt(parmas.pageSize), function (result) {
                var blogList = [];
                for (var i = 0; i < result.length; i++) {
                    blogDao.queryBlogId(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList, result.length, response)

            })

        }
    })

}

path.set("/queryByTag", queryByTag)

function getResult(blogList, len, response) {
    if (blogList.length < len) {

        setTimeout(function () {
            getResult(blogList, len,response)

        }, 10)
    } else {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', blogList))
        response.end();
    }
}

module.exports.path = path;