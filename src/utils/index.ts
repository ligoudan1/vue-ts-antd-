//公共方法

/**
 * 获取uuid
 */
export function getUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : (<any>'r&0x3' | <any>'0x8')).toString(16)
    })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key: any) {
    return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || JSON.parse(sessionStorage.getItem('satellitePermissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data: any, id = 'id', pid = 'parentId') {
    var res = []
    var temp: any = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = []
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1
            temp[data[k][pid]]['children'].push(data[k])
        } else {
            res.push(data[k])
        }
    }
    return res
}

/**
 * 用子id得到树形数据id及父级id
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function getTreeId(data: any, id = 0, idLable = 'id', pid = 'parentId', res: any = []) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][idLable] === id) {
            res.unshift(data[i][idLable])
            if (data[i][pid] !== -1) {
                getTreeId(data, data[i][pid], idLable, pid, res)
            }
            break
        }
    }
    return res
}

//格式化时间
export function formatDate(now: any, type: any) {
    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var year = now.getFullYear().toString();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var tian = now.getDay().toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    if (second.length == 1) {
        second = "0" + second;
    }
    var dateTime: any;
    if (type == 1) {
        dateTime = hour + ":" + minute;
    } else if (type == 2) {
        dateTime = show_day[tian] + " " + hour + ":" + minute
    } else if (type == 3) {
        dateTime = year + "-" + month + "-" + day
    } else if (type == 4) {
        dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if (type == 5) {
        dateTime = show_day[tian];
    }
    return dateTime;
}

/**
 * 对象深度克隆
 */
export function clone(obj: any) {
    // var that = this;
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor(); //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) { //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? clone(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }
    return newObj;
}

/**
 * 获取光标位置
 * @param {DOMElement} element 输入框的dom节点
 * @return {Number} 光标位置
 */
export const getCursorPosition = (element: any) => {
    let caretOffset = 0
    const doc = element.ownerDocument || element.document
    const win = doc.defaultView || doc.parentWindow
    const sel = win.getSelection()
    if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0)
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(element)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        caretOffset = preCaretRange.toString().length
    }
    return caretOffset
}

/**
 * 设置光标位置
 * @param {DOMElement} element 输入框的dom节点
 * @param {Number} cursorPosition 光标位置的值
 */
export const setCursorPosition = (element: any, cursorPosition: any) => {
    const range = document.createRange()
    range.setStart(element.firstChild, cursorPosition)
    range.setEnd(element.firstChild, cursorPosition)
    const sel: any = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}

/**
 * 随机数生成器
 */
export function randomNum(minNum: any, maxNum: any): any {
    switch (arguments.length) {
        case 1:
            return parseInt(<any>(Math.random() * minNum + 1), 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

/**格式化基日基秒
 * @param njd 距离2000年1月1日的时间,2000年1月1日为第一天
 * @param nt 基秒距离当天零点的秒数这里传入的秒数要是毫秒乘以10
 */

export function getnTime(njd: any, nt: any) {
    var data = new Date("1999-12-31");
    var time = data.getTime();
    var nowtime = njd * 24 * 60 * 60 * 1000 + nt / 10;
    var time2 = time + nowtime;
    // console.log(time2);
    return getdate(time2 - 28800000);

    function getdate(time: any) {
        var now = new Date(time),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate(),
            s = now.getMilliseconds();
        return (
            y +
            "-" +
            (m < 10 ? "0" + m : m) +
            "-" +
            (d < 10 ? "0" + d : d) +
            " " +
            now.toTimeString().substr(0, 8) +
            ":" +
            s
        );
    }
}
/** 将北京时间转换成Julian时间
 * @param htime 北京时间
 */
export function toJulianTime(htime: any) {
    var month, date, hours, min, seconds;
    month = htime.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    date = htime.getDate() > 9 ? htime.getDate() : "0" + htime.getDate();
    hours = htime.getHours();
    hours -= 8;
    hours = hours > 0 ? hours : -hours;
    hours = hours > 9 ? hours : "0" + hours;
    min =
        htime.getMinutes() > 9 ? htime.getMinutes() : "0" + htime.getMinutes();
    seconds =
        htime.getSeconds() > 9 ? htime.getSeconds() : "0" + htime.getSeconds();
    return htime.getFullYear() +
        "-" +
        month +
        "-" +
        date +
        "T" +
        hours +
        ":" +
        min +
        ":" +
        seconds +
        "Z";

    // 2019-09-21T04:00:00Z
}

/**
 * 判断两个对象是否相等
 * @param {*} x 
 * @param {*} y 
 */
export function deepCompare(x: any, y: any): boolean {
    var i, l, leftChain: any, rightChain: any;

    function compare2Objects(x: any, y: any) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.     
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}
