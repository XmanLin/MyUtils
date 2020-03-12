/**
 *  此js文件主要包含日期方面的工具函数
 */


/**
 * 获取当前时间的n天后的时间戳
 * @param {number} n 天数
 * @returns {Number} 返回值为时间毫秒值
 */
export function toNextTimes(n){
    let timestamp = +new Date() + n * 86400000;
    return timestamp;
}

/***
 * 本周第一天
 *  @return {*} WeekFirstDay 返回本周第一天的时间
 */
export function showWeekFirstDay(){
    let Nowdate=new Date();
    let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
    return WeekFirstDay;
}

/***
 * 本周最后一天
 *  @return {*} WeekLastDay 返回本周最后一天的时间
 */
export function showWeekLastDay(){
    let Nowdate=new Date();
    let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
    let WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
    return WeekLastDay;
}


/***
 * 本月第一天
 *  @return {*} MonthFirstDay 返回本月第一天的时间
 */
export function showMonthFirstDay(){
    let Nowdate=new Date();
    let MonthFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth());
    return MonthFirstDay;
}



/***
 * 本月最后一天
 *  @return {*} MonthLastDay 返回本月最后一天的时间
 */
export function showMonthLastDay(){
    let Nowdate=new Date();
    let MonthNextFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth()+1);
    let MonthLastDay=new Date(MonthNextFirstDay-86400000);
    return MonthLastDay;
}


/**
 * 日期转时间戳
 * @param {String} time - 日期字符串，如'2018-8-8','2018,8,8','2018/8/8'
 * @returns {Number} 返回值为时间毫秒值
 */
export function timeToTimestamp (time) {
    let date = new Date(time);
    let timestamp = date.getTime();
    return timestamp;
}



/***
 * 格式化当前时间
 *  @return {string} timeText 返回系统时间字符串
 */
export function getdataTimeSec() {
    let time = new Date();
    let weekDay;
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    //获取时分秒
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    //检查是否小于10
    h = check(h);
    m = check(m);
    s = check(s);
    let now_day = time.getDay();
    switch (now_day) {
        case 0: {
            weekDay = "星期日"
        }
            break;
        case 1: {
            weekDay = "星期一"
        }
            break;
        case 2: {
            weekDay = "星期二"
        }
            break;
        case 3: {
            weekDay = "星期三"
        }
            break;
        case 4: {
            weekDay = "星期四"
        }
            break;
        case 5: {
            weekDay = "星期五"
        }
            break;
        case 6: {
            weekDay = "星期六"
        }
            break;
        case 7: {
            weekDay = "星期日"
        }
            break;
    }
    let timeText = year + "年" + month + "月" + day + "日  " + " " + weekDay + " " + h + ":" + m +":" + s;

    return timeText
}

/**
 *  日期数字小于10，补“0”
 */
export function check(i) {
    let num;
    i < 10 ? num = "0" + i : num = i;
    return num;
}


/**
 * 返回指定时间戳之间的时间间隔
 *  @param {*} startTime 开始时间的时间戳
 *  @param {*} endTime 结束时间的时间戳
 *  @return {string} str 返回时间字符串
 */
export function getTimeInterval(startTime, endTime) {
    let runTime = parseInt((endTime - startTime) / 1000);
    let year = Math.floor(runTime / 86400 / 365);
    runTime = runTime % (86400 * 365);
    let month = Math.floor(runTime / 86400 / 30);
    runTime = runTime % (86400 * 30);
    let day = Math.floor(runTime / 86400);
    runTime = runTime % 86400;
    let hour = Math.floor(runTime / 3600);
    runTime = runTime % 3600;
    let minute = Math.floor(runTime / 60);
    runTime = runTime % 60;
    let second = runTime;
    let str = '';
    if (year > 0) {
        str = year + '年';
    }
    if (year <= 0 && month > 0) {
        str = month + '月';
    }
    if (year <= 0 && month <= 0 && day > 0) {
        str = day + '天';
    }
    if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
        str = hour + '小时';
    }
    if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
        str = minute + '分钟';
    }
    if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
        str += second + '秒';
    }
    str += '前';
    return str;
}





