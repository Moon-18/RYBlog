[toc]



# 参考

https://juejin.cn/post/6844903512845860872

https://juejin.cn/post/7062155174436929550

https://juejin.cn/post/6844904077537574919

链接：https://juejin.cn/post/6879692911680684040

# 总结

关于Promise

状态：

- pending
- fulfilled
  - resolved
  - rejected

构造函数传入一个立即执行函数，函数的参数是两个函数；立即执行函数内部resolve()会交给then，reject(原因)会交给catch，都不弄就处于判定状态，then catch都不执行

> 打印promise 结果是啥呢？
>
> 
>
> Promise { ‘pending’}
>
> Promise { resolve信息}
>
> Promise { ‘rejected’}

promise.then(onFulfilled, onRejected)接收两个参数，一个是状态变为resolve后的回调函数，一个是状态变为reject后的回调函数（此处只讨论onFulfilled）

- 如果onFulfilled是一个函数，且有返回值，则返回值可以继续传递给后续的then
- 如果onFulfilled是一个函数，但没有返回值（相当于return undefined），则后续then中的入参为undefined
- 如果onFulfilled不是函数，则忽略当前then，将参数直接传递给后续的then



如果then中又有其他的promise呢？

如果没有return,这里的promise会成为一个副作用，然后把undefined传递给后续的then, then并不会等待这个promise
 只有当onFulfilled的返回值是一个Promise时，后续then才会等该promise状态变化后才执行
 所以写then时保持有return或者throw的好习惯

- return 另一个promise
- return 一个同步的值或者undefined
- throw一个异常



```js
new Promise((resolve, reject) => {
	// resolve(1);
	// reject(2);
})
	.then((value) => {
		console.log('value', value);
	})
	.catch((reason) => {
		console.log('reason', reason);
	});
//上面无输出

new Promise((resolve, reject) => {
	resolve(1);
	// reject(2);
})
	.then((value) => {
		console.log('value', value);
	})
	.catch((reason) => {
		console.log('reason', reason);
	});
//上面输出 value 1

new Promise((resolve, reject) => {
	// resolve(1);
	reject(2);
})
	.then((value) => {
		console.log('value', value);
	})
	.catch((reason) => {
		console.log('reason', reason);
	});
//上面输出 reason 2
```



关于上面的then

```js
new Promise((resolve, reject) => {
	resolve(1);
})
	.then((value) => {
		console.log('then1', value);
		return value;
	})
	.then((value) => {
		console.log('then2', value);
	})
	.then((value) => {
		console.log('then3', value);
	})
	.then(3)
	.then((value) => {
		console.log('then4', value);
	});
//then1 1
//then2 1
//then3 undefined
//then4 undefined
```



# js执行机制

参考文章https://juejin.cn/post/6844903512845860872

如何分析？

画出调用栈、宏任务队列、微任务队列；首先整个脚本当做第一个宏任务，放入调用栈开始调用，宏任务与微任务进行交替

每次当一次事件循环结束后，即一个宏任务执行完成后以及微任务队列被清空后，浏览器就会进行一次页面更新渲染。

# 宏任务微任务

宏任务：外层同步代码，

# 为什么要区分宏任务微任务

为什么要分微任务和宏任务？

微任务是线程之间的切换，速度快。不用进行上下文切换，可以快速的一次性做完所有的微任务。

宏任务是进程之间的切换，速度慢，且每次执行需要切换上下文。因此一个Eventloop中只执行一个宏任务。

而区分微任务和宏任务的根本原因是为了**插队**。由于微任务执行快，一次性可以执行很多个，在当前宏任务执行后立刻清空微任务可以达到伪同步的效果，这对视图渲染效果起到至关重要的作用。

反观如果不区分微任务和宏任务，那么新注册的任务不得不等到下一个宏任务结束后，才能执行。

宏任务执行=》注册新任务放在下一个宏任务之后=》执行下一个宏任务

执行栈：【当前宏任务】

队列： 【下一个宏任务】 【新任务】

一个完整的EVENLOOP

- 执行栈加载整个 < script >中的代码

- 执行代码，判断是同步还是异步

- 同步直接执行，异步则判断为宏任务还是微任务=》放入各自的队列

- 同步代码全部执行完毕，开始清空微任务队列

- 微任务队列清空完毕，渲染并且更新界面

- 处理worker相关的任务

- 》》开启下一轮的事件循环，弹出< script >任务，加载下一个宏任务

原文链接：https://blog.csdn.net/qq_41732961/article/details/117675693

# 1.单线程

# 2.事件循环

