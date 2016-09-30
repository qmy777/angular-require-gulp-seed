define(['app'], function (app){
	app.controller('footerController', ['$scope','$translate', function ($scope, $translate){
		console.log('footer');

		$scope.language = $translate.instant('footer.languageSelected');
		// $scope.language = 'cn';

		$scope.changeLanguage = function (lang) {
			console.log(lang);
			$translate.use(lang);
		};

	}]);
});