/**
 * 按类型格式化日期
 * @param {*} date 具体日期变量
 * @param {string} dateType 需要返回类型
 * @return {string} dateText 返回为指定格式的日期字符串
 */
export function getFormatDate(date, dateType) {
    let dateObj = new Date(date);
    let month = dateObj.getMonth() + 1;
    let strDate = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;

    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds
    }

    let dateText = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
    if (dateType == "yyyy-mm-dd") {
        dateText = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
    }
    if (dateType == "yyyy.mm.dd") {
        dateText = dateObj.getFullYear() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getDate();
    }
    if (dateType == "yyyy-mm-dd MM:mm:ss") {
        dateText = dateObj.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
    }
    if (dateType == "mm-dd MM:mm:ss") {
        dateText = month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
    }
    if (dateType == "yyyy年mm月dd日 MM:mm:ss") {
        dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hours + ":" + minutes + ":" + seconds;
    }
    return dateText;
}



/**
 * 判断是否为闰年
* @param  {number} year 要判断的年份
* @return {boolean} 返回布尔值
*/
export function leapYear(year) {
    return !(year % (year % 100 ? 4 : 400));
}



/** 
 * 返回两个年份之间的闰年
* @param  {number} start 开始年份
* @param  {number} end 结束年份
* @return {array}  arr 返回符合闰年的数组
*/
export function leapYears(start, end) {
    let arr = [];
    for (var i=start; i<end; i++) {
        if ( leapYear(i) ) {
            arr.push(i)
        }
    }
    return arr
}



/**
 * 判断时间格式是否有效
* 短时间，如 (10:24:06)
* @param  {string} str 需要验证的短时间
* @return {boolean} 返回布尔值
*/
export function isTime(str) {
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
    if (a == null) { return false; }
    if (a[1] >= 24 || a[3] >= 60 || a[4] >= 60) {
        return false
    }
    return true;
}

/**
* 短日期，形如 (2019-10-24)
* @param  {string} str 需要验证的短时间
* @return {boolean} 返回布尔值
*/
export function strDateTime(str){
    var result = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (result == null) return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4]);
}

/**
* 长日期时间，形如 (2019-10-24 10:24:06)
* @param  {string} str 需要验证的短时间
* @return {boolean} 返回布尔值
*/
export function strDateTime(str){
    var result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    if (result == null) return false;
    var d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4] && d.getHours() == result[5] && d.getMinutes() == result[6] && d.getSeconds() == result[7]);
}



/**
 * 验证日期大小
* 例："2019-10-24" 和 "2019-10-25"
* @param  {string} d1需要验证的日期1
* @param  {string} d2需要验证的日期2
* @return {boolean} 返回布尔值
*/
export function compareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
}



/** 
 * 验证一个日期是不是今天
* @param  {string} val 需要验证的日期
* @return {boolean} 返回布尔值
*/
export function isToday(val){
    return new Date().toLocaleDateString() == new Date(val).toLocaleDateString();
}


/**
 * 验证传入的日期是否是昨天
* @param  {string} val 需要验证的日期
* @return {boolean} 返回布尔值
*/
export function isYesterday(val) {
    var today = new Date();
    var yesterday = new Date(now - 1000 * 60 * 60 * 24);
    var test = new Date(val);
    if (yesterday.getYear() === test.getYear() && yesterday.getMonth() === test.getMonth() && yesterday.getDate() === test.getDate()) {
        return true;
    } else {
        return false;
    }
}



/**
 * 设置几天后的日期
* @param  {string} date 起始日期
* @param  {number} day 向后的天数
* @return {string} 返回想要得到的日期
*/
export function convertDate (date, day) {
    let tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate()+day);
    let Y = tempDate.getFullYear();
    let M = tempDate.getMonth()+1 < 10 ? '0'+(tempDate.getMonth()+1) : tempDate.getMonth()+1;
    let D = tempDate.getDate() < 10 ? '0'+(tempDate.getDate()) : tempDate.getDate();
    let result = Y + "-" + M + "-" + D
    return result;
}