 require('@babel/polyfill')
// // @babel/polyfill
// // Babel 包含一个polyfill 库。这个库里包含 regenerator 和 core-js.
// // 这个库将会模拟一个完全的 ES2015+ 的环境。
// // 这意味着你可以使用 新的内置语法 比如 promise 或者 WeakMap， 静态方法比如Array.from 或 Object.assign,
// // 实例方法 比如 Array.prototype.includes 和 generator 函数。
// a=1;
// let fn=()=>{
//     console.log('hello')
// }
// new Promise((a,b)=>{
//     setTimeout(()=>{
//         fn();
//         a();
//     },1000)
// })
// fn();
// async ()=>{
//     return await new Promise((a,b)=>{
//         setTimeout(()=>{
//             fn();
//             a();
//         },1000)
//     })
// }
// console.log(['1','2'].includes('1'))
// console.log("123".includes('1'))
// require('./index.css')

//file-loader默认会在内部生成一张图片 到build目录下 
//会把生成的图片的名字返回

//引入图片的方式
//1) js引入
// let img = require('./3.jpg');
// let image=document.createElement('img');
// image.src=img;
// document.body.append(image);
//2) css引入
//3) html引入
require('./index.css')