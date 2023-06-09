[toc]



# 在Vue中使用router-link和传统a链接

在Vue中使用router-link和传统a链接的主要区别在于，router-link可以实现路由导航的无刷新加载，而传统a链接会进行页面的刷新。

具体来说，在使用router-link时，点击链接后Vue Router会通过JavaScript动态地更新视图，而不需要重新加载整个页面。这种无刷新加载可以提高用户体验，同时也可以减少服务端负载。此外，router-link还可以方便地设置路由参数、活动状态等属性。

相反，在使用传统的a链接时，每次点击链接都会重新加载整个页面。这样做不仅会影响用户体验，也会增加服务器负担。

因此，在开发Vue应用程序时，如果需要实现路由导航功能，则应该优先考虑使用router-link组件而非传统的a链接。

# 路由

## 后端

大致流程可以看成这样：

1. 浏览器发出请求
2. 服务器监听到80端口（或443）有请求过来，并解析url路径
3. 根据服务器的路由配置，返回相应信息（可以是 html 字串，也可以是 json 数据，图片等）
4. 浏览器根据数据包的 Content-Type 来决定如何解析数据

简单来说路由就是用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源，请求不同的页面是路由的其中一种功能。



## 前端

类似于服务端路由，前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。

```bash
http://www.xxx.com/#/login

```

这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发`hashchange` 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听`hashchange`来实现更新页面部分内容的操作：

```csharp
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}

window.addEventListener('hashchange', matchAndUpdate)

```

#### 2. history 模式

14年后，因为HTML5标准发布。多了两个 API，`pushState` 和 `replaceState`，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有`popstate` 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

```csharp
function matchAndUpdate () {
   // todo 匹配路径 做 dom 更新操作
}

window.addEventListener('popstate', matchAndUpdate)
```



当使用这种历史模式时，URL 会看起来很 "正常"，例如 `https://example.com/user/id`。漂亮!

不过，问题来了。由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 `https://example.com/user/id`，就会得到一个 404 错误。这就尴尬了。

不用担心：要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 `index.html` 相同的页面。漂亮依旧!



下面我们再来介绍下在实际的项目中，如何对这两者进行选择。**具体如下：**

- `to B` 的系统推荐用 `hash` ，相对简单且容易使用，且因为 `hash` 对 `url` 规范不敏感；
- `to C` 的系统，可以考虑选择 `H5 history` ，但是需**要服务端支持**；
- 能先用简单的，就别用复杂的，**要考虑成本和收益**。