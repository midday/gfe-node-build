var fs = require('fs');
var path = require('path');

var assetUrlProcessor = require('./assetUrlProcessor.js');

/**
 * templateMethodOverwrite init方法
 * @param {Object} template对象
 * @param {Object} 配置参数
 */
module.exports.init = function(template, config) {
    var defaults = template.defaults;
    var matchTargetRegExp = /var(\s*)source(\s*)=(\s*)fs\.readFileSync(.*?);/g;
    var assetUrlProcessMethod = 'assetUrlProcessor.process(config, source, relativePath);';
    var replacedMethodContent = template.readTemplate.toString();

    //覆盖artTemplate中readTemplate方法，注入逻辑代码，生成新的readTemplate方法
    var newMethodContent = replacedMethodContent.replace(matchTargetRegExp, function(matchContent) {
        return matchContent +
            'var url = id;' +
            'url = url.replace(/\\\\/g,"/");' +
            'var staticFolderIndex = url.indexOf("/static/");' +
            'var htmlFolderIndex = url.indexOf("/html/");' +
            'var relativePath = url.substring(staticFolderIndex,htmlFolderIndex);' +
            'source = ' + assetUrlProcessMethod;
    });

    //动态执行新readTemplate方法
    eval('template.readTemplate = ' + newMethodContent);
};
