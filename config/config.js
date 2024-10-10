import defaultSettings from '../src/defaultSettings';
import routerConfig from './router.config';

let publcPath = '/static/dists/';
if (process.env.SEPARATION === 'true') {
  publcPath = `/`;
}
const isHistory = process.env.ROUTE_MODE === 'history';

export default {
  history: isHistory ? 'browser' : 'hash',
  publicPath: publcPath,
  hash: !isHistory,
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
          // default 'zh-CN',
          // default: 'zh-CN',
          // default true, when it is true, will use `navigator.language` overwrite default
          baseNavigator: true,
          baseSeparator: '-',
        }
      }
    ]
  ],
  ignoreMomentLocale: true,
  theme: './config/theme.js',
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  disableDynamicImport: true,

  routes: routerConfig,
  proxy: {
    '/console': {
      target: 'http://47.237.128.122:7070/',
      changeOrigin: true
    },
    '/data': {
      target: 'http://47.237.128.122:7070/',
      changeOrigin: true
    },
    '/openapi/v1': {
      target: 'http://47.237.128.122:7070/',
      changeOrigin: true
    },
    '/enterprise-server':{
      target:'http://47.237.128.122:7070/',
      changeOrigin: true
    },
  }
};
