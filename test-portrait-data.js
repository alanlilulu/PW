// 测试Portrait数据加载
const { portraitGroups } = require('./src/data/portraitGroups.ts');

console.log('静态Portrait组数量:', portraitGroups.length);
console.log('第一个组:', portraitGroups[0]);
console.log('所有组ID:', portraitGroups.map(g => g.id));
