import { defineUserConfig, defaultTheme } from 'vuepress';

export default {
	base: '/RYBlog',
	theme: defaultTheme({
		// 侧边栏数组
		// 所有页面会使用相同的侧边栏
		sidebar: 'auto',
		navbar: [
			// NavbarItem
			{
				text: '首页',
				link: '/README.md',
			},
			{
				text: 'JS',
				children: [
					{
						text: 'JS面试题',
						link: '/JS/面试题.md',
					},
					{
						text: 'JS异步编程',
						link: '/JS/JS异步编程.md',
					},
				],
			},

			{
				text: 'CSS',
				link: '/CSS/CSS.md',
			},
			{
				text: 'Vue',
				link: '/Vue/VUE3.md',
			},
			{
				text: 'webpack',
				link: '/webpack/webpack.md',
			},
			{
				text: '架构&工程化',
				link: '/架构&工程化/架构.md',
			},
			{
				text: '设计模式',
				link: '/设计模式/设计模式.md',
			},
			{
				text: '算法',
				link: '/算法/算法.md',
			},

			{
				text: '计算机网络',
				link: '/计算机网络/计网.md',
			},
			{
				text: '计算机网络-浏览器',
				link: '/计算机网络/浏览器.md',
			},

			{
				text: '操作系统',
				link: '/操作系统/OS.md',
			},
		],
	}),
};