既然js是单线程，那就像只有一个窗口的银行，客户需要排队一个一个办理业务，同理js任务也要一个一个顺序执行。如果一个任务耗时过长，那么后一个任务也必须等着。那么问题来了，假如我们想浏览新闻，但是新闻包含的超清图片加载很慢，难道我们的网页要一直卡着直到图片完全显示出来？因此聪明的程序员将任务分为两类：

- 同步任务
- 异步任务

当我们打开网站时，网页的渲染过程就是一大堆同步任务，比如页面骨架和页面元素的渲染。而像加载图片音乐之类占用资源大耗时久的任务，就是异步任务。关于这部分有严格的文字定义，但本文的目的是用最小的学习成本彻底弄懂执行机制，所以我们用导图来说明：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdd88994142347~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

导图要表达的内容用文字来表述的话：

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

我们不禁要问了，那怎么知道主线程执行栈为空啊？js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。

说了这么多文字，不如直接一段代码更直白：

```javascript
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');

```

上面是一段简易的`ajax`请求代码：

- ajax进入Event Table，注册回调函数`success`。
- 执行`console.log('代码执行结束')`。
- ajax事件完成，回调函数`success`进入Event Queue。
- 主线程从Event Queue读取回调函数`success`并执行。

相信通过上面的文字和代码，你已经对js的执行顺序有了初步了解。接下来我们来研究进阶话题：setTimeout。



**`event loop`它的执行顺序：**

- 一开始整个脚本作为一个宏任务执行
- 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
- 当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完
- 执行浏览器UI线程的渲染工作
- 检查是否有`Web Worker`任务，有则执行
- 执行完本轮的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

**微任务包括：**`MutationObserver`、`Promise.then()或catch()`、`Promise为基础开发的其它技术，比如fetch API`、`V8`的垃圾回收过程、`Node独有的process.nextTick`。

**宏任务包括**：`script` 、`setTimeout`、`setInterval` 、`setImmediate` 、`I/O` 、`UI rendering`。

**注意**⚠️：在所有任务开始的时候，由于宏任务中包括了`script`，所以浏览器会先执行一个宏任务，在这个过程中你看到的延迟任务(例如`setTimeout`)将被放到下一轮宏任务中来执行。

# 3.Promise

## Promise.then(..., err=>{})和Promise.catch()区别、Promise的then的第二个参数和catch的区别

https://juejin.cn/post/7075894989200293919

- 主要区别就是，如果在then的第一个函数里抛出了异常，后面的catch能捕获到，而then的第二个函数捕获不到

- then的第二个参数和catch捕获错误信息的时候会遵循就近原则。

  如果是promise内部报错，reject抛出错误后，then的第二个参数和catch方法都存在的情况下，只有then的第二个参数能捕获到，如果then的第二个参数不存在，则catch方法会捕获到。

- **第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch方法，而不使用then方法的第二个参数。**





面试题https://juejin.cn/post/6844904077537574919

1. 前置准备

   - 实例对象与函数对象
   - 回调函数
     - 同步
       - 理解: 立即执行, 完全执行完了才结束，不会放入回调队列中
       - 例子: 数组遍历相关的回调函数 / Promise的excutor函数/传递函数作为参数来执行
     - 异步
       - 理解: 不会立即执行，会放入回调队列中将来执行
       - 例子: 定时器回调 / ajax回调 / Promise的成功|失败的回调
   - Error对象

