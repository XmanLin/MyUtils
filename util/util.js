/**
 *  lin
 *  此文件下主要为常用的工具函数
 */

/**
 *  金钱格式化，三位加逗号
 */
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


/**
 *  日期数字小于10，补“0”
 */
export function check(i) {
    let num;
    i < 10 ? num = "0" + i : num = i;
    return num;
}

/**
 *  截取字符串并加身略号
 */
export function subText(str, length) {
    if (str.length == 0) {
        return '';
    }
    if (str.length > length) {
        return str.substr(0, length) + "...";
    } else {
        return str;
    }
}


/**
 * 获取文件base64编码
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */
export function fileToBase64String(file, format = ['jpg', 'jpeg', 'png', 'gif'], size = 20 * 1024 * 1024, formatMsg = '文件格式不正确', sizeMsg = '文件大小超出限制') {
    return new Promise((resolve, reject) => {
        // 格式过滤
        let suffix = file.type.split('/')[1].toLowerCase();
        let inFormat = false;
        for (let i = 0; i < format.length; i++) {
            if (suffix == format[i]) {
                inFormat = true;
                break;
            }
        }
        if (!inFormat) {
            reject(formatMsg);
        }
        // 大小过滤
        if (file.size > size) {
            reject(sizeMsg);
        }
        // 转base64字符串
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let res = fileReader.result;
            resolve({base64String: res, suffix: suffix});
            reject('异常文件，请重新选择');
        }
    })
}


/**
 * 递归生成树形结构
 */
export function getTreeData(data, pid, pidName = 'parentId', idName = 'id', childrenName = 'children', key) {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i][pidName] == pid) {
            data[i].key = data[i][idName];
            data[i][childrenName] = getTreeData(data, data[i][idName], pidName, idName, childrenName);
            arr.push(data[i]);
        }
    }

    return arr;
}


/**
 * 遍历树节点
 */
export function foreachTree(data, childrenName = 'children', callback) {
    for (let i = 0; i < data.length; i++) {
        callback(data[i]);
        if (data[i][childrenName] && data[i][childrenName].length > 0) {
            foreachTree(data[i][childrenName], childrenName, callback);
        }
    }
}


/**
 * 追溯父节点
 */
export function traceParentNode(pid, data, rootPid, pidName = 'parentId', idName = 'id', childrenName = 'children') {
    let arr = [];
    foreachTree(data, childrenName, (node) => {
        if (node[idName] == pid) {
            arr.push(node);
            if (node[pidName] != rootPid) {
                arr = arr.concat(traceParentNode(node[pidName], data, rootPid, pidName, idName));
            }
        }
    })
    return arr; 
}


/**
 * 寻找所有子节点
 */
export function traceChildNode(id, data, pidName = 'parentId', idName = 'id', childrenName = 'children') {
    let arr = [];
    foreachTree(data, childrenName, (node) => {
        if (node[pidName] == id) {
            arr.push(node);
            arr = arr.concat(traceChildNode(node[idName], data, pidName, idName, childrenName));
        }
    })
    return arr;
}

/**
 * 查询数组中是否存在某个元素并返回元素第一次出现的下标 
 * @param {*} item 
 * @param { arr } data 
 */
export function inArray(item, data) {
    for (let i = 0; i < data.length; i++) {
        if (item === data[i]) {
            return i;
        }
    }
    return -1;
}


/**
 * B转换到KB,MB,GB并保留两位小数
 * @param { number } fileSize 
 */
export function formatFileSize(fileSize) {
    if (fileSize < 1024) {
        return fileSize + 'B';
    } else if (fileSize < (1024 * 1024)) {
        var temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + 'KB';
    } else if (fileSize < (1024 * 1024 * 1024)) {
        var temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'MB';
    } else {
        var temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'GB';
    }
}


/**
 *  Windows根据详细版本号判断当前系统名称
 * @param { string } osVersion 
 */
export function OutOsName(osVersion) {
    if(!osVersion){
        return
    }
    let str = osVersion.substr(0, 3);
    if (str === "5.0") {
        return "Win 2000"
    } else if (str === "5.1") {
        return "Win XP"
    } else if (str === "5.2") {
        return "Win XP64"
    } else if (str === "6.0") {
        return "Win Vista"
    } else if (str === "6.1") {
        return "Win 7"
    } else if (str === "6.2") {
        return "Win 8"
    } else if (str === "6.3") {
        return "Win 8.1"
    } else if (str === "10.") {
        return "Win 10"
    } else {
        return "Win"
    }
}


/**
 * 获取取窗口可视范围的高度
 */
export function getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}


/**
 * 判断手机是Andoird还是IOS
 *  0: ios
 *  1: android
 *  2: 其它
 */
export function getOSType() {
    let u = navigator.userAgent, app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        return 0;
    }
    if (isAndroid) {
        return 1;
    }
    return 2;
}


/**
 * 获取url参数（第一种）
 * @param {*} name 
 * @param {*} origin 
 */

export function getUrlParam(name, origin = null) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = null;
    if (origin == null) {
        r = window.location.search.substr(1).match(reg);
    } else {
        r = origin.substr(1).match(reg);
    }
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * 获取url参数（第二种）
 * @param {*} name 
 * @param {*} origin 
 */
export function getUrlParams(name, origin = null) {
    let url = location.href;
    let temp1 = url.split('?');
    let pram = temp1[1];
    let keyValue = pram.split('&');
    let obj = {};
    for (let i = 0; i < keyValue.length; i++) {
        let item = keyValue[i].split('=');
        let key = item[0];
        let value = item[1];
        obj[key] = value;
    }
    return obj[name];
}


/**
 * 修改url中的参数
 * @param { string } paramName 
 * @param { string } replaceWith 
 */
export function replaceParamVal(paramName,replaceWith) {
    var oUrl = location.href.toString();
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
    location = nUrl;
    var newUrl = location.href=nUrl;
    return newUrl;
}


/**
 * 删除url中指定的参数
 * @param { string } name 
 */
export function funcUrlDel(name){
    var loca =location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if (query.indexOf(name)>-1) {
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url
    }
}


/**
 * @desc 函数防抖
 * @param { func } 函数
 * @param { wait } 延迟执行毫秒数
 * @param { immediate } true 表立即执行，false 表非立即执行
 */
export function debounce(func,wait,immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }
}


/**
 * @desc 函数节流
 * @param { func } 函数
 * @param { wait } 延迟执行毫秒数
 * @param { type } 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait ,type) {
    if(type===1){
        var previous = 0;
    }else if(type===2){
        var timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }

    }
}


/**
 * 判断类型
 * @param {*} target 
 */
function type(target) {
    var ret = typeof(target);
    var template = {
        "[object Array]": "array",
        "[object Object]":"object",
        "[object Number]":"number - object",
        "[object Boolean]":"boolean - object",
        "[object String]":'string-object'
    }

    if(target === null) {
        return 'null';
    }else if(ret == "object"){
        var str = Object.prototype.toString.call(target);
        return template[str];
    }else{
        return ret;
    }
}

/**
 * 生成指定范围随机数
 * @param { number } min 
 * @param { number } max 
 */
export const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;



/**
 * 自适应页面（rem）
 * @param { number } width 
 */
export function AutoResponse(width = 750) {
    const target = document.documentElement;
    target.clientWidth >= 600
        ? (target.style.fontSize = "80px")
        : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}

