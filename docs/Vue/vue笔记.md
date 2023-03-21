箭头函数

语法

```js
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
//相当于：(param1, param2, …, paramN) =>{ return expression; }

// 当只有一个参数时，圆括号是可选的：
(singleParam) => { statements }
singleParam => { statements }

// 没有参数的函数应该写成一对圆括号。
() => { statements }
```

例子

https://blog.csdn.net/ndkhbwh/article/details/103855858

js 异步编程 https://www.runoob.com/js/js-async.html

promise https://www.runoob.com/js/js-promise.html

## VUEX

State

单一状态树

Getter获得属性

Mutation改变状态,同步事务.你不能直接调用一个 mutation 处理函数。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”要唤醒一个 mutation 处理函数，你需要以相应的 type 调用 **store.commit** 方法;

提交载荷,也就是参数

Action异步,且提交的是mutation

模块module,多个对象时,进行划分,避免臃肿

## element-Plus

#### 表单

数据绑定?

自定义校验规则?

![image-20221104214446978](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221104214446978.png)

![image-20221104214456824](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221104214456824.png)