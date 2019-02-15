var dbutil = require("./dbutil")


function insetComents(blogId, parent, parentName, userName, comments, email, ctime, utime, success) {
    let insertQuery = "insert into my_blog.comments (`blog_id`, `parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?)";
    let parmas = [blogId, parent, parentName, userName, comments, email, ctime, utime];
    const connection = dbutil.servers();
    connection.query(insertQuery, parmas, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log("coments层Dao ", error)
        }

    })
    connection.end();
}

function queryComentsCount(blogId, success) {
    var querySql = "select count(1) as count from my_blog.comments where blog_id = ?";
    var parmas = [blogId]
    const connection = dbutil.servers();
    connection.query(querySql, parmas, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log("博客列表总数查询dao层出错")
        }
    })
    connection.end();
}

function queryNewComents(size, success) {
    var querySql = "select * from my_blog.comments order by id desc limit ?";
    var parmas = [size]
    const connection = dbutil.servers();
    connection.query(querySql, parmas, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log("博客列表总数查询dao层出错")
        }
    })
    connection.end();
}

function queryComentsBlogId(id, success) {
    var query = "select * from my_blog.comments where blog_id = ?";
    var parmas = [id]
    const connection = dbutil.servers();
    connection.query(query, parmas, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    })
    connection.end();
}


module.exports = {
    insetComents,
    queryComentsBlogId,
    queryComentsCount,
    queryNewComents
}