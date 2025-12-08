#!/usr/bin/env node
/**
 * 将 UMI 构建产物转换为 ES Module (.mjs) 格式
 * 用于 openFuyao 扩展组件的动态导入
 */

const fs = require('fs');
const path = require('path');

// 扩展组件配置
const pluginName = 'rainbond';
const distDir = path.resolve(__dirname, `../dist/${pluginName}`);


// 检查构建目录
if (!fs.existsSync(distDir)) {
  console.error(`❌ 构建目录不存在: dist/${pluginName}`);
  console.log('💡 请先运行: npm run build:extension');
  process.exit(1);
}

// 查找主入口文件
const files = fs.readdirSync(distDir);
const mainJs = files.find(f =>
  f === `${pluginName}.js` ||
  f === 'umi.js' ||
  (f.startsWith(pluginName) && f.endsWith('.js'))
);

if (!mainJs) {
  console.error('❌ 未找到主入口 JS 文件');
  console.log('   当前目录文件:', files.join(', '));
  process.exit(1);
}

const sourceFile = path.join(distDir, mainJs);
const targetFile = path.join(distDir, `${pluginName}.mjs`);

console.log(`📄 源文件: ${mainJs}`);
console.log(`📄 目标文件: ${pluginName}.mjs\n`);

// 读取源文件
let content = fs.readFileSync(sourceFile, 'utf-8');

// 创建 ES Module 包装器
// 使用 Function 构造器来避免严格模式问题
const wrapperCode = `/**
 * openFuyao Extension Component: ${pluginName}
 * Mount Point: #${pluginName}_root
 * Format: ES Module (wrapped UMD)
 * Generated: ${new Date().toISOString()}
 */

// 扩展组件配置
export const extensionConfig = {
  pluginName: '${pluginName}',
  mountId: '${pluginName}_root',
};

// 标记是否已初始化
let initialized = false;
let scriptElement = null;

/**
 * 渲染扩展组件
 * 通过动态注入 script 标签加载 UMD 代码
 */
export function render() {
  return new Promise((resolve, reject) => {
    const container = document.querySelector('#${pluginName}_root');
    if (!container) {
      const error = new Error('[${pluginName}] 挂载点 #${pluginName}_root 不存在');
      console.error(error.message);
      reject(error);
      return;
    }

    if (initialized) {
      console.log('[${pluginName}] 扩展组件已初始化');
      resolve();
      return;
    }

    // 动态创建 script 标签加载 UMD 代码
    scriptElement = document.createElement('script');
    scriptElement.id = '${pluginName}_script';

    // 获取当前模块的路径
    const currentScript = document.currentScript ||
      document.querySelector('script[src*="${pluginName}.mjs"]');
    let basePath = '';
    if (currentScript && currentScript.src) {
      basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
    } else {
      // 尝试从 import.meta.url 获取
      try {
        basePath = new URL('./', import.meta.url).href;
      } catch (e) {
        basePath = './';
      }
    }

    scriptElement.src = basePath + '${mainJs}';
    scriptElement.onload = () => {
      initialized = true;
      console.log('[${pluginName}] 扩展组件已加载');
      resolve();
    };
    scriptElement.onerror = (err) => {
      const error = new Error('[${pluginName}] 脚本加载失败');
      console.error(error.message, err);
      reject(error);
    };

    document.body.appendChild(scriptElement);
  });
}

/**
 * 卸载扩展组件
 */
export function unmount() {
  const container = document.querySelector('#${pluginName}_root');

  // 尝试使用 ReactDOM 卸载
  if (container && window.ReactDOM) {
    try {
      window.ReactDOM.unmountComponentAtNode(container);
      console.log('[${pluginName}] React 组件已卸载');
    } catch (e) {
      console.warn('[${pluginName}] React 卸载失败:', e.message);
    }
  }

  // 移除 script 标签
  if (scriptElement) {
    scriptElement.remove();
    scriptElement = null;
  }

  // 清理全局变量
  if (window.${pluginName}) {
    delete window.${pluginName};
  }

  initialized = false;
  console.log('[${pluginName}] 扩展组件已卸载');
}

/**
 * 获取扩展组件状态
 */
export function isInitialized() {
  return initialized;
}

// 默认导出
export default {
  extensionConfig,
  render,
  unmount,
  isInitialized,
};
`;

// 写入目标文件
fs.writeFileSync(targetFile, wrapperCode, 'utf-8');

const stats = fs.statSync(targetFile);


process.exit(0);