2. Promise理解与使用

   - Promise理解

     - 定义

       - 一个 `Promise` 对象代表一个在这个 `Promise` 被创建出来时不一定已知的值。它让您能够 **把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来**。 这样使得异步方法可以像同步方法那样返回值：**异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者**。
       - 抽象表达：Promise 是 ES6 引入的异步编程的新解决方案。在 Promise 出现之前，只是单纯的使用回调函数。
       - 具体表达：Promise 是一个构造函数，由 Promise 产生的对象用来封装一个异步操作，并且可以获取其成功/失败的最终结果。

     - 状态

       - 一个 `Promise` 必然处于以下几种状态之一：

       - 待定（`pending`）: 初始状态，既没有被兑现，也没有被拒绝。

       - 成功（`fulfilled`）: 意味着操作成功完成。

       - 失败（`rejected`）: 意味着操作失败。

       - 一个 `Promise` 的状态只能由 `pending` 变为 `fulfilled`，或者变为 `rejected`，且只能改变一次。

       - 链式调用：`Promise` 对象具有 `then` 和 `catch` 方法来处理下一步的操作。因为 `Promise.prototype.then` 和 `Promise.prototype.catch` 方法返回的是 `Promise`，所以它们可以被链式调用。

       - pending -> resolve方法 -> fulfilled -> resolved
         pending -> reject方法 -> rejected -> resolved

         一开始是 pending，无论 resolve 还是 reject，都是 resolved，这里指得是完成、不会再改变了的状态；对应的 pending 就是尚未完成的状态。

         fulfilled 是一种 resolved
         rejected 也是一种 resolved

     - 基本流程

       - 一个 `Promise` 对象刚被创建时的初始状态为 `pending`。接下来会执行异步操作，若异步操作成功，则执行 `resolve()` 函数，可将成功返回的数据通过 `resolve(data)` 返回。若异步操作失败，则执行 `reject()` 函数，将失败的信息返回。

         无论成功还是失败，返回的都是 `Promise` 对象，具有 `then()` 和 `catch()` 方法。

         返回的 `Promise` 使用 `then()` 调用：

         ```js
         promise.then(successCallback, failureCallback);
         ```

         其中，`successCallback` 是成功的回调函数，`failureCallback` 是失败的回调函数。一般格式为：

         ```js
         promise.then(value=>{}, reason=>{})
         ```

     - 基本使用

       - 构造函数 `Promise()`内部自动执行一个 **执行器函数**，也叫 `executor`。这个执行器函数又接收两个参数，第一个为执行成功的回调函数（`resolve`），第二个为操作成功的回调函数（`reject`）。

         需要注意，**executor 执行器函数是同步回调函数**。
         例如有以下代码：

         ```js
         new Promise(
           // 执行器函数开始
           (resolve, reject) => {
             console.log(1)
             // 异步操作
             setTimeout(() => {
               console.log(2)
             }, 0)
             console.log(3)
           }
         )
         console.log(4)
         ```

         打印结果是：1、3、4、2

         **基本使用流程**

         ```js
         const promise = new Promise((resolve, reject) => {
         
           // 执行异步操作
           // 操作成功，可将数据传入
           resolve(data)
           // 操作失败，可将错误信息传入
           reject(err_msg)
         
         })
         
         // 处理返回结果
         promise.then(
           // 操作成功的回调
           value => { },
           // 操作失败的回调
           reason => { }
         )
         ```

         具体例子如下：

         ```js
         // 1. 创建 Promise 对象，此时为 pending 状态
         const promise = new Promise((resolve, reject) => {
           // 2. 执行异步操作，这里是定时器函数
           setTimeout(() => {
             let time = Date.now()
             if (time % 2 === 1) {
               // 2.1 假定 time 为奇数时为操作成功，则执行 resolve
               resolve('成功的值：' + time)
             } else {
               // 2.1 假定 time 为偶时为操作失败，则执行 reject
               reject('失败的值：' + time)
             }
           }, 1000)
         })
         
         // 3. promise 能指定成功或失败的回调函数来获取成功的 value，或失败的 reason
         promise.then(
           // 3.1 操作成功（resolve）的回调函数
           value => {
             console.log(value)
           },
           // 3.1 操作失败哦（reject）的回调函数
           reason => {
             console.log(reason)
           }
         )
         ```

   - 为什么要使用?

     - 指定回调函数的方式更加灵活

       - 在出现 Promise 以前，纯回调方式：在启动异步任务的同时，必须先指定好回调函数，否则会拿不到数据。
       - Promise：启动异步任务 => 返回 Promise 对象 => 给 promise 绑定回调函数。甚至可以在异步任务结束后再指定回调函数，而这在单纯的回调方式中是不行的。

     - 支持链式调用，解决回调地狱问题

       - 回调地狱：回调函数嵌套调用，**外部回调函数异步执行的结果是嵌套的回调函数执行的条件**。

       - 回调地狱的缺点：**不便于阅读，不便于异常处理**。

       - 例如，现在要获取一个用户所有的商品数据，首先要根据用户名获取用户ID，然后根据ID获取订单信息，根据订单信息获取商品信息。一共要发起三次请求，前面的请求结果是后面请求的条件。

         ```js
         doSomething(function(result) {
           doSomethingElse(result, function(newResult) {
             doThirdThing(newResult, function(finalResult) {
               console.log('Got the final result: ' + finalResult);
             }, failureCallback);
           }, failureCallback);
         }, failureCallback);
         ```

         可以改写为

         ```js
         // 把回调绑定到返回的 Promise 上，形成一个 Promise 链
         doSomething().then(function(result) {
           return doSomethingElse(result);
         })
         .then(function(newResult) {
           return doThirdThing(newResult);
         })
         .then(function(finalResult) {
           console.log('Got the final result: ' + finalResult);
         })
         .catch(failureCallback);
         ```

       - 链式调用格式

         ```js
         const p = new Promise(resolve=>{}, reject=>{});
         p.then(value=>{}, reason=>{})
         .then(value=>{}, reason=>{})
         .then(value=>{}, reason=>{})
         ...
         ```

   - 如何使用

     - Promise API

     - 构造函数

       - Promise 构造函数接收一个执行器 `executor`，来启动这个 Promise。

         ```js
         new Promise(executor)
         ```

         这个 `executor` 执行器函数又接收两个参数 `resolve` 和 `reject`，分别表示操作成功和操作失败。

         ```js
         new Promise((resolve, reject) => {
           resolve()
           // reject()
         })
         ```

         - `executor` 函数：执行器 `(resolve, reject) => { }`
         - `resolve` 函数：内部定义成功时我们调用的函数 `value => {}`
         - `reject` 函数：内部定义失败时我们调用的函数 `reason => {}`
         - executor 会在 Promise 内部立即同步调用，而异步操作则在 executor 执行器中执行。

     - Promise.prototype.then()

       - `Promise.prototype.then` 方法绑定在原型 `prototype` 上，意味着这是一个实例方法，必须在实例对象上才能使用。该方法返回的结果依然是一个 `Promise` 对象，意味着我们可以进行链式调用。

         语法：

         ```js
         p.then(onFulfilled, onRejected);
         
         p.then(value => {
           // fulfillment
         }, reason => {
           // rejection
         });
         ```

         参数：

         - `onFulfilled` 函数：成功的回调函数 `(value) => {}`
         - `onRejected` 函数：失败的回调函数 `(reason) => {}`

         返回值：
         如果 `then` 中的回调函数：

         - 返回了一个值，那么 `then` 返回的 Promise 将会成为接受状态（`fulfilled`），并且将返回的值作为接受状态的回调函数的参数值。
         - 没有返回任何值，那么 `then` 返回的 Promise 将会成为接受状态（`fulfilled`），并且该接受状态的回调函数的参数值为 undefined。
         - 抛出一个错误，那么 `then` 返回的 Promise 将会成为拒绝状态（`rejected`），并且将抛出的错误作为拒绝状态的回调函数的参数值。
         - 返回一个已经是接受状态（`fulfilled`）的 Promise，那么 `then` 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
         - 返回一个已经是拒绝状态（`rejected`）的 Promise，那么 `then` 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
         - 返回一个未定状态（`pending`）的 Promise，那么 `then` 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。

     - Promise.prototype.catch()

       - `catch()` 方法返回一个 `Promise`，并且处理操作失败的情况。它的行为与调用 `Promise.prototype.then(undefined, onRejected)` 相同。但是用起来更方便了，可以看作是一种 **语法糖**（让我们执行某些操作更加方便简洁的方法）。

         语法：

         ```js
         p.catch(onRejected);
         
         p.catch(reason => {
            // 操作失败
         });
         ```

         等同于：

         ```js
         p.then(undefined, onFulfilled);
         
         p.then(undefined, reason => {
           // 操作失败
         })
         ```

         参数：

         - `onRejected`：操作失败时的回调函数 `(reason) => {}`

         返回值：

         - 返回一个 `Promise` 对象。如果 `onRejected` 抛出一个错误或返回一个本身失败的 `Promise`，那么 `catch()` 返回的 `Promise` 的状态为 `rejected`；否则，状态为 `fulfilled`。

     - Promise.resolve()

       - `Promise.resolve()` 是一个函数对象方法，意味着只能用在函数对象 `Promise` 上。它接收一个 `value` 参数，返回一个这个给定值解析后的 `Promise` 对象。

         语法：

         ```js
         Promise.resolve(value);
         ```

         参数：

         - `value`：被解析的参数，可以是一个值，也可以是一个 Promise 对象，或者是一个 thenable

         返回结果：

         - 若给定值为一个普通数、字符串或数组等等之类的，则返回一个成功的 Promise
         - 若参数本身就是一个 Promise 对象，则直接返回这个 Promise 对象。
         - 由此可知，`resolve()` 方法可以返回一个成功或者失败的 Promise 对象

     - Promise.reject()

       `Promise.reject()` 方法返回一个失败的 Promise 对象，接收一个 `value` 参数，表示失败的原因。

       语法：

       ```js
       Promise.reject(reason);
       ```

       参数：

       - `reason`：表示操作失败的原因

       返回值：

       - 返回一个失败（状态为 `rejected` ）的 Promise 对象

     - Promise.all()

       `Promise.all()` 方法接收由多个 promise 组成的可迭代类型（Array、Map、Set等），然后返回一个新的 promise。它等待所有 promise 完成，或者第一个失败的 promise。

       ```js
       Promise.all(iterable);
       
       Promise.all(promise1, promise2, ...)
       
       const p = Promise(promise1, promise2)
       p.then(values=>)
       ```

       参数：

       - `iterable`：可迭代类型，一般为数组

       返回值：

       - 若传入的参数为空的可迭代对象，例如 `Promise.all([])`，则返回一个已完成状态（`fulfilled`）的 Promise
       - 若传入的参数不包含任何 promise，则返回一个异步完成（`asynchronously resolved`）的 Promise。例如 `Promise.all([1, 2])`
       - 其它情况下返回一个处理中（`pending`）的 Promise。只有接收的参数的 promise 全部成功，这个返回的 Promise 才会是成功的，只要有一个失败，则返回一个失败的 Promise，且返回的值为第一个失败的值。
       - 若所有 promise 都成功，则返回的 Promise 的值为一个包含了多个结果的数组

       Promise.all 的同步与异步：

       - **当如果传入的可迭代对象是空的，就是同步；其他情况都是异步**。

       举例:
       参数为非空的数组，异步的：

       ```js
       const p = Promise.all([1])
       setTimeout(() => {
         console.log(p)
       })
       console.log('同步代码')
       console.log(p) // (1)
       // 输出：
       // 同步代码
       // Promise {<pending>}
       // Promise {<fulfilled>: Array(1)}
       ```

       注意：此时（1）输出状态为 `pending`，因为同步代码先执行，而此时异步 promise 的结果还未知

       参数为空数组，同步的：

       ```js
       const p1 = Promise.all([])
       setTimeout(() => {
         console.log(p1)
       })
       console.log('同步代码')
       console.log(p1) // （1）
       // 输出
       // 同步代码
       // Promise {<fulfilled>: Array(0)}
       // Promise {<fulfilled>: Array(0)}
       ```

       注意：此时（1）输出状态为 `fulfilled`，说明此时 `Promise.all` 是同步的。

       **Promise.all 方法举例**

       ```js
       // 参数为空的数组
       const p1 = Promise.all([])
       
       // 参数为不包含 promise 的数组
       const p2 = Promise.all([1, 2, 3])
       
       // 参数为全部是成功的 promise 的数组
       let pm1 = Promise.resolve(1)
       let pm2 = Promise.resolve(2)
       let pm3 = Promise.resolve(3)
       const p3 = Promise.all([pm1, pm2, pm3])
       
       // 结果
       setTimeout(() => {
         console.log(p1)
         console.log(p2)
         console.log(p3)
         // Promise {<fulfilled>: Array(0)}
         // Promise {<fulfilled>: Array(3)}
         // Promise {<fulfilled>: Array(3)}
       })
       
       // 参数为包含失败的 promise 的数组
       let pe1 = Promise.resolve(1)
       let pe2 = Promise.reject('error')
       let pe3 = Promise.resolve(3)
       const p4 = Promise.all([pe1, pe2, pe3])
       
       setTimeout(() => {
         console.log(p4)
       })
       // 输出
       // Promise {<rejected>: 'error'}
       ```

     - Promise.race()

       `Promise.race()` 也是接收一个可迭代类型，例如一个包含了多个 promise 的数组。然后返回一个新的 promise，第一个完成的 promise 的结果状态就是最终返回的结果状态。

       需要注意，这里最终返回的结果的状态不一定是参数数组中位于前面的 promise，具体要看哪一个最先完成，所以 `race()` 方法的返回结果可能为成功或失败的。

       语法：

       ```js
       Promise.race(iterable);
       ```

       参数：

       - `iterable`：可迭代对象，一般为包含多个 promise 的数组

       返回值：

       - 返回一个 promise，只要给定的可迭代对象中的 promise 有一个先完成（成功或失败），就采用它的值作为最终 promise 的值，状态与这个完成的 promise 相同。

       Promise.race 的异步性（没有同步性）：

       ```js
       const p = Promise.race([Promise.resolve(10), Promise.resolve(20)])
       
       // 立即输出p，此时p状态为 pending
       console.log(p)
       
       setTimeout(() => {
         // 等栈中代码执行完毕之后执行，可得到完成的promise
         console.log('the stack is now empty');
         console.log(p)
       })
       
       // 输出：
       // Promise { <state>: "pending" }
       // the stack is now empty
       // Promise { <state>: "fulfilled", <value>: 33 }
       ```

       注意：`Promise.race` 没有同步性

     - 几个关键问题

       1. 如何改变Promise状态

          - `resolve(value)`：如果当前是 pending 就会变为 resolved
          - `reject(reason)`：如果当前是 pending 就会变为 rejected
          - 抛出异常：如果当前是 pending 就会变为 rejected

       2. 一个promise指定多个成功/失败回调函数，都会调用吗?

          当 promise 改变为对应状态时都会调用。

          ```js
          let p = new Promise((resolve, reject) => {
            throw 100
          })
          p.then(
            value => { },
            reason => {
              console.log('reason1 ' + reason)
            }
          )
          p.then(
            value => { },
            reason => {
              console.log('reason2 ' + reason)
            }
          )
          // 输出
          // reason1 100
          // reason2 100
          ```

       3. ####  改变 promise 状态和指定回调函数谁先谁后？

          1. 都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调
          2. 如何先改状态再指定回调?
             - 在执行器中直接调用 `resolve()/reject()`
             - 延迟更长时间才调用 `then()`
          3. 什么时候才能得到数据?
             - 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
             - 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

          ```js
          // 正常情况，先指定回调再改变状态
          const p2 = new Promise((resolve, reject) => {
            // setTimeout 第三个参数，该参数将传入第一个函数参数
            setTimeout(resolve, 1000, '成功的数据') // 后改变数据，同时传入值
          }).then(
            // 先指定回调函数，保存当前回调函数
            value => {
              console.log(value)
            }
          )
          
          // 先改状态，在指定回调函数
          const p1 = new Promise((resolve, reject) => {
            resolve(100) // 先改变数据，同时传入值
          }).then(
            // 后指定回调函数，异步执行回调函数
            value => {
              console.log(value)
            }
          )
          ```

       4. Promise.then()返回的新promise的结果状态由什么决定

          - 简单表达：由 `then()` 指定的回调函数执行的结果决定
          - 详细表达：
            1. 如果抛出异常，新 promise 变为 `rejected`, reason为抛出的异常
            2. 如果返回的是非 promise 的任意值，新promise变为 `resolved`，value 为返回的值
            3. 如果返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果

       5. promise 如何串连多个操作任务?

          promise的 `then()` 返回一个新的 promise，可以看成 `then()` 的链式调用

          - 通过 `then` 的 **链式调用串连多个同步/异步任务**

          Tip

          `.then()` 中可以处理同步任务，也可以处理异步任务。处理异步任务时需要新创建一个 `Promise`。

          ```js
          // 任务1
          const p = new Promise((resolve, reject) => {
            setTimeout(resolve, 0, '任务1的数据(异步)')
          })
          
          p.then(
            value => {
              console.log(value)
              // 任务2（同步）
              return '任务2的数据(同步)'
            },
            reason => {
              console.log(reason)
            },
          ).then(
            value => {
              // 任务3（异步）
              return new Promise((resolve, reject) => {
                console.log(value)
                setTimeout(reject, 0, '任务3的错误信息(异步)')
              })
            },
            reason => {
              console.log(reason)
            }
          ).catch(reason => {
            console.log(reason)
          })
          // 输出
          // 任务1的数据(异步)
          // 任务2的数据(同步)
          // 任务3的错误信息(异步)
          ```

       6. 异常穿透

          在 Promise 的链式调用链中，当所有的 `.then` 中都没有指定错误处理的回调，则前面出现的异常会在最后失败的回调中处理。

          ```js
          new Promise((resolve, reject) => {
            reject(1)
          }).then(
            value => {
              console.log(value)
            }
          ).then(
            value => {
              console.log(value)
            }
          ).catch(reason => {
            console.log('异常：' + reason)
          })
          ```

          注意：

          - `.catch` 所谓的异常穿透并不是一次失败状态就触发 `catch`，而是一层一层的传递下来的
          - 异常穿透的前提条件是所有的 `.then` 都没有指定失败状态的回调函数。
          - 如果 `.catch` 前的所有 `.then` 都指定了失败状态的回调函数，`.catch` 就失去了意义。

       7. 值穿透

          值穿透指的是，链式调用的参数不是函数时，会发生值穿透，就传入的非函数值忽略，传入的是之前的函数参数。

          ```js
          Promise.resolve(1)
            .then(2)
            .then(Promise.resolve(3))
            .then(console.log) // 1
          ```

          只有传入的是函数才会传递给下一个链式调用。

          ```js
          Promise.resolve(1)
            .then(2)
            .then(() => 3)
            .then(4)
            .then(console.log) // 3
          Promise.resolve(1)
            .then(function () {
              return 2
            })
            .then(() => { Promise.resolve(3) }) // 没有返回值，默认 undefined
            .then(4)
            .then(console.log) // undefined
          ```

       8. 中断promise链

          - 什么是中断：当使用 promise 的 `then` 链式调用时，在中间中断，不再调用后面的回调函数
          - 中断的方法：在回调函数中返回一个 `pendding` 状态的 promise 对象

          如何返回一个 `pendding` 状态的 promise 对象：

          ```js
          return new Promise(() => { }) // pending
          ```

          或者使用 `Promise.race([])`，`race` 方法接收一个空的可迭代对象时，该 Promise 会一直处于 `pendding` 状态。

          ```js
          return Promise.race([]) // pending
          ```

          中断之前：

          ```js
          Promise.resolve(1)
            .then(value => {
              console.log(value) // 1
            }) // 下面都会打印
            .then(value => console.log(value)) // undefined
            .then(value => console.log(value)) // undefined
          ```

          中断之后：

          ```js
          Promise.resolve(1)
            .then(value => {
              console.log(value) // 1
              // 返回一个 pending 状态的 promise 来中断这个调用链
              return new Promise(() => { })
              // 或者：return Promise.race([])
            }) // 下面都不会打印
            .then(value => console.log(value))
            .then(value => console.log(value))
          ```

