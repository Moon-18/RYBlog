<template><div><h1 id="前端个人笔记文档站" tabindex="-1"><a class="header-anchor" href="#前端个人笔记文档站" aria-hidden="true">#</a> 前端个人笔记文档站</h1>
<h2 id="如何浏览" tabindex="-1"><a class="header-anchor" href="#如何浏览" aria-hidden="true">#</a> 如何浏览？</h2>
<p>在线网站 https://moon-18.github.io/RYBlog</p>
<p>内容 https://github.com/Moon-18/RYBlog</p>
<p>顶部是分类好的各项主题，侧边栏是该项主题的目录部分（自动生成）</p>
<h2 id="内容" tabindex="-1"><a class="header-anchor" href="#内容" aria-hidden="true">#</a> 内容</h2>
<p>参考了很多文章，也参考了chatgpt，也有自己的思考，我一直认为内容才是关键的地方，需要尽可能做好内容</p>
<p>希望能够分享知识，欢迎补充内容，提供pr；(终极理想是建立一个完善的前端信息并联网站，共同进步)</p>
<p>闲暇时间更新，更新流程</p>
<ul>
<li>随手记录内容</li>
<li>攒到一定程度后提交内容</li>
<li>运行脚本更新网站 双击publish.sh</li>
</ul>
<h2 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型" aria-hidden="true">#</a> 技术选型</h2>
<p>对于我来说，文档站需要满足以下要求</p>
<ol>
<li>侧边栏和顶部，一目了然；顶部用于展示不同目录的文件，侧边栏用于展示当前阅读的文件的目录</li>
<li>支持暗夜模式</li>
<li>自动更新部署</li>
</ol>
<p>vuepress满足需求，自己花费5h上手+调试+构建</p>
<h2 id="建站踩坑" tabindex="-1"><a class="header-anchor" href="#建站踩坑" aria-hidden="true">#</a> 建站踩坑</h2>
<p>设置项config.js，设置里面的数组即可，自己主要关注侧边栏和顶部导航栏</p>
<p>vuepress默认编码很多utf16 一开始node_modules由于.gitignore是utf16，导致没有忽略成功</p>
<p>自动化部署</p>
<ul>
<li>使用脚本，就是构建之后推到云端，使用GitHub pages服务；</li>
<li>注意构建好的地址</li>
<li>双击 ./publish.sh提交</li>
</ul>
<h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的" aria-hidden="true">#</a> 目的</h2>
<p>一方面为了自己巩固知识，另一方面发展开源精神，最后希望能够找到一份温饱的工作</p>
</div></template>


