/**
 * Created by zhujinyu on 2017/10/3.
 */
require.config({
    paths: {
        "zepto": "../lib/zepto",
    },
    shim:{
        'base':{
            exports:'base',
            deps:['zepto']
        }
    }
});
require(['base'], function (base){

});