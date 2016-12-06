/**
 * ½âÎöbodyÄÚÈÝ£¬Îª¹«¹²×é¼þjs¡¢cssÌí¼ÓÓòÃû£¬ÎªË½ÓÐjs¡¢cssÌí¼ÓÏà¶ÔÂ·¾¶
 * @param  {Object} ÅäÖÃ²ÎÊý¶ÔÏó
 * @param  {Object} Ò³ÃæÄÚÈÝ
 * @return {String} ´¦ÀíºóµÄÒ³ÃæÄÚÈÝ
 */
module.exports.process = function(config, pageContent) {
    var jsServer = config.jsServer + '/';
    var cssServer = config.cssServer + '/';
    var publicAssetRefRegExp = /(<script([^>]*?)(src)\s*=\s*"gmlib([^>]*?)(>\s*<\s*\/script\s*>))|(<link([^>]*?)(href)\s*=\s*"gmlib([^>]*?)>)/gi;

    pageContent = pageContent.replace(publicAssetRefRegExp, function(publicAssetRef) {
        if (~publicAssetRef.indexOf("link")) {
            publicAssetRef = publicAssetRef.replace(/\s*href\s*=\s*"/, function(matchContent) {
                return matchContent + cssServer;
            });
        }
        if (~publicAssetRef.indexOf("script")) {
            publicAssetRef = publicAssetRef.replace(/\s*src\s*=\s*"/, function(matchContent) {
                return matchContent + jsServer;
            });
        }

        return publicAssetRef;
    });
   
    return pageContent;
};