# Generator

## 声明

与函数声明类似，不同的是`function`关键字与函数名之间有一个星号，以及函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

## 调用

调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是`遍历器对象（Iterator Object）`。下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。



遍历器对象的`next`方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

**`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。**

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```



由于`yield`没有返回值，所以（yield（x+1））执行后的值是`undefined`，所以在第二次执行`a.next()`是其实是执行的`2*undefined`，所以值是`NaN`，所以下面b的例子中，第二次执行`b.next()`时传入了12，它会当成第一次`b.next()`的执行返回值，所以b的例子中能够正确计算。**这里不能把next执行结果中的value值与yield返回值搞混了，它两不是一个东西**



作者：前端南玖
链接：https://juejin.cn/post/7062155174436929550

## 例子

```js
function* fetch() {
	yield 'aaa';
	yield 'bbb';
	yield 'ccc';
}
let gen = fetch();
console.log(gen.next()); // { value: 'aaa', done: false }
console.log(gen.next()); // { value: 'bbb', done: false }
console.log(gen.next()); // { value: 'ccc', done: false }
console.log(gen.next()); //{ value: undefined, done: true } done为true表示执行结束

```



# 4.async/await

`Async/await`其实就是上面`Generator`的语法糖，`async`函数其实就相当于`funciton *`的作用，而`await`就相当与`yield`的作用。而在`async/await`机制中，自动包含了我们上述封装出来的`spawn`自动执行函数。



