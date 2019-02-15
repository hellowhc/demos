var dbutil = require("./dbutil")

function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    let insertQuery = "insert into my_blog.tag_blog_mapping (`tag_id`, `blog_id`,`ctime`,`utime`) values (?,?,?,?)";
    let parmas = [tagId,blogId,ctime,utime];
    const connection = dbutil.servers();
    connection.query(insertQuery,parmas,function (error, result) {
        if(error == null){
            success(result)
        }else{
            console.log("insertBlogMappingdao层出错 ")
        }

    })
    connection.end();
}

module.exports = {
    insertTagBlogMapping
}