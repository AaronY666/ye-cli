const { getProjectPath, extendPackage } = require('./common');
const { blue, cyan, gray, red, yellow } = require('chalk');
const { existsSync, writeFileSync } = require('fs');
const clear = require("clear-console");
const { prompt } = require('inquirer')
const { exec, cd } = require('shelljs')
const promptConfig = require('../constant/prompt.config')


/**
 * 交互式命令行，让用户自己选择需要的功能
 * 
 */
async function selectFeature() {
    // 清空命令行
    clear();

    const { feature } = await prompt(promptConfig);

    return feature;
}

function initProjectDir(projectName) {
    // 判断文件是否已经存在
    const file = getProjectPath(projectName);
    // // 验证文件是否已经存在，存在则退出
    if (existsSync(file)) {
        console.log(red(`${file} 已经存在`));
        process.exit(1);
    }
    exec(`mkdir ${projectName}`);
    cd(projectName);
}

function installFeature(feature, projectName) {
    const featureJsonArr = feature.map(name => require(`../feature/${name}`))
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        dependencies: {},
        devDependencies: {},
    }
    featureJsonArr.forEach(item => {
        item(packageJson)
    })

    return packageJson;
}

function initPackage(package) {
    writeFileSync(process.cwd() + "/package.json", JSON.stringify(package, null, 4));
}

function installModule() {
    exec('npm i')
}

module.exports = {
    selectFeature,
    initProjectDir,
    installFeature,
    initPackage,
    installModule
}