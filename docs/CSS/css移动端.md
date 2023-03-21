1. 基础

   1. 主要针对webkit内核进行兼容
   2. 针对手机端开发
   3. 不同尺寸分辨率
   4. 浏览器模拟手机界面调试

2. 视口viewport

   浏览器显示页面内容的屏幕区域

   1. 布局视口

      ![image-20221217202735361](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221217202735361.png)

   2. 视觉视口

      ![image-20221217202824427](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221217202824427.png)

   3. 理想视口

      ![image-20221217202927971](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221217202927971.png)

   4. 总结

      ![image-20221217203008780](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221217203008780.png)

   5. meta视口标签

      ![image-20221220204028336](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221220204028336.png)
      
   6. 标准设置，如上图标签
   
3. 二倍图

   1. ![image-20221220204340363](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221220204340363.png)![image-20221220205014555](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221220205014555.png)

   2. 多倍图

      ![image-20221220205541644](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221220205541644.png)

      ![image-20221220205645799](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221220205645799.png)

   3. 背景图片缩放，background-size

      ![image-20221220210238007](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221220210238007.png)
      
   4. 多倍图的精灵图如何选到自己想要的元素？首先对原图固定比例，然后缩放，然后进行测量，注意代码里也变background-size
   
      ![image-20221222161552448](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222161552448.png)
   
4. 移动端开发选择

   1. 单独制作

      网站域名前加上m(mobile)，判断打开设备，如果是移动端，则跳转到移动端界面

   2. 响应式

      ![image-20221221102824324](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221221102824324.png)

   3. 主流是单独制作

5. 移动端技术解决方案

   1. 浏览器

      ![image-20221221102946781](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221221102946781.png)

   2. 初始化normalize.css

   3. 盒模型

      ![image-20221221103823904](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221221103823904.png)

   4. 特殊样式

      ![image-20221221103915208](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221221103915208.png)

   5. 常见布局

      ![image-20221221104408901](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221221104408901.png)

   6. 单独制作

      1. 流式布局，百分比布局。宽度设置为百分比，使得能够随着屏幕拉伸；为了防止内容被破坏，设置最大最小宽高

         ![image-20221221104850295](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221221104850295.png)

         如下面五个元素各占20%

         ![image-20221221174717835](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221221174717835.png)

         案例，京东首页

      1. flex布局
      
         特点
      
         ![image-20221222165539742](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222165539742.png)
      
         ![image-20221222165607483](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222165607483.png)
      
         1. 原理
      
            ![image-20221222170416187](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222170416187.png)
         
            ![image-20221222170537945](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222170537945.png)
         
            
         
         2. 父项常见属性
         
            ![image-20221222170824924](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222170824924.png)
         
            - flex-direction设置主轴方向。在flex布局中，分为主轴，侧轴两个方向（行和列，x和y）默认主轴方向是x轴方向，水平向右，侧轴方向y轴方向，水平向下。
         
              我们的元素是跟着主轴来排列的
         
              ![image-20221222171413889](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222171413889.png)
         
            - justify-content设置**主轴**上的子元素排列方式  
         
              ![image-20221222172015496](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221222172015496.png)
              
            - flex-wrap子元素是否换行。默认子元素不换行，如果一行元素过多，那会缩小子元素宽度；
         
              ![image-20221223083055525](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223083055525.png)
         
            - align-item设置侧轴上的子元素排列方式（单行），拉伸需要子盒子没给定高度
         
              ![image-20221223115950972](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223115950972.png)
              
            - align-content设置侧轴上的子元素的排列方式（多行）
         
              ![image-20221223152052269](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223152052269.png)
         
            - flex-flow，是flex-direction和flex-wrap属性的复合属性
         
              flex-flow:row-wrap
         
            - 总结
         
              ![image-20221223152842699](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223152842699.png)
         
         3. 子项常见属性
         
            1. flex，定义子项目分配**剩余空间**，用flex表示占多少**份数**
         
               ![image-20221223153053060](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223153053060.png)
         
            2. align-self控制子项自己在侧轴的排列方式；比如说其余盒子在下面，某一个盒子在顶部
         
               ![image-20221223154218275](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223154218275.png)
         
               ![image-20221223154200587](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223154200587.png)
         
            3. order定义项目的排列顺序，小的靠前。默认是0
            
         4. 常见布局思路
         
            如何实现下图效果
         
            ![image-20221223172923042](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221223172923042.png)
         
      1. rem布局
      
         ![image-20221224150405209](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224150405209.png)
      
         媒体查询
      
         ![image-20221224151100431](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224151100431.png)
         
         ![image-20221224151024400](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224151024400.png)
         
         媒体类型有all,print,screen
         
         媒体特性有width，max-width，min-width
         
         引入资源，通过对当前媒体的判断来确定引入哪一个资源；一个建议是，媒体查询最好的方式是从小到大，这样根据层叠性，后面把前面的覆盖掉
         
         ![image-20221224172828583](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224172828583.png)
         
         **less基础**
         
         维护css的弊端
         
         ![image-20221224173446817](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224173446817.png)
         
         ![image-20221224173541151](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224173541151.png)
         
         1.变量，语法，
         
         定义，@变量名：值；
         
         使用，某一个属性值：@变量名；
         
         ![image-20221224182102466](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224182102466.png)
         
         2.编译，使用插件生成css文件
         
         3.嵌套
         
         父子关系的标签，嵌套
         
         ![image-20221224182734728](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224182734728.png)
         
         4.运算
         
         ![image-20221224182930222](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224182930222.png)
         
         ![image-20221224183124525](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224183124525.png)
         
         **rem适配方案**
         
         ![image-20221224183359827](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224183359827.png)
         
         ![image-20221224183438256](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224183438256.png)
         
         ![image-20221224183534947](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224183534947.png)
         
         ![image-20221224183932954](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224183932954.png)
         
         案例：苏宁首页
         
         首先建common.less，里面确定根元素大小
         
         然后
         
         ![image-20221224184636994](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20221224184636994.png)
         
         
         
      1. 
      
         ![image-20230125162302002](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20230125162302002.png)![image-20230125162349081](C:\Users\高明岩\AppData\Roaming\Typora\typora-user-images\image-20230125162349081.png)
      
         
      
         