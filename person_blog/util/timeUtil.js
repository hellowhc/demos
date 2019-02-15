function getTime(){
    var date = new Date();
    return getDate(date)
}
function getDate(date){
    var year=date.getYear().toString().substring(1,3);
    var month=date.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    var day=date.getDate();
    if(day<10){
        day="0"+day;
    }
    return year+"-"+month+"-"+day;
}

module.exports = {
    getTime
};