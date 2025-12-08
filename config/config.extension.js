/**
 * openFuyao 扩展组件构建配置
 * 基于 UMI 3.x + Webpack 实现
 *
 * 使用方式: cross-env UMI_ENV=extension umi build
 */
import defaultSettings from '../src/defaultSettings';
import routerConfig from './router.config';
import theme from './theme.js';
import path from 'path';

// 扩展组件配置
const extensionConfig = {
  menu: {
    pluginName: 'rainbond',
  },
};

const { pluginName } = extensionConfig.menu;

// openFuyao 扩展组件构建配置
export default {
  // 路由配置 - 使用 memory 类型避免路由冲突
  history: { type: 'memory' },

  // 输出路径配置
  publicPath: './',
  outputPath: `dist/${pluginName}`,

  // 禁用 hash，确保输出文件名固定
  hash: false,

  // ============================================
  // openFuyao 关键配置: 修改挂载点 ID
  // ============================================
  mountElementId: `${pluginName}_root`,

  // 基础配置
  antd: {},
  dva: {
    hmr: true
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    baseNavigator: true,
    baseSeparator: '-',
  },

  // 禁用动态导入，确保单文件输出
  dynamicImport: false,
  ignoreMomentLocale: true,
  theme,
  lessLoader: {
    javascriptEnabled: true
  },

  routes: routerConfig,

  // PostCSS 插件配置 - 样式隔离
  extraPostCSSPlugins: [
    require('postcss-prefix-selector')({
      prefix: `#${pluginName}_root`,
      transform(prefix, selector, prefixedSelector, filePath, rule) {
        // 跳过 body, html, :root 等全局选择器
        if (
          selector.startsWith('body') ||
          selector.startsWith('html') ||
          selector.startsWith(':root') ||
          selector.startsWith('*')
        ) {
          return selector;
        }
        // 跳过 keyframes 动画
        if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') {
          return selector;
        }
        return prefixedSelector;
      },
    }),
  ],

  // chainWebpack 配置 - 输出为 UMD 格式（webpack 4 兼容）
  chainWebpack(config, { webpack }) {
    // 配置输出为 UMD library 格式
    config.output
      .filename(`${pluginName}.js`)
      .chunkFilename(`${pluginName}.[name].js`)
      .library(pluginName)
      .libraryTarget('umd')
      .globalObject('this');

    // 添加 banner 注释
    config.plugin('banner').use(webpack.BannerPlugin, [{
      banner: `/**
 * openFuyao Extension Component: ${pluginName}
 * Mount Point: #${pluginName}_root
 * Format: UMD (可通过脚本转换为 ES Module)
 * Generated: ${new Date().toISOString()}
 */`,
      raw: true,
    }]);

    return config;
  },

  // 代理配置
  proxy: {
    '/console': {
      target: 'http://118.196.4.47:7070/',
      changeOrigin: true
    },
    '/data': {
      target: 'http://118.196.4.47:7070/',
      changeOrigin: true
    },
    '/openapi/v1': {
      target: 'http://118.196.4.47:7070/',
      changeOrigin: true
    },
    '/enterprise-server': {
      target: 'http://118.196.4.47:7070/',
      changeOrigin: true
    },
  }
};
