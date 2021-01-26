import Scanner from './Scanner.js';
import nestTokens from './nestTokens';
// 让模板字符串变成tokens数组形式
export default function Tokens(template) {
    var tokens = [];
    //实例化一个扫描器，构造时提供一个模板字符串参数
    var scanner = new Scanner(templateStr);
    var words;
    // scanner指针没到头时
    while (!scanner.eos()) {
        // 收集{{之前的文字
        words = scanner.scanUntil('{{');
        if (words != '') {
            // 去掉普通文字里的空格，标签里的不能去掉
            let isIn = false;
            // 空白字符串
            var _words = '';
            // 遍历words
            for (var i = 0; i < words.length; i++) {
                // 判断是否在空格里
                if (words[i] == '<') {
                    isIn = true;
                }
                if (words[i] == '>') {
                    isIn = false;
                }
                // 如果这项不是空格就拼接上
                if (!/\s/.test(words[i])) {
                    _words += words[i];
                } else {
                    // 是空格并且在标签里拼接上
                    if (isIn) {
                        _words += words[i];
                    }
                }
            }
            // 将文字存入tokens
            tokens.push(['text', _words]);
        }

        // 跳过{{
        scanner.scan("{{");
        // 收集{{到}}之前的文字
        words = scanner.scanUntil('}}');
        if (words != '') {
            // 这个words就是{{}}中间的文字
            if (words[0] == '#') {
                // 如果words以#开头，将#后的文字存入tokens
                tokens.push(['#', words.substring(1)]);
            } else if (words[0] == '/') {
                // 如果words以/开头，将#后的文字存入tokens
                tokens.push(['/', words.substring(1)]);
            } else {
                // 否则直接将words存入tokens
                tokens.push(['name', words]);
            }


        }
        // 跳过}}+
        scanner.scan("}}");
    }
    // 返回折叠的tokens（带层次）
    return nestTokens(tokens);
};