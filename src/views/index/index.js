define(['app'], function (app){
	app.controller('indexController', ['$scope','$translate', 'Notification', '$location', function ($scope, $translate, $notify, $location){
		console.log('index');

		$scope.showNotification = function (){
			// $notify.primary('Primary notification');
			// or simply..
			// $notify('Primary notification');

			// Other Options
			// Success
			// $notify.success('Success notification');

			// Message with custom type
			// $notify({message: 'Warning notification'}, 'warning');

			// With Title
			// $notify({message: 'Primary notification', title: 'Primary notification'});

			// Message with custom delay
			// $notify.error({message: 'Error notification 1s', delay: 1000});

			// Embed HTML within your message.....
			// $notify.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: 'Html content'});

			// Change position notification
			// $notify.error({message: 'Error Bottom Right', positionY: 'bottom', positionX: 'right'});

			// Replace message
			$notify.error({message: 'Error notification 1s', replaceMessage: true, onClose:function (a){
				console.log($location.url());
			}});
		}

	}]);
});