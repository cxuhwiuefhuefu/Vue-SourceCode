import Due from './proxy.js'

// 每个Due对象都有一个id
let uid = 0;

export function initMixin(Due) {
    Due.prototype._init = function(options) {
        const  vm = this; // 虚拟节点 Due是一个虚拟的模块 定义vm
        vm.uid = uid ++; // 就是给他一个编号 不要给他重复了 标志的是否是id编号
        this._isDue = true; // 表示是否是vue的对象



        // 初始化数据data
        if(options && options.data) {
            vm._data = constructProxy(vm, options.data, "");
        }




        // 初始化created方法
        // 初始化methods
        // 初始化computed
        // 初始化el并挂载

    }
}