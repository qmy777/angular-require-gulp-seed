require.config({
    baseUrl: './',
    paths: {
    	// some main framework files
        'rev-manifest': 'dist/js/rev-manifest',
    	'angular': 'public/angular/angular.min',
    	'angular-cookies': 'public/angular-cookies/angular-cookies.min',
    	'angular-require': 'public/angular-require/angular-require.min',
    	'angular-sanitize': 'public/angular-sanitize/angular-sanitize.min',
    	'angular-translate': 'public/angular-translate/angular-translate.min',
    	'angular-ui-router': 'public/angular-ui-router/release/angular-ui-router.min',

        'angular-ui-notification': 'public/angular-ui-notification/dist/angular-ui-notification',

        'css': 'public/require-css/css.min',

        // enter file
        'app': 'app',
        'header': 'views/header/header',
        'footer': 'views/footer/footer'
    },
    waitSeconds:0,
    shim: {
        'angular': {
            deps: ['rev-manifest'],
            exports: 'angular'
        },
        'angular-cookies': {
            deps: ['angular'],
            exports: 'angular-cookies'
        },
        'angular-require': {
            deps: ['angular'],
            exports: 'angular-require'
        },
        'angular-sanitize': {
            deps: ['angular'],
            exports: 'angular-sanitize'
        },
        'angular-translate': {
            deps: ['angular'],
            exports: 'angular-translate'
        },
        'angular-ui-router': {
            deps: ['angular'],
            exports: 'angular-ui-router'
        },
        'angular-ui-notification': {
            deps: ['angular', 'css!public/angular-ui-notification/dist/angular-ui-notification.min.css'],
            exports: 'angular-ui-notification'
        },
        'app': {
            deps: [
                'angular',
                'angular-ui-router','angular-cookies','angular-require','angular-translate','angular-sanitize', 'angular-ui-notification',
                'css!dist/css/all.css'
            ],
            exports: 'app'
        },
        'header': {
            deps: ['app'],
            exports: 'header'
        },
        'footer': {
            deps: ['app'],
            exports: 'footer'
        }
    }
});

// require错误处理,否则默认会去访问官网,国外很慢
require.onError = function(err){
    console.log('require error:',err,arguments);
};

function HashStaticFile(url) {

    
    if(url.indexOf('public') < 0 && url.indexOf('@') < 0) {
        console.log('%c'+url,'color:orange');
    }

    if (url.indexOf('http') < 0 && url.indexOf('public') < 0 && window.jsonForHash && window.jsonForHash[url]) {

        if (url.indexOf('?') == -1){
            url += '?version=' + window.jsonForHash[url];
        } else {
            url += '&version=' + window.jsonForHash[url];
        }
        console.log(url);
        return url;
    }
    return url;
}

// 重写nameToUrl方法,避免一些不用加小尾巴的文件加小尾巴了, 目前判断以http开头的都不加
require.s.contexts._.nameToUrl_old = require.s.contexts._.nameToUrl;
require.s.contexts._.nameToUrl = function(moduleName, ext, skipExt) {

    var url = require.s.contexts._.nameToUrl_old(moduleName, ext, skipExt);
    var config = require.s.contexts._.config;

    //为rev文件添加尾巴
    if(url.indexOf('rev-manifest.js')==-1){
        url = url.replace("?"+config.urlArgs,'');
        url = url.replace("&"+config.urlArgs,'');

    }else{
        if (url.indexOf('?')>-1){
            url += '&v=' + new Date().getTime();
        } else {
            url += '?v=' + new Date().getTime();
        }
    }
    //
    if (config.baseUrl) {
        url = url.substr(config.baseUrl.length);
    }

    // filter hash
    url = HashStaticFile(url);


    return url;
};



// require(['rev-manifest'],function (){
    
    require(['header','footer'],function(){
    //require(['app','controllers'],function(){

        console.log('angular.bootstrap');
        angular.bootstrap(document,['petkit']);

    });

// });