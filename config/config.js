import moment from 'moment';
import defaultSettings from '../src/defaultSettings';
import routerConfig from './router.config';

const dayFormat = moment(new Date()).locale('zh-cn').format('YYYY-MM-DD');
let publcPath = '/';
if (process.env.ENABLE_CDN === 'true') {
  publcPath = `https://static.goodrain.com/rainbond-cloud/publish/${dayFormat}/`;
}

export default {
  history: 'hash',
  publicPath: publcPath,
  hash: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
          webpackChunkName: true,
          level: 3
        },
        locale: {
          // default false
          enable: false,
          // default zh-CN
          default: 'zh-CN',
          // default true, when it is true, will use `navigator.language` overwrite default
          baseNavigator: false
        }
      }
    ]
  ],
  ignoreMomentLocale: true,
  theme: {
    'card-actions-background': defaultSettings.primaryColor
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  disableDynamicImport: true,

  routes: routerConfig,
  proxy: {
    '/console': {
      target: 'http://7070.gr255017.2c9v614j.17f4cc.grapps.cn',
      changeOrigin: true
    }
  }
};
