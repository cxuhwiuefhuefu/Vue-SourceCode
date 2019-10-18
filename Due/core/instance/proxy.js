function constructProxy(vm, obj, namespace) { // obj 即将代理的对象
    let proxyObj = {};
    for(let prop in obj) {
        Object.defineProperty(proxyObj, prop, {
            configurable: true,
            get() {
                return obj[prop];
            },
            set(value) { // 当我们需要给它设置值得时候 值发生变化了 对应的dom节点也要发生变化了 
                console.log(prop); // 让它修改对应属性的时候 我们把对应的节点的值给它渲染了
                obj[prop] = value;
            }
        });

        Object.defineProperty(vm, prop, { // 给本身也做了代理
            configurable: true,
            get() {
                return obj[prop];
            },
            set: function(value) {
                obj[prop] = value;
            }
        })
    }

    return proxyObj;
}



// 我们要知道哪个属性被修改了 我们才能对页面上的内容进行更新
// 所以我们必须先能够捕获修改的这个事件
// 没有哪个对象修改了有事件了 所以我们需要用代理的方式来实现监听属性修改
export default constructProxy(vm, obj, namespace) { // vm表示Due对象, obj表示要代理的对象
    // 会遇到递归的算法 vue源码中有用到递归
    let proxyObj = null;
    if(obj instanceof Array) { // 判断这个对象是否为数组
        
    }else if(obj instanceof Object) { // 判断这个对象是否为对象
        proxyObj = constructObjectProxy(vm, obj, namespace);
    }else {
        throw new Error("error");
    }
    return proxyObj;
}