// 把tokens数组变成dom字符串
import lookup from './lookup.js';
import parseArray from './parseArray.js';
export default function renderTemplate(tokens, data) {
    // 结果字符串
    let resultStr = '';
    // 遍历tokens
    for (let i = 0; i < tokens.length; i++) {
        // 每一项token
        let token = tokens[i];
        // 判断token[0]的类型
        if (token[0] == 'text') {
            // 是text直接拼到结果字符串
            resultStr += token[1];
        } else if (token[0] == 'name') {
            // 是name属性寻找data里name值相对应那项的值拼接到结果字符串中
            resultStr += lookup(data, token[1]);
        } else if (token[0] == '#') {
            // 是#说明内部还有token，用parseArray递归内部数组
            resultStr += parseArray(token, data);
        }
    }
    return resultStr;
};