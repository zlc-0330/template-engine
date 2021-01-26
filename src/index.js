import Scanner from './Scanner.js';
import Tokens from './Tokens.js';
import renderTemplate from './renderTemplate.js';
// 全局提供templateEngine对象
window.TemplateEngine = {
    // 渲染方法
    render(templateStr, data) {
        var tokens = Tokens(templateStr);
        // 调用renderTemplate函数，把tokens数组变成dom字符串
        var domStr = renderTemplate(tokens, data);
        return domStr;
    }
};