// 扫描器类
export default class Scanner {
    constructor(templateStr) {
            //模板字符串
            this.templateStr = templateStr;
            // 扫描指针
            this.pos = 0;
            // 剩余部分，一开始是全部模板字符串(包括当前指向的)
            this.tail = templateStr;
        }
        // 跳过指定内容
    scan(tag) {
            // 指针遇到指定内容，直接跳过(剩余部分是tag开头)
            if (this.tail.indexOf(tag) == 0) {
                // 指针加指定字符串的长度
                this.pos += tag.length;
                // 剩余部分随着指针移动而变化（template中提取指针位置以后的所有字符串）
                this.tail = this.templateStr.substring(this.pos);
            }
        }
        // 扫描，遇到指定内容后，返回扫描过的字符串
    scanUntil(stopTag) {
            // 记录开始扫描时指针位置
            const posStart = this.pos;
            // 剩余部分开头不是stopTag并且指针没到头时，继续扫描
            // 找不到指定内容也要停止循环
            while (this.tail.indexOf(stopTag) != 0 && !this.eos()) {
                this.pos++;
                // 剩余部分随着指针移动而变化（template中提取指针位置以后的所有字符串）
                this.tail = this.templateStr.substring(this.pos);
            }
            // 循环结束，指针在stoptag上，返回扫描的字符串
            return this.templateStr.substring(posStart, this.pos);
        }
        // 指针是否到头（end of string）
    eos() {
        return this.pos >= this.templateStr.length;
    }
};