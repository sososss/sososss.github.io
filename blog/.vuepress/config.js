module.exports = (options, context, api) => {
  return {
    title: '소소한 blog',
    description: 'Web Development, Fullstack Developer, JavaScript',
    theme: '@vuepress/blog',
    plugins: [
    ],
    themeConfig: {
      footer: {
        copyright: [
          {
            text: '© 2022 Sososs',
            link: ''
          }
        ]
      }
    }
  }
};
