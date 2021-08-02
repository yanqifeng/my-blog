---
{
  "title": "函数上下文中this的指向",
}
---

> `this` 是在函数调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

## 默认绑定
独立函数调用时，**非严格模式下指向全局对象，严格模式下指向 undefined。** 这条规则也可以看作是无法应用其他规则时的默认规则。

```js
function foo1 () {
  console.log(this)
}
foo1() // window

function foo2 () {
  "use strict"
  console.log(this)
}
foo2() // undefined
```

## 隐式绑定
函数的调用是在某个对象上触发的，即函数调用位置有上下文对象时，如 `obj.foo()` 的调用方式，`foo` 内的 `this` 指向 `obj`。

```js
function foo () {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo
}
obj.foo() // 2
```

> 注意：对象属性引用链只有最顶层或者说最后一层会影响调用位置。
```js
function foo () {
  console.log(this.a)
}
var obj2 = {
  a: 42,
  foo
}
var obj1 = {
  a: 2,
  obj2
}
obj1.obj2.foo() // 42 此时 foo 函数的 this 指向的是 obj2
```

### 隐式丢失
被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 `this` 绑定到全局对象或 `undefined` 上。
```js
function foo () {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo
}
var a = 'oops, global'

var bar = obj.foo
bar() // 'oops, global
setTimeout(obj.foo, 100) // 'oops, global
```
虽然 `bar` 是 `obj.foo` 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 `bar()` 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

同理，参数传递也是一种隐性赋值，我们将 `obj.foo` 作为参数传入 `setTimeout` 函数，也会发生隐式丢失。

## 显式绑定
显式绑定指的是通过 `call`、`apply` 显式的更改 `this` 指向。

> 注意：call、apply、bind 第一个参数为 null 或者 undefined 时，这些值在调用时会被忽略，实际上应用的是默认绑定规则

```js
function foo () {
  console.log(this.a)
}
var obj = {
  a: 2
}
foo.call(obj) // 2
foo.apply(obj) // 2
```
假如你传入了一个原始值（字符串、布尔类型或者数字类型）来当做 `this` 的绑定对象，这个原始值会被转换成它的对象形式（new String(...)、new Boolean(...) 或者 new Number(...)）

### 硬绑定
使用 `bind` 显式地更改函数的 `this` 指向之后，将无法再次修改该函数的 `this` 指向，我们称之为硬绑定。

```js
function foo (something) {
  console.log(this.a, something)
  return this.a + something
}
var obj = {
  a: 2
}
var bar = foo.bind(obj)
var b = bar(3) // 2 3
console.log(b) // 5

var obj2 = {
  a: 20
}
// 由于 bar 已经使用过硬绑定，再次使用 bind 修改 this 指向无效
var bar2 = bar.bind(obj2)
var b2 = bar(30) // 2 3
console.log(b2) // 5
```

## new 绑定
我们先来看一下当使用 `new` 操作符来调用一个函数的时候发生了什么：
1. 创建一个新对象
2. 这个新对象会被执行[[原型]]连接（新对象的原型会指向构造函数的原型）
3. 这个新对象会绑定到函数调用的 this   
4. 如果函数没有返回对象，则返回这个新对象

因此，当我们使用 `new` 来调用函数的时候，我们会创建一个新对象并把它绑定到 `foo()` 调用中的 `this` 上。

```js
function foo(a){
  this.a = a
}
var bar = new foo(2)
console.log(bar.a) // 2
```

## 优先级
new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定
* 函数是 `new` 出来的，`this` 指向实例
* 函数通过 `call`、`apply`、`bind` 绑定过，`this` 指向绑定的第一个参数
* 函数在某个上下文对象中调用（隐式绑定），`this` 指向上下文对象
* 以上都不是，`this` 非严格模式指向全局对象，严格模式指向 `undefined`

## 箭头函数
**箭头函数和普通函数的 `this` 不同，会指向定义时的作用域上**

```js
var msg = 'bar'
var obj = {
  msg: 'foo',
  foo: () => {
    console.log(this.msg)
  }
}
obj.foo() // bar
obj.foo.call(obj) // bar
```

## 练习题
这里的题目已经比较全面了，可以去看一下。

[霖呆呆 【建议👍】再来40道this面试题酸爽继续(1.2w字用手整理)](https://juejin.cn/post/6844904083707396109)