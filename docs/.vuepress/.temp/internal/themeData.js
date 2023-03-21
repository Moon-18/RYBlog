export const themeData = JSON.parse("{\"sidebar\":\"auto\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/README.md\"},{\"text\":\"JS\",\"children\":[{\"text\":\"JS面试题\",\"link\":\"/JS/面试题.md\"},{\"text\":\"JS异步编程\",\"link\":\"/JS/JS异步编程.md\"}]},{\"text\":\"CSS\",\"link\":\"/CSS/CSS.md\"},{\"text\":\"Vue\",\"link\":\"/Vue/VUE3.md\"},{\"text\":\"webpack\",\"link\":\"/webpack/webpack.md\"},{\"text\":\"架构&工程化\",\"link\":\"/架构&工程化/架构.md\"},{\"text\":\"设计模式\",\"link\":\"/设计模式/设计模式.md\"},{\"text\":\"算法\",\"link\":\"/算法/算法.md\"},{\"text\":\"计算机网络\",\"link\":\"/计算机网络/计网.md\"},{\"text\":\"计算机网络-浏览器\",\"link\":\"/计算机网络/浏览器.md\"},{\"text\":\"操作系统\",\"link\":\"/操作系统/OS.md\"}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
