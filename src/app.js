define([
	'i18n/cn',
	'i18n/en'
	], function(cnTranslate, enTranslate){

		console.log('app');

		var app = angular.module('petkit', [
				'ngSanitize', 
				'pascalprecht.translate',
				'ui.router',
				'ngRequire',
				'ui-notification'
			])

			// .constant('cLanguageType', {
			// 	en: {
			// 		name: 'en',
			// 		value: enTranslate
			// 	},
			// 	cn: {
			// 		name: 'cn',
			// 		value: cnTranslate
			// 	}
			// })

			.config(['$translateProvider', function ($translateProvider) {
			  	// add translation tables
			  	var lang = window.navigator.language;

			  	$translateProvider.translations('cn', cnTranslate);
			  	$translateProvider.translations('en', enTranslate);
			  	if (lang.indexOf('zh') > -1) {
					$translateProvider.preferredLanguage('cn');
					$translateProvider.fallbackLanguage('cn');
					
			  	} else if (lang.indexOf('en') > -1) {
			  		$translateProvider.preferredLanguage('en');
					$translateProvider.fallbackLanguage('en');
					
			  	} else {
			  		$translateProvider.preferredLanguage('cn');
					$translateProvider.fallbackLanguage('cn');
					
			  	}
			  	
			}])

			.config(function ($stateProvider, $urlRouterProvider, $requireProvider){
				$urlRouterProvider.otherwise("/");
				$stateProvider
				//首页
				.state('index', {
					url: '/',
					cache:'false',
					templateUrl: 'views/index/index.html',
					controller: 'indexController',
					resolve:{
						deps:$requireProvider.requireJS(['views/index/index'])
					}
				})

				//notification插件demo链接
				.state('notification', {
					url: '/notification',
					cache:'false',
					templateUrl: 'views/notification/notification.html',
					controller: 'notificationController',
					resolve:{
						deps:$requireProvider.requireJS(['views/notification/notification'])
					}
				})
			});

		return app;

});