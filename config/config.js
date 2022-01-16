import moment from 'moment';
import defaultSettings from '../src/defaultSettings';
import routerConfig from './router.config';

const dayFormat = moment(new Date())
  .locale('zh-cn')
  .format('YYYY-MM-DD');

let publcPath = '/';
if (process.env.ALLINONE === 'true') {
  publcPath = `/static/dists/`;
}
if (process.env.ENABLE_CDN === 'true') {
  publcPath = `https://static.goodrain.com/rainbond-cloud/publish/${dayFormat}/`;
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
    'card-actions-background': defaultSettings.primaryColor,
    'primary-color': defaultSettings.primaryColor
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  disableDynamicImport: true,

  routes: routerConfig,
  proxy: {
    '/console': {
      // target: 'http://127.0.0.1:8000',
      target: 'https://goodrain.goodrain.com',
      changeOrigin: true
    },
    '/data': {
      target: 'https://goodrain.goodrain.com',
      changeOrigin: true
    }
  }
};
