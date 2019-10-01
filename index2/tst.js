// var obj = {
//     x: 1,
//     y: 2
// }
// console.log(obj.x)




// 我们想在输出它属性的做点其他事情 重写get方法 我们调用obj.x 实际上调用了obj.get方法
// var obj = {
//     x: 1,
//     y: 2
// }
// Object.defineProperty(obj, "x", { // 对象, 属性, 定义了什么东西
//     get: function() {
//         console.log('===');        
//         return obj.x;                    
//     }
// })
// console.log(obj.x); // 栈溢出了 得到最大值 你调用obj.x实际上调用的是obj.get方法 我们又调用obj.x 又调用....




// var obj = {
//     x: 1,
//     y: 2
// }
// function deepClone(obj) { // 最简单的深度克隆 但是性能不高
//     return JSON.parse(JSON.stringify(obj));
// }
// var newObj = deepClone(obj);
// Object.defineProperty(obj, "x", {
//     get: function() {
//         console.log('===');
//         return newObj.x;
//     }
// })
// console.log(obj.x);
// 我这个obj里面有一个属性 我得写一个 我这个obj里面有10个属性得写10个 是不是累死了 我们想用一个方法自动的把这个方法取出来 
//     这个方法用来代理过去的obj




// var obj = {
//     x: 1,
//     y: 2
// }
// function deepClone(obj) { // 最简单的深度克隆 但是性能不高
//     return JSON.parse(JSON.stringify(obj));
// }
// function proxyObj(obj) {
//     var newObj = deepClone(obj);
//     for(let temp in obj) { // 用var会形成一个闭包 尽量用let
//         Object.defineProperty(obj, temp, {
//             get: function() {
//                 console.log('====');
//                 return newObj[temp];
//             },
//             set: function(value) {
//                 console.log('++++');
//                 newObj[temp] = value;
//             }
//         })
//     }
// }
// proxyObj(obj);
// console.log(obj.x);
// console.log(obj.y);
// obj.x = 3;
// obj.y = 6;
// // 我们设置obj实际上是对newObj设置






// var obj = {
//     x: 1,
//     y: 2,
// }
// // ES6方法
// var proxy = new Proxy(obj, {
//     get: function(obj, x) {
//         console.log("===");

//         // return obj.x;
//         return Reflect.get(obj, 'x');
//     }
// })
// console.log(proxy.x);
// obj = proxy;
// console.log(obj.x);
// // Vue和React的底层用的是definedPropty 优点是兼容性好





// var obj = {
//     x: 1,
//     y: 2,
//     z: {
//         a: 1,
//         b: 2
//     }
// }
// function deepClone(obj) { // 最简单的深度克隆 但是性能不高
//     return JSON.parse(JSON.stringify(obj));
// }
// var newObj = deepClone(obj); // 把这放在做一次性的深度克隆就行
// function proxyObj(obj, newObj) {
//     for(let temp in obj) { // 用var会形成一个闭包 尽量用let
//         if(obj[temp] instanceof Object) {
//             proxyObj(obj[temp], newObj[temp]);
//         }else {
//             Object.defineProperty(obj, temp, {
//                 get: function() {
//                     console.log('====');
//                     return newObj[temp];
//                 },
//                 set: function(value) {
//                     console.log('++++');
//                     newObj[temp] = value;
//                 }
//             })
//         }
       
//     }
// }
// proxyObj(obj, newObj);
// console.log(obj.z);
// console.log(obj.z.a);
// obj.z.a = 3;



