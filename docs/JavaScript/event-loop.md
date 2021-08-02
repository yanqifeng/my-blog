### 宏队列和微队列
> 宏队列，macrotask，也叫tasks。一些异步任务的回调会依次进入，等待后续被调用。这些异步任务包括：
* setTimeout
* setInterval
* setImmediate(Node独有)
* requestAnimationFrame(浏览器独有)
* I/O
* UI rendering(浏览器独有)

> 微队列，microtask，也叫jobs。另一些异步任务会依次进入，等待后续被调用。这些异步任务包括：
* process.nextTick(Node独有)
* Promise
* Object.observe
* MutationObserver

1. 所有的同步任务都在主线程上执行，形成一个执行栈
2. 主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列之中放置一个事件。
3. 一旦执行栈中的所有同步任务执行完毕，系统就会读取任务队列。先读取微队列，清空之后读取宏队列的第一个，执行完毕再次读取微队列，重复直到读取完毕。