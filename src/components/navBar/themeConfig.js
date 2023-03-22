// 获取导航栏主题
export const getThemeConfig = (theme) => {
  const themeConfig = {
    white: {
      iconColor: '#ffffff',
      textColor: '#ffffff',
    },
    default: {
      iconColor: '#333333',
      textColor: '#333333',
    },
  }
  return themeConfig[theme]
}
