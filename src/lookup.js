// 可以再dataobj对象中寻找用连续点符号的keyName属性
// 如{a:{b:{c:10}}}  lookup(dataobj,a.b.c)结果是10
export default function lookup(dataObj, keyName) {
    // 看看keyname中有没有'.',但不能是'.'本身
    if (keyName.indexOf('.') != -1 && keyName != '.') {
        // 有点符号，拆开
        var keys = keyName.split('.');
        // 设置临时变量，用于周转，一层一层的找，直到最内层的项
        var temp = dataObj;
        // 遍历keys
        for (var i = 0; i < keys.length; i++) {
            // 每找一层就把它设为新的临时变量
            temp = temp[keys[i]];
        }
        return temp;
    }
    // 如果没有点符号
    return dataObj[keyName];
};