/**
 * 处理脚本引用在页面的位置
 * @param {String} 页面内容
 * @param {Object} 配置参数对象
 * @return {String} 处理后的html内容
 */
module.exports.process = function(config, pageContent) {
    var jsPlace = config.jsPlace;
    var srcScriptRegExp = /(<script([^>]*)(src)([^>]*)>(((?!<\/script>)[\s\S])*)<\/script>)|(<\!--\[if\s)(((?!<\!\[endif\]-->)[\s\S])*)<script(((?!<\!\[endif\]-->)[\s\S])*)(<\!\[endif\]-->)/gi;
    var inbottomScriptRegExp = /<script([^>]*)(inbottom)([^>]*)>(((?!<\/script>)[\s\S])*)<\/script>/gi;
    var srcScripts = [];
    var inbottomScripts = [];

    pageContent = pageContent.replace(srcScriptRegExp, function(srcScript) {
        srcScripts.push(srcScript);
        return '';
    }).replace(inbottomScriptRegExp, function(inbottomScript) {
        inbottomScripts.push(inbottomScript);
        return '';
    });

    if (srcScripts.length > 0) {
        if (jsPlace === 'insertBody') {
            pageContent = pageContent.replace('<\/body>', srcScripts.join('\r\n') + '<\/body>');
        }
        if (jsPlace === 'insertHead') {
            pageContent = pageContent.replace('<\/head>', srcScripts.join('\r\n') + '<\/head>');
        }
    }
    if (inbottomScripts.length > 0) {
        pageContent = pageContent.replace('<\/body>', inbottomScripts.join('\r\n') + '<\/body>');
    }

    //添加gfe全局变量
    pageContent = pageContent.replace('<\/head>', '<script>var gfeJsCdn = "",gfeJsCdn = "",gfeProjectPath = "";</script>\r\n<\/head>');

    return pageContent;
};