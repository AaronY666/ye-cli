/**
 * create 命令的具体任务
 */
const { initProjectDir, selectFeature, installFeature, initPackage, installModule } = require("../utils/create");

// create 命令
module.exports = async function create(projectName) {
    // 初始化项目目录
    initProjectDir(projectName);

    // 选择需要的功能
    const feature = await selectFeature();

    //安装对应的功能
    const package = installFeature(feature, projectName);


    // 写入package
    initPackage(package);

    //进入目录并安装modules
    installModule();
}