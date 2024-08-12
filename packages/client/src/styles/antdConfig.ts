import { ThemeConfig, theme } from 'antd'

export const customTheme: ThemeConfig = {
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
