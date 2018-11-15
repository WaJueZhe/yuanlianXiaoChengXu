/**
 * 当前时间
 */
function nowTime(){
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  //获取当前时间  
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours();
  //分  
  var m = date.getMinutes();
  //秒  
  var s = date.getSeconds();

  return Y +"-"+ M +"-"+ D +" " + h + ":" + m + ":" + s
}

/**
 * 当前日期
 */
function nowDay() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  //获取当前时间  
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return Y + "-" + M + "-" + D
}

/**
 * 上个月最后一天
 */
function lastMonLastDay() {
  var timestamp = Date.parse(new Date(nowMon()+"-01"));
  timestamp = timestamp / 1000;

  timestamp = timestamp + 24 * 60 * 60 * (-1);

  //获取当前时间  
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return Y + "-" + M + "-" + D
}

/**
 * 上个月第一天
 */
function lastMonFirstDay() {
  var timestamp = Date.parse(new Date(nowMon() + "-01"));
  timestamp = timestamp / 1000;

  timestamp = timestamp + 24 * 60 * 60 * (-1);

  //获取当前时间  
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
 

  return Y + "-" + M + "-01"
}

/**
 * 当前月份
 */
function nowMon() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  //获取当前时间  
  var n = timestamp * 1000;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

  return Y + "-" + M
}



/**
 * 日期增加
 */
function addDay(days){
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;

  var tomorrow_timetamp = timestamp + 24 * 60 * 60*days;
  //加n天的时间：  
  var n_to = tomorrow_timetamp * 1000;
  var tomorrow_date = new Date(n_to);
  //加n天后的年份
  var Y_tomorrow = tomorrow_date.getFullYear();
  //加n天后的月份
  var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);
  //加n天后的日期
  var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();

  return Y_tomorrow + "-" + M_tomorrow + "-" + D_tomorrow

}




module.exports = {
  nowTime: nowTime,
  nowDay: nowDay,
  nowMon: nowMon,
  lastMonLastDay: lastMonLastDay,
  lastMonFirstDay: lastMonFirstDay,
  addDay: addDay
}

