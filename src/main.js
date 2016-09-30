require.config({
    baseUrl: './',
    paths: {
    	// some main framework files
    	'angular': 'public/angular/angular.min',
    	'angular-cookies': 'public/angular-cookies/angular-cookies.min',
    	'angular-require': 'public/angular-require/angular-require.min',
    	'angular-sanitize': 'public/angular-sanitize/angular-sanitize.min',
    	'angular-translate': 'public/angular-translate/angular-translate.min',
    	'angular-ui-router': 'public/angular-ui-router/release/angular-ui-router.min',
        'css': 'public/require-css/css.min',

        // enter file
        'app': 'app',
        'header': 'views/header/header',
        'footer': 'views/footer/footer'
    },
    waitSeconds:0,
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-cookies': ['angular'],
        'angular-require': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-translate': ['angular'],
        'angular-ui-router': ['angular']
    }
});

// require错误处理,否则默认会去访问官网,国外很慢
require.onError = function(err){
    console.log('require error:',err,arguments);
};

require(['angular','angular-ui-router','angular-cookies','angular-require','angular-translate','angular-sanitize'],function (angular){
    
    require(['app','header','footer'],function(){
    //require(['app','controllers'],function(){

        console.log('angular.bootstrap');
        angular.bootstrap(document,['petkit']);

    });

});