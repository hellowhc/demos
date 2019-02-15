var dbutil = require("./dbutil")

function insertBlog (title,content,views,tags,ctime,uTime,success){
    let insertQuery = "insert into my_blog.blog (`title`, `content`, `view`, `tag`, `ctime`, `utime`) values (?,?,?,?,?,?)";
    var parmas = [title,content,views,tags,ctime,uTime];
    const connection = dbutil.servers();
    connection.query(insertQuery,parmas,function (error, result) {
        if(error == null){
            success(result)

        }else{
            console.log("博客列表dao层出错")
        }
    })
    connection.end();
}

function queryBlogCount(success){
    var querySql= "select count(1) as count from my_blog.blog ";
    const connection = dbutil.servers();
    connection.query(querySql,function (error, result) {
        if(error == null){
            success(result)

        }else{
            console.log("博客列表总数查询dao层出错")
        }
    })
    connection.end();
}

function queryAllBlog(success) {
    var Query = "select * from my_blog.blog order by id desc";
    const connection = dbutil.servers();
    connection.query(Query,function (error, result) {
        if(error == null){
            success(result)
        }else{
            console.log("博客列表查询页面dao层出错")
        }
    })
    connection.end();
}

function addViews(id,success) {
    var Query = "update my_blog.blog set view = view + 1 where id = ?";
    var parmas = [id];
    const connection = dbutil.servers();
    connection.query(Query,parmas,function (error, result) {
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}
function queryHotBlog(size,success) {
    var Query = "select * from my_blog.blog order by view desc limit ?";
    var parmas = [size];
    const connection = dbutil.servers();
    connection.query(Query,parmas,function (error, result) {
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}
function queryBlogPage (page,pageSize,success){
    var insertQuery = "select * from my_blog.blog order by id desc limit ?,?";
    var parmas = [page*pageSize,pageSize];
    const connection = dbutil.servers();
    connection.query(insertQuery,parmas,function (error, result) {
        if(error == null){
            success(result)
        }else{
        }
    })
    connection.end();
}

function queryBlogId (id,success){
    var query = "select * from my_blog.blog where id = ?";
    var parmas = [id]
    const connection = dbutil.servers();
    connection.query(query,parmas,function (error, result) {

        if(error == null){
            success(result)
        }else{
        }
    })
    connection.end();
}
module.exports = {
    insertBlog,
    queryBlogPage,
    queryBlogCount,
    queryBlogId,
    queryAllBlog,
    addViews,
    queryHotBlog
}