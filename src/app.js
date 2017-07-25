define([
	'dist/i18n/cn.min',
	'dist/i18n/en.min'
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

				//form表单
				.state('form', {
					url: '/form',
					cache:'false',
					templateUrl: 'views/forms/forms.html',
					controller: 'formCtrl',
					resolve:{
						deps:$requireProvider.requireJS(['views/forms/forms'])
					}
				})
			})

			//register the interceptor as a service
			.factory('myHttpInterceptor', ['$q',function($q, dependency2) {
				return {
					// optional method
					'request': function(config) {
						//获取截获的接口链接
						if (config.url.indexOf('api/') >= 0) {
							//var token = $cookieStore.get("F-Session");
							//if (token) {
							//	token = token.replace('/^"$/','');
							//} else {
							//	token = '';
							//}
							//config.headers["F-Session"] = token;
							//config.cache = false;

							// do something on success
						}

						if(config.url.indexOf('.html')>-1){
							//获取截获的页面链接
							if(window.jsonForHash){
								var hashVal = window.jsonForHash[config.url];
								if(config.url.indexOf('?')==-1){
									config.url += '?version='+hashVal;
								}else{
									config.url += '&version='+hashVal;
								}
							}
						}

						return config;
					},

					// optional method
					'requestError': function(rejection) {
						// do something on error
						if (canRecover(rejection)) {
							return responseOrNewPromise
						}
						return $q.reject(rejection);
					},

					// optional method
					'response': function(response) {
						return response;
					},

					// optional method
					'responseError': function(rejection) {
						if (rejection.data) {
							console.log('responseError:',rejection.data,rejection);
						}
						return rejection;
					}
				};
			}]);


			app.config(['$httpProvider',function($httpProvider) {
				$httpProvider.interceptors.push('myHttpInterceptor');
			}]);

		return app;

});