`async/await`被称为 JS 中**异步终极解决方案**。它既能够像 co + Generator 一样用同步的方式来书写异步代码，又得到底层的语法支持，无需借助任何第三方库。接下来，我们从原理的角度来重新审视这个语法糖背后究竟做了些什么。

### async

什么是 async ?

> MDN 的定义: async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。

注意重点: **返回结果为Promise**。

`async`函数对`Generator`函数的改进，体现在以下四点：

- 内置执行器：`async`函数执行与普通函数一样，不像`Generator`函数，需要调用`next`方法，或使用`co`模块才能真正执行
- 语意化更清晰：`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。
- 适用性更广：`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
- 返回值是Promise：`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。



举个例子:

```js
async function func() {
  return 100;
}
console.log(func());
// Promise {<resolved>: 100}

```

这就是隐式返回 Promise 的效果。

### await

我们来看看 `await`做了些什么事情。

以一段代码为例:

```js
async function test() {
  console.log(100)
  let x = await 200
  console.log(x)
  console.log(200)
}
console.log(0)
test()
console.log(300)
/*
0
100
300
200
200
*/
```

我们来分析一下这段程序。首先代码同步执行，打印出`0`，然后将`test`压入执行栈，打印出`100`, 下面注意了，遇到了关键角色**await**。

放个慢镜头:

```js
await 100;

