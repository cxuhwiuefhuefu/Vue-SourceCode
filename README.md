# Vue-SourceCode
Vue源码学习笔记
- index1 MVVM初始化
- index2 双向数据绑定
- index3 构建虚拟DOM
- index4 建立对应关系





推荐文章

- https://www.cnblogs.com/echolun/p/9631836.html(JSON)
- https://zhuanlan.zhihu.com/p/24475845?refer=mirone(MVVM)
- https://www.jianshu.com/p/c2a1aa2e2b14(Proxy)
- https://www.jianshu.com/p/4a5eca0536c3(Reflect)










---
介绍 
vue不只面向web  我们说的源码是在浏览器环境下执行的
主要功能都写在core这个文件夹里面 platforms文件夹有web和weex 因为vue现在逐渐的向移动端进行转变 它可能以后支持服务端或者app的开发 compiler涉及到和编译相关的
core是核心代码 我们平时说的vue源码说的是它在浏览器下的运行

大量参考VUE 还有rect agular 主要是MVVM源码

---
程序的起点
index.js 主函数 框架的入口
default和没有default区别很大？？？ 不用写花括号
先用ES6写 也用ES6的方式用 最后可以用babel打包一下
type="module" 这个表明只能局部被访问
只允许以id的形式被挂载
init.js给Due添加初始化方法 

---
代理data对象-基本方式
代理的原理是什么 Data{
    a: 1,

}

实现基本的代理 数组里面套数组 对象里面套对象 