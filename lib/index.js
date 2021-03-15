const cmd = require('commander')
const create = require('../lib/order/create')

// ts-cli -v、ts-cli --version
// 临时禁用规则，保证这里可以通过 require 方法获取 package.json 中的版本号
/* eslint-disable @typescript-eslint/no-var-requires */
cmd
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');

// ts-cli create newPro
cmd
    .command('create <app-name>')
    .description('Create new project from => ts-cli create yourProjectName')
    .action(async(name) => {
        // 创建命令具体做的事情都在这里，name 是你指定的 newPro
        await create(name);
        // console.log(name);
    });

cmd.parse(process.argv);