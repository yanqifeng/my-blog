---
{
  "title": "手写new",
}
---

## new 做了什么

我们先看一下 MDN 对 new 的介绍：
> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

new操作符会进行如下的操作：
1. 创建一个空的简单JavaScript对象（即{}）  
2. 链接该对象（设置该对象的constructor）到另一个对象   
3. 将步骤1新创建的对象作为this的上下文   
4. 如果该函数没有返回对象，则返回this

## 实现 new

```js
function newOperator (ctor) {
  if (typeof ctor !== 'function') {
    throw('newOperator function the first param must a function')
  }
  // 创建一个原型指向构造函数原型的新对象
  let obj = Object.create(ctor.prototype)

  let argsArr = Array.prototype.slice.call(arguments, 1)

  // 将新创建的对象作为this的上下文
  let returnResult = ctor.apply(obj, argsArr)
  
  let isObject = typeof returnResult === 'object' && typeof returnResult !== null
  let isFunction = typeof returnResult === 'function'

  // 如果该函数没有返回对象，则返回this
  return isObject || isFunction ? returnResult : obj
}
```