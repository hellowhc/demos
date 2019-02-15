var dbutil = require("./dbutil");

function queryTags(success) {
    var querySql= "select * from my_blog.tags";
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



module.exports = {
    queryTags,
}