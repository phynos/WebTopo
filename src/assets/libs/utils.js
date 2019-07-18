/**
 * 获取日期
 * @param day
 * @returns {string}
 * @deprecated
 * 废弃，建议用moment
 */
export function getDay(day) {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds);
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}

/**
 * 获取2位数月份
 * @param month
 * @returns {*}
 * @deprecated
 * 废弃，建议用moment
 */
function doHandleMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}

/**
 * 获取页面列表最大行数，避免滚动条
 * @param offsetHeight
 * @returns {number}
 */
export function getPageSize(offsetHeight) {
  let pageHeight = document.documentElement.clientHeight - 220 - (offsetHeight || 0);
  let pageRows = parseInt(pageHeight / 33);
  pageRows = pageRows ? pageRows : 20;
  return pageRows;
}

/**
 * 获取页面高度
 * @param offsetHeight
 * @returns {number}
 */
export function getPageHeight(offsetHeight) {
  if (isNaN(offsetHeight)) {
    offsetHeight = 0;
  }
  let pageHeight = document.documentElement.clientHeight - (120 + Number(offsetHeight));
  return pageHeight;
}

/**
 * 拷贝对象
 * @param obj
 * @returns {*[] | Function | {} | *}
 */
export function clone(obj) {
  let temp = null;
  if (obj instanceof Array) {
    temp = obj.concat();
  } else if (obj instanceof Function) {
    temp = obj;
  } else {
    temp = {};
    for (let item in obj) {
      let val = obj[item];

      temp[item] = typeof val == 'object' ? clone(val) : val;
    }
  }
  return temp;
}

/**
 * 深度拷贝
 * @param obj
 * @returns {*}
 */
export function deepCopy(obj) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]);   //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * 检查数据类型
 * @param val
 * @returns {array/object/date/number/string}
 */
export function objType(val) {
  if (!val) {
    return null;
  } else if (val instanceof Array) {
    return 'array';
  } else if (val instanceof Object) {
    return 'object';
  } else if (val instanceof Date) {
    return 'date';
  } else if (val instanceof Number) {
    return 'number';
  } else if (typeof(val) == 'string') {
    return 'string';
  }
}


/**
 * 流量格式
 * @param flow
 * @returns {{flow: any, unit: *}}
 */
export function formatFlow(flow) {
  flow = isNaN(flow) || !flow ? 0 : Number(flow);
  var unit;
  if (flow / 1024 < 1) {
    flow = flow.toFixed(1);
    unit = 'B';
  } else if (flow / 1024 / 1024 < 1) {
    flow = (flow / 1024).toFixed(1);
    unit = 'KB';
  } else if (flow / 1024 / 1024 / 1024 < 1) {
    flow = (flow / 1024 / 1024).toFixed(1);
    unit = 'MB';
  } else if (flow / 1024 / 1024 / 1024 / 1024 < 1) {
    flow = (flow / 1024 / 1024 / 1024).toFixed(1);
    unit = 'GB';
  }
  flow = flow % 1.0 == 0 ? parseInt(flow) : flow;
  return {flow: flow, unit: unit};
}

/**
 * 字符串转16进制
 * @param str
 * @returns {string}
 */
export function strToHex(str) {
  if (str === "") {
    return "";
  }
  let hexCharCode = [];
  hexCharCode.push("0x");
  for (let i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16));
  }
  return hexCharCode.join("");
}


/**
 * 16进制转字符串
 * @param hexCharCodeStr
 * @returns {string}
 */
export function hexToStr(hexCharCodeStr) {
  let trimedStr = hexCharCodeStr.trim();
  let rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
  let len = rawStr.length;
  if (len % 2 !== 0) {
    alert("Illegal Format ASCII Code!");
    return "";
  }
  let curCharCode;
  let resultStr = [];
  for (let i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join("");
}


/**
 * 获取指定范围N个随机数
 * @param min
 * @param max
 * @param size
 * @returns {Array}
 */
export function randomVal(min, max, size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1) + min))
  }
  return result;
}
