#!/usr/bin/env node
/**
 * openFuyao 扩展组件构建验证脚本
 * 检查构建产物是否符合 openFuyao 规范
 */

const fs = require('fs');
const path = require('path');

// 扩展组件配置
const pluginName = 'rainbond';
const distDir = path.resolve(__dirname, `../dist/${pluginName}`);

console.log('\n========================================');
console.log('  openFuyao 扩展组件构建验证');
console.log('========================================\n');

// 检查 extension.js 是否存在
console.log('1. 检查 extension.js 配置文件...');
const extensionPath = path.resolve(__dirname, '../src/extension.js');
if (!fs.existsSync(extensionPath)) {
  console.error('   ❌ src/extension.js 不存在');
  process.exit(1);
}
console.log('   ✅ src/extension.js 存在');
console.log(`   ✅ pluginName: ${pluginName}`);

// 检查构建目录
console.log('\n2. 检查构建输出目录...');
if (!fs.existsSync(distDir)) {
  console.error(`   ❌ 构建目录 dist/${pluginName} 不存在`);
  console.log('   💡 请先运行: npm run build:extension');
  process.exit(1);
}
console.log(`   ✅ 构建目录存在: dist/${pluginName}`);

// 检查 HTML 文件
console.log('\n3. 检查 HTML 文件...');
const htmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(htmlPath)) {
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const mountIdPattern = new RegExp(`id="${pluginName}_root"`);
  if (mountIdPattern.test(htmlContent)) {
    console.log(`   ✅ HTML 文件包含正确的挂载点: #${pluginName}_root`);
  } else {
    console.warn(`   ⚠️  HTML 文件未包含挂载点 #${pluginName}_root`);
  }
} else {
  console.log('   ℹ️  index.html 不存在（可能是 library 模式）');
}

// 检查 JS 文件
console.log('\n4. 检查 JavaScript 文件...');
const files = fs.readdirSync(distDir);
const jsFiles = files.filter(f => f.endsWith('.js'));
const mjsFiles = files.filter(f => f.endsWith('.mjs'));

if (mjsFiles.length > 0) {
  console.log(`   ✅ 找到 ${mjsFiles.length} 个 .mjs 文件:`);
  mjsFiles.forEach(f => {
    const stats = fs.statSync(path.join(distDir, f));
    console.log(`      - ${f} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
} else if (jsFiles.length > 0) {
  console.log(`   ✅ 找到 ${jsFiles.length} 个 .js 文件:`);
  jsFiles.forEach(f => {
    const stats = fs.statSync(path.join(distDir, f));
    console.log(`      - ${f} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
  console.log('   💡 提示: 运行 npm run build:extension:mjs 可转换为 .mjs 格式');
} else {
  console.error('   ❌ 未找到 JavaScript 文件');
  process.exit(1);
}

// 检查 CSS 文件
console.log('\n5. 检查 CSS 文件...');
const cssFiles = files.filter(f => f.endsWith('.css'));
if (cssFiles.length > 0) {
  console.log(`   ✅ 找到 ${cssFiles.length} 个 CSS 文件`);

  // 检查样式前缀
  const cssPath = path.join(distDir, cssFiles[0]);
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  const prefixPattern = new RegExp(`#${pluginName}_root`);
  if (prefixPattern.test(cssContent)) {
    console.log(`   ✅ CSS 文件包含样式前缀: #${pluginName}_root`);
  } else {
    console.warn(`   ⚠️  CSS 文件未包含样式前缀 #${pluginName}_root`);
    console.log('      请确保 postcss-prefix-selector 配置正确');
  }
} else {
  console.log('   ℹ️  未找到独立 CSS 文件（可能已内联到 JS 中）');
}

// 总结
console.log('\n========================================');
console.log('  验证完成');
console.log('========================================\n');

console.log('📦 构建产物位置:');
console.log(`   ${distDir}\n`);

console.log('🚀 部署说明:');
console.log(`   1. 将 dist/${pluginName}/ 目录部署到 openFuyao 服务器`);
console.log(`   2. 在 openFuyao 管理面配置扩展组件`);
console.log(`   3. 扩展组件将挂载到 #${pluginName}_root 节点\n`);

console.log('📝 openFuyao 引入方式 (ES Module):');
console.log(`   import('/${pluginName}/${pluginName}.mjs')\n`);

console.log('📝 openFuyao 引入方式 (UMD):');
console.log(`   <script src="/${pluginName}/umi.js"></script>\n`);

process.exit(0);
