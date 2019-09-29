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





// 监听数据
function deepClone(obj) { // 最简单的深度克隆 但是性能不高
    return JSON.parse(JSON.stringify(obj));
}
function proxyObj(obj, newObj) {
    var self = this;
    for(let temp in obj) { // 用var会形成一个闭包 尽量用let
        if(obj[temp] instanceof Object) {
            proxyObj(obj[temp], newObj[temp]);
        }else {
            Object.defineProperty(obj, temp, {
                get: function() {
                    console.log('====');
                    return newObj[temp];
                },
                set: function(value) {
                    newObj[temp] = value;
                    console.log(this);
                    console.log(this.el, this.originTemplate, this.templates, this.data);
                    render(self.el, self.originTemplate, self.templates, self.data);
                }
            })
        }
       
    }
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
    
    this.cloneObj = deepClone(this.data);
    proxyObj.call(this, this.data, this.cloneObj)
    
    return render(this.el, this.originTemplate, this.templates, this.data);
}


// 建立映射关系 =》 解析模板 =》 替换 =》 渲染


//        VM(映射关系)
// View <============ Model
// View <============ Model
// View <============ Model
// View <============ Model
//          MVVM
// 基于映射关系 这边一修改数据这边就能发生变化

// 虚拟DOM 就是映射关系 (Vue和React) 为什么提到虚拟DOM 现在我只要任何一个数据修改了 我都要把整个el下所有的东西都渲染一遍 我希望我修改哪块我就只修改哪一块就可以了 不要把它所有的东西都重新渲染一遍 这样虚拟不高 所以我们需要用虚拟DOM把它拆成一小节一小节的 哪一节发生变化就玩哪一节



// 这节就是双向数据绑定  (数据一般都是后台发生变化 从后台拿到新的数据填充上去了)
// 下一节就是虚拟DOM
