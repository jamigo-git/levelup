import { ThemeConfig, theme } from 'antd'

export const darkTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: '#1890ff',
    colorInfo: '#1890ff',
    sizeStep: 4,
    borderRadius: 4,
    wireframe: false,
    colorTextBase: '#ececec',
    colorBgBase: '#004894',
    fontSize: 16,
    fontFamily: 'Golos Text',
  },
  algorithm: [theme.darkAlgorithm],
  components: {
    Table: {
      colorBgContainer: '#002448',
      bodySortBg: '#004a8a',
      rowHoverBg: '#0097c7',
    },
  },
}

export const lightTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    colorPrimary: '#fa8c16',
    colorInfo: '#fa8c16',
    sizeStep: 4,
    borderRadius: 4,
    wireframe: false,
    colorTextBase: '#fff',
    colorBgBase: '#231701',
    fontSize: 16,
    fontFamily: 'Golos Text',
  },
  algorithm: [theme.darkAlgorithm],
  components: {
    Table: {
      colorBgContainer: '#0003',
      bodySortBg: '#6767674b',
      rowHoverBg: '#6767674b',
    },
  },
}
