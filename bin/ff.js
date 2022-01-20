#!/usr/bin/env node
const program = require('commander')
program.version(require('../package').version)
program
  .command('init <name>')
  .description('初始化项目')
  .action(require('../lib/init.js'))
  .usage('<name> 初始化项目') // -h 打印的用户提示
  .alias('i')// 命令别名

program.parse(process.argv)
