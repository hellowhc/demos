var dbutil = require("./dbutil")

//插入一条每日一句
function insetEveyDay(content,ctime,success){
        let insertQuery = "insert into my_blog.every_day (`content`, `ctime`) values (?,?)";
        let parmas = [content,ctime];
        const connection = dbutil.servers();
        connection.query(insertQuery,parmas,function (error, result) {
            if(error == null){
                success(result)
            }else{
                console.log("每日一句插入dao层出错 ")
            }

        })
    connection.end();
}



//查询一条每日一句
function queryByEveryDay(success){
    let query = "select * from my_blog.every_day order by id desc limit 1";
    const connection = dbutil.servers();
    connection.query(query, function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log("error")
        }
    })
}


module.exports  = {
    queryByEveryDay,
    insetEveyDay
}