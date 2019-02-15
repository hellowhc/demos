var dbutil = require("./dbutil");

function insertTag (tag,ctime,utime,success){
    let insertQuery = "insert into my_blog.tags (`tag`,`ctime`,`utime`) values (?,?,?)";
    let parmas = [tag,ctime,utime];
    const connection = dbutil.servers();
    connection.query(insertQuery,parmas,function (error, result) {
        if(error == null){
            success(result)
        }else{
            console.log("Tagdao层出错 ")
        }
    })
    connection.end();
}

function queryTag (tag,success){
    let insertQuery = "select * from my_blog.tags where tag = ?";
    let parmas = [tag];
    const connection = dbutil.servers();
    connection.query(insertQuery,parmas,function (error, result) {
        if(error == null){
            success(result)
        }else{
            console.log("dao层出错 ")
        }

    })
    connection.end();
}

function quertByTag(tagId,page,pageSize,success) {
    var querySql= "select * from my_blog.tag_blog_mapping where tag_id = ? limit ? ,?";
    var parmas = [tagId,page*pageSize,pageSize]
    const connection = dbutil.servers();
    connection.query(querySql,parmas,function (error, result) {
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}

module.exports = {
    insertTag,
    queryTag,
    quertByTag
}
