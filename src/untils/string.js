//计算字符串html页面中实际占用长度 用于针对是否超过给定长度做不同处理
String._widthCache={};
String.prototype.width = function(font) {
    if(String._widthCache[this]==undefined){
        var f = font || "13px 'Microsoft YaHei','Roboto',sans-serif",
        o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
        w = o.width();
        o.remove();
        String._widthCache[this]= w;
        return w;
    }else{
        return  String._widthCache[this];
    }
}

export default String