---
{
  "title": "手写call、apply、bind",
}
---

call，apply，bind 都能修改 this 指向。其中 call 和 apply 在修改 this 指向的同时会直接执行方法，而 bind 只是返回一个修改完 this 指向的函数。

## call 实现

```js
/**
 * thisArg 可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
 * arg1, arg2, ... 指定的参数列表。
 */
Function.prototype.call = function (context, ...args) {
  context = context || window
  const fn = Symbol()
  context[fn] = this

  const result = context[fn](...args)
  delete context[fn]
  return result
}
```

## apply 实现

```js
/**
 * thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
 * argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。从 ECMAScript5 开始可以使用类数组对象。
 */
Function.prototype.apply = function (context, args) {
  context = context || window
  const fn = Symbol()
  context[fn] = this

  if (!Array.isArray(args)) {
    args = []
  }
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```

## bind 实现

```js
/**
 * thisArg：调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，或者 thisArg 是 null 或 undefined，执行作用域的 this 将被视为新函数的 thisArg。
 * argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从 ECMAScript5 开始可以使用类数组对象。
 */
Function.prototype.bind = function (context, ...args1) {
  context = context || window
  const self = this
  
  const fBound =  function (...args2) {
    return self.apply(this instanceof fBound ? this : context, args1.concat(args2))
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype
  return fBound
}
```