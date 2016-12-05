var request = require('sync-request');
var contentType = require('content-type');
var ssiParser = require('./ssiParser.js');
var jsPlaceProcessor = require('./jsPlaceProcessor.js');
var assetUrlProcessor = require('./assetUrlProcessor.js');

/**
 * expressMethodOverwrite init方法
 * @param {Object} express对象
 * @param {Object} 配置参数
 */
module.exports.init = function(express, config) {
    var ssiServer = config.ssiServer;

    var matchTargetRegExp = /function(\s*?)((send)*)(\s*?)\(body\)(\s*?)\{/g;
    var assetUrlProcessMethod = 'assetUrlProcessor.process(config, body);';
    var ssiParseMethod = 'ssiParser.parse(config, body);';
    var jsPlaceProcessMethod = 'jsPlaceProcessor.process(config,body);';
    var replacedMethodContent = express.response.send.toString();

    //覆盖express中response的send方法，注入逻辑代码，生成新的send方法
    var newMethodContent = replacedMethodContent.replace(matchTargetRegExp, function(matchContent) {
        return matchContent +
            'if(typeof(body) === "string"){' +
            'body = ' + assetUrlProcessMethod +
            'body = ' + ssiParseMethod +
            'body = ' + jsPlaceProcessMethod +
            '}';
    });

    //动态执行新send方法
    eval('express.response.send = ' + newMethodContent);
};

/**
 * Set the charset in a given Content-Type string.
 * @param {String} type
 * @param {String} charset
 * @return {String}
 */
function setCharset(type, charset) {
    if (!type || !charset) {
        return type;
    }

    var parsed = contentType.parse(type);
    parsed.parameters.charset = charset;

    return contentType.format(parsed);
}
