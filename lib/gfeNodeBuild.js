'use strict';
var config = require('./config.js');
var expressMethodOverride = require('./expressMethodOverride.js');
var templateMethodOverride = require('./templateMethodOverride.js');

/**
 * gfeNodeBuild初始化
 * @param  {Object} express对象
 * @param  {Object} tempalte对象
 * @param  {Object} 配置参数对象        
 */
module.exports.init = function(express, template, appContextPath, options) {
    if (options) {
        for (var key in options) {
            config[key] = options[key];
        }
    }

    expressMethodOverride.init(express, config);
    templateMethodOverride.init(template, config);
};
