var request = require('sync-request');

/**
 * 将html中的ssi语法解析为相应内容
 * @param {String} 页面内容
 * @param {Object} 配置参数对象
 * @return {String} 处理后的html内容
 */
module.exports.parse = function(config, pageContent) {
    var ssiServer = config.ssiServer;
    var ssiTagRegExp = /<!--[ ]*#([a-z]+)([ ]+([a-z]+)=("|')(.+?)("|'))*[ ]*-->/g;

    return pageContent.replace(ssiTagRegExp, function(ssiTag) {
        var path = ssiTag.match(/("|')(.+?)("|')/gi)[0].replace(/"|'/g, '');
        var ssiResponse;
        try {
            ssiResponse = request('GET', ssiServer + path).getBody().toString();
        } catch (e) {
            console.log("错误:有一个ssi请求失败，可通过如下两步进行排查：");
            console.log("  (1)检查ssi标签有无语法错误：" + ssiTag);
            console.log("  (2)检查ssi请求能否正常访问：" + ssiServer + path);
            ssiResponse = ssiTag;
        }

        return ssiResponse;
    });
};
