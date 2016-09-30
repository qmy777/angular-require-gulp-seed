define(['app'], function (app){
	app.controller('headerController', ['$scope','$translate', function ($scope, $translate){
		console.log('header');

		// $translate.instant('header.title').then(function (a){
		// 	console.log(a);
		// });
		
		// var test = $translate.instant('header.title');

	}]);
});