```

被 JS 引擎转换成一个 Promise :

```js
let promise = new Promise((resolve,reject) => {
   resolve(100);
})

```

这里调用了 resolve，resolve的任务进入微任务队列。

然后，JS 引擎将暂停当前协程的运行，把线程的执行权交给`父协程`(父协程不懂是什么的，上上篇才讲，回去补课)。

回到父协程中，父协程的第一件事情就是对`await`返回的`Promise`调用`then`, 来监听这个 Promise 的状态改变 。

```js
promise.then(value => {
  // 相关逻辑，在resolve 执行之后来调用
})

```

然后往下执行，打印出`300`。

根据`EventLoop`机制，当前主线程的宏任务完成，现在检查`微任务队列`, 发现还有一个Promise的 resolve，执行，现在父协程在`then`中传入的回调执行。我们来看看这个回调具体做的是什么。

```js
promise.then(value => {
  // 1. 将线程的执行权交给test协程
  // 2. 把 value 值传递给 test 协程
})

```

Ok, 现在执行权到了`test协程`手上，test 接收到`父协程`传来的**200**, 赋值给 a ,然后依次执行后面的语句，打印`200`、`200`。

最后的输出为:

```js
0
100
300
200
200

```

总结一下，`async/await`利用`协程`和`Promise`实现了同步方式编写异步代码的效果，其中`Generator`是对`协程`的一种实现，虽然语法简单，但引擎在背后做了大量的工作，我们也对这些工作做了一一的拆解。用`async/await`写出的代码也更加优雅、美观，相比于之前的`Promise`不断调用then的方式，语义化更加明显，相比于`co + Generator`性能更高，上手成本也更低，不愧是JS异步终极解决方案！



# Promise题目

带有并发控制数量的promise

```js
const fn = url => {
    // 实际场景这里用axios等请求库 发请求即可 也不用设置延时
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('完成一个任务', url, new Date());
            resolve({ url, date: new Date() });
        }, 1000);
    })
};

