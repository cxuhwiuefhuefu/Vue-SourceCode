const arrayProto = Array.prototype;

function defArrayFunc(obj, func, namespace, vm) { // 每个方法传入一个vm形成一个规范  这样他们时时刻刻都找到自己的本体
    Object.defineProperty(obj, func, {
        enumerable: true,
        configurable: true,
        value: function(...args) {
            let original = arrayProto[func];
            const result = original.apply(this, args);
            console.log(getNameSpace(namespace, ""));
            return result;
        }
    });
}

// 重写代理对象  用这样的方式对数组进行代理
function proxyArr(vm, arr, namespace) {
    let obj = {
        eleType: "Array",
        toString: function() {
            let result = '';
            for(let i = 0; i < arr.length; i++) {
                result += arr[i] + ", ";
            }
            return result.substring(0, result.length - 2);
        },
        push() {},
        pop() {},
        shift() {},
        unshift() {}
    }
    defArrayFunc.call(vm, obj, "push", namespace, vm);
    defArrayFunc.call(vm, obj, "pop", namespace, vm);
    defArrayFunc.call(vm, obj, "shift", namespace, vm);
    defArrayFunc.call(vm, obj, "unshift", namespace, vm);

    arr.__proto__ = obj;
    return arr;
}



function constructObjectProxy(vm, obj, namespace) { // obj 即将代理的对象
    let proxyObj = {};
    for(let prop in obj) {
        Object.defineProperty(proxyObj, prop, {
            configurable: true,
            get() {
                return obj[prop];
            },
            set(value) { // 当我们需要给它设置值得时候 值发生变化了 对应的dom节点也要发生变化了 
                console.log(getNameSpace(namespace, prop)); // 让它修改对应属性的时候 我们把对应的节点的值给它渲染了
                obj[prop] = value;
            }
        });

        Object.defineProperty(vm, prop, { // 给本身也做了代理
            configurable: true,
            get() {
                return obj[prop];
            },
            set: function(value) {
                console.log(getNameSpace(namespace, prop));
                obj[prop] = value;
            }
        });

        if(obj[prop] instanceof Object) { // 如果子集是对象 继续进行代理
            obj[prop] = constructProxy(vm, obj[prop], getNameSpace(namespace, prop)); // 它往下传的时候就有它的命名空间 是上一级传进来的命名空间+当前的属性名
        }
    }

    return proxyObj;
}




// 修改命名空间
function getNameSpace(nowNameSpace, nowProp) {
    if(nowNameSpace == null || nowNameSpace == "") {
        return nowProp;
    }else if(nowProp == null || nowProp == "") {
        return nowNameSpace;
    }else { // 进行拼写
        return nowNameSpace + '.' + nowProp;
    }
}






// 我们要知道哪个属性被修改了 我们才能对页面上的内容进行更新
// 所以我们必须先能够捕获修改的这个事件
// 没有哪个对象修改了有事件了 所以我们需要用代理的方式来实现监听属性修改
export function constructProxy(vm, obj, namespace) { // vm表示Due对象, obj表示要代理的对象
    // 会遇到递归的算法 vue源码中有用到递归
    let proxyObj = null;
    if(obj instanceof Array) { // 判断这个对象是否为数组
        proxyObj = new Array(obj.length);
        for(let i = 0; i < obj.length; i++) {
            proxyObj[i] = constructProxy(vm, obj[i], namespace); // 数组里每一个元素的修改
        }
        proxyObj = proxyArr(vm, obj, namespace);
    }else if(obj instanceof Object) { // 判断这个对象是否为对象
        proxyObj = constructObjectProxy(vm, obj, namespace);
    }else {
        throw new Error("error");
    }
    return proxyObj;
}