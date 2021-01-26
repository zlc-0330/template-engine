// 折叠tokens，将#和/之间的tokens整合起来作为下标为2的一项
export default function nestTokens(tokens) {
    // 结果数组
    var nestedTokens = [];
    // 收集器，天生指向结果数组,当遇到#时就会指向此token下标为2的那项
    var collecter = nestedTokens;
    // 栈
    var stack = [];
    // 遍历零散的tokens
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        // 分类讨论token的第0项
        switch (token[0]) {
            case '#':
                // 有层次了，收集器中放入token
                collecter.push(token);
                // 入栈
                stack.push(token);
                // 创建token的下标为2的项并让收集器指向它
                collecter = token[2] = [];
                break;
            case '/':
                // 弹栈，pop会返回刚弹出的项
                stack.pop();
                // 如果栈里还有项就让收集器指向栈最后一项的下标为2的项，如果没有就让收集器指向结果数组
                collecter = stack.length > 0 ? stack[stack.length - 1][2] : nestedTokens;
                break;
            default:
                // 不管collecter指向谁，将token推入collecer
                collecter.push(token);
        }
    }



    return nestedTokens;
};