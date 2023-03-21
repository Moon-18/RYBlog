import { defineUserConfig, defaultTheme } from 'vuepress';

export default {
	theme: defaultTheme({
		// 侧边栏数组
		// 所有页面会使用相同的侧边栏
		sidebar:
			// [
			// 	// SidebarItem
			// 	{
			// 		text: '侧边栏',
			// 		link: '/侧边栏/vue.md',
			// 		children: [
			// 			// SidebarItem
			// 			{
			// 				text: 'github',
			// 				link: 'vue.md',
			// 				children: [],
			// 			},
			// 			// 字符串 - 页面文件路径
			// 			'/foo/bar.md',
			// 		],
			// 	},
			// 	// 字符串 - 页面文件路径
			// 	'/README.md',
			// ],
			'auto',
		navbar: [
			// NavbarItem
			{
				text: '侧边栏',
				link: '/侧边栏/vue.md',
			},
			// NavbarGroup
			{
				text: 'Group',
				children: ['/group/foo.md', '/group/bar.md'],
			},
			// 字符串 - 页面文件路径
			'/bar/README.md',
			{
				text: '首页',
				link: '/README.md',
			},
		],
	}),
};
