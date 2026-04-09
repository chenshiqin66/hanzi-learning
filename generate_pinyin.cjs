// 生成完整拼音库
const { pinyin: pinyinFn } = require('pinyin');
const fs = require('fs');

const hanziData = fs.readFileSync('./src/data/characters.js', 'utf8');

// 提取所有汉字 - 匹配 chars: "..." 格式
const charStrings = hanziData.match(/chars:\s*"([^"]+)"/g);

if (!charStrings) {
  console.error('No char strings found');
  process.exit(1);
}

const allChars = new Set();

charStrings.forEach(match => {
  // 提取 chars: " 之后的内容直到 "
  const content = match.replace(/chars:\s*"/, '').replace(/"$/, '');
  // 分裂成单个汉字
  const chars = content.split('');
  chars.forEach(char => {
    // 只保留汉字
    if (char.charCodeAt(0) >= 0x4E00 && char.charCodeAt(0) <= 0x9FFF) {
      allChars.add(char);
    }
  });
});

console.log('Found', allChars.size, 'unique Chinese characters');

// 生成拼音映射
const pinyinMap = {};
let failed = 0;

allChars.forEach(char => {
  // 使用 STYLE_TONE 风格，保留声调 (yī, èr, sān 等)
  const result = pinyinFn(char, { style: pinyinFn.STYLE_TONE });
  if (result && result[0] && result[0][0]) {
    pinyinMap[char] = result[0][0];
  } else {
    failed++;
  }
});

if (failed > 0) {
  console.log('Warning: Could not generate pinyin for', failed, 'characters');
}

// 输出为JS模块格式
let output = '// 完整拼音库 - 自动生成\n';
output += '// 共收录 ' + Object.keys(pinyinMap).length + ' 个汉字\n\n';
output += 'export const pinyinDict = ' + JSON.stringify(pinyinMap, null, 2) + ';\n\n';
output += '/**\n * 获取汉字拼音\n * @param {string} char - 单个汉字\n * @returns {string} 拼音\n */\n';
output += 'export function getPinyin(char) {\n';
output += '  return pinyinMap[char] || \'—\';\n';
output += '}\n';

fs.writeFileSync('./src/utils/pinyinDict.js', output, 'utf8');

console.log('拼音库已生成，共 ' + Object.keys(pinyinMap).length + ' 个汉字');
console.log('文件位置: src/utils/pinyinDict.js');
