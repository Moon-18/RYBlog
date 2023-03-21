[toc]

# 概念

`TypeScript` 是 `JavaScript` 的类型的超集，支持`ES6`语法，支持面向对象编程的概念，如类、接口、继承、泛型等

是一种静态类型检查的语言，提供了类型注解，在代码编译阶段就可以检查出数据类型的错误

同时扩展了`JavaScript` 的语法，所以任何现有的`JavaScript` 程序可以不加改变的在 `TypeScript` 下工作

为了保证兼容性，`TypeScript` 在编译阶段需要编译器编译成纯 `JavaScript` 来运行，是为大型应用之开发而设计的语言

# 类型

`typescript` 的数据类型主要有如下：

- boolean（布尔类型）

- number（数字类型）

- string（字符串类型）

- array（数组类型）

- tuple（元组类型）

  > 元祖类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
  >
  > ```tsx
  > let tupleArr:[number, string, boolean];
  > tupleArr = [12, '34', true]; //ok
  > typleArr = [12, '34'] // no ok
  > ```
  >
  > 赋值的类型、位置、个数需要和定义（生明）的类型、位置、个数一致

- enum（枚举类型）

  > `enum`类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字
  >
  > ```ts
  > enum Color {Red, Green, Blue}
  > let c: Color = Color.Green;
  > ```

- any（任意类型）

  > 可以指定任何类型的值，在编程阶段还不清楚类型的变量指定一个类型，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，这时候可以使用`any`类型

- null 和 undefined 类型

- void 类型。用于标识方法返回值的类型，表示该方法没有返回值

- never 类型

  > `never`是其他类型 （包括`null`和 `undefined`）的子类型，可以赋值给任何类型，代表从不会出现的值
  >
  > 但是没有类型是 never 的子类型，这意味着声明 `never` 的变量只能被 `never` 类型所赋值。
  >
  > `never` 类型一般用来指定那些总是会抛出异常、无限循环
  >
  > ```tsx
  > let a:never;
  > a = 123; // 错误的写法
  > 
  > a = (() => { // 正确的写法
  >   throw new Error('错误');
  > })()
  > 
  > // 返回never的函数必须存在无法达到的终点
  > function error(message: string): never {
  >     throw new Error(message);
  > }
  > ```

- object 对象类型

## 枚举类型



## ts中的any、undefined、never等有什么区别

在TypeScript中，any、undefined和never是三种不同的类型。

1 .  any类型：表示任意类型，可以赋值给任何其他类型。使用any类型会降低代码的类型安全性，应该尽量避免使用它。

2 .  undefined类型：表示变量未定义或者函数没有返回值。可以将undefined赋值给任何其他类型，但是不能将其他类型赋值给undefined。

3 .  never类型：表示永远不会有返回值的函数或者抛出异常的函数。也可以用于表示类型检查中不应该出现的值。例如，在一个switch语句中，如果所有分支都已经处理完毕，但是仍然需要一个default分支来满足编译器的要求，可以将default分支返回never类型。

总之，在TypeScript中，我们需要根据实际需求选择合适的数据类型，从而提高程序的可读性和可维护性。

# 接口

# 类

# 函数

# 泛型

# 高级类型

# 装饰器

# 命名空间与模块

# 