function limitQueue(urls, limit) {
    // 完成任务数
    let i = 0;
    // 填充满执行队列
    for (let excuteCount = 0; excuteCount < limit; excuteCount++) {
        run();
    }
    // 执行一个任务
    function run() {
        // 构造待执行任务 当该任务完成后 如果还有待完成的任务 继续执行任务
        new Promise((resolve, reject) => {
            const url = urls[i];
            i++;
            resolve(fn(url))
        }).then(() => {
            if (i < urls.length) run()
        })
    }
};
const urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

(async _ => {
    await limitQueue(urls, 4);
})()

```

# 红绿灯

```js
function red() {
	console.log('red');
}
function green() {
	console.log('green');
}
function yellow() {
	console.log('yellow');
}
async function timer(color, delay) {
	return new Promise((resolve, reject) => {
		console.log(color);
		setTimeout(() => {
			resolve();
		}, delay);
	});
}
async function light() {
    
	await timer('green', 1000);
	await timer('yellow', 2000);
	await timer('red', 3000);
	await light();
}

light();

```



# 并发限制的promise

作者：洛霞同学
链接：https://juejin.cn/post/6854573217013563405



```js
class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCounts = 0;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;

    this.queue.shift()().then(() => {
      this.runCounts--;
      this.request();
    });
  }
}
   
