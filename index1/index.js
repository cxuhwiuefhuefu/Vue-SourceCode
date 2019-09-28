// 解析固定模式的东西 把固定模式的东西叫做模板 分析模板
// 把内容全部传进来 然后再解析哪部分是模板
function analysisTemplate(html) {  // 传进的是html
    return html.match(/{{[a-zA-Z_]+[a-zA-Z0-9_]*}}/g);
}


// 过滤
function dropBorder(text) {
    console.log(text);   
    return text.substring(2, text.length - 2);
}


// 渲染
function render(el, originTemplate, templates, data) {
    var result = originTemplate;
    for(var i  = 0; i < templates.length; i++) {
        var tempValue = data[dropBorder(templates[i])]
        if(tempValue) {
            result = result.replace(templates[i], tempValue);
        }
    }
    el.innerHTML = result;
}


// 建立一个映射关系
// 页面元素和数据对象的映射关系
function MyMVVM(id, data) { // div的id, 数据
    this.id = id;
    this.data = data;
    this.el = document.getElementById(this.id);
    // 存放原始的模板
    this.originTemplate = this.el.innerHTML;
    this.templates = analysisTemplate(this.el.innerHTML);
    
    // render(this.el, this.templates, this.data);
    return render(this.el, this.originTemplate, this.templates, this.data);
}


// 建立映射关系 =》 解析模板 =》 替换 =》 渲染