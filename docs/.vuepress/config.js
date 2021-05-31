module.exports = {
  title: '个人博客',
  description: '博客',
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'github', link: 'https://github.com/yanqifeng' }
    ],
    sidebar: {
      '/JavaScript/': [
        '/JavaScript/',
        '/JavaScript/手动实现call、apply、bind'
      ]
    },
  }
}