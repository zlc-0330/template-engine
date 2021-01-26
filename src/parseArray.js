// 处理token内部数组，结合renderTemplate形成递归
import lookup from './lookup.js';
import renderTemplate from './renderTemplate';
export default function parseArray(token, data) {
    // 得到data中这个数组要用的部分
    var v = lookup(data, token[1]);
    // 结果字符串
    var resultStr = '';
    // 遍历v这个数组,一定是数组
    // 遍历数据，数据有几条就遍历几遍
    for (var i = 0; i < v.length; i++) {
        // 给v[i]补充一个'.'属性
        // 拼接
        resultStr += renderTemplate(token[2], {...v[i],
            '.': v[i]
        });
    }
    return resultStr;
};