const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})
  
const scheduler = new Scheduler();
  
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}
  
  
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
  
scheduler.taskStart()
```

预期输出：2 3 1 4

整个的完整执行流程：

1. 开始1、2两个任务开始执行
2. 500ms时，2任务执行完毕，输出2，任务3开始执行
3. 800ms时，3任务执行完毕，输出3，任务4开始执行
4. 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
5. 1200ms时，4任务执行完毕，输出4






若没有并发限制，如下

```js
const wait = (time, msg) => {
	setTimeout(() => {
		console.log(msg);
	}, time);
};
wait(1000, '1');
wait(500, '2');
wait(300, '3');
wait(400, '4');

```

输出结果 3 4 1 2



扩展：**Chrome最多允许对同一个Host建立六个TCP连接。不同的浏览器有一些区别。** 那么这就可以是一个应用场景



# 练习题



## 1.

```js
console.log('script start')
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})
console.log('script end')
```

流程

全局代码自上而下执行，先打印出`script start`，然后执行async1(),里面先遇到await async2(),执行async2,打印出`async2 end`，然后await后面的代码放入微任务队列，接着往下执行new Promise，打印出`Promise`,遇见了resolve，将第一个then方法放入微任务队列，接着往下执行打印出`script end`，全局代码执行完了，然后从微任务队列中取出第一个微任务执行，打印出`async1 end`,再取出第二个微任务执行，打印出`promise1`,然后这个then方法执行完了，当前Promise的状态为`fulfilled`,它也可以出发then的回调，所以第二个then这时候又被加进了微任务队列，然后再出微任务队列中取出这个微任务执行，打印出`promise2`,此时微任务队列为空，接着执行宏任务队列，打印出`setTimeout`。

**解题技巧：**

- await相当于Promise的then并且同一作用域下await下面的内容全部作为then中回调的内容
- 异步中先执行微任务，再执行宏任务

