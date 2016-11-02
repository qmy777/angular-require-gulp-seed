define([
    'app'
],function(app){
    app.controller("formCtrl",['$scope','$rootScope','$http',function($scope,$rootScope,$http) {

		$scope.submitOpts = {
			fullName: '',			// 姓名
			email: '',				// Email地址
			issue: '',				// 问题分类
			subject: '',			// 问题主题
			question: '',   		// 问题描述
			petkitAccount: '',		// 小佩昵称
			serialNumber: '',		// SN号
			deviceType: '',			// 设备型号
			OSVersion: '',			// 操作系统版本
			purchaseDate: '',		// 购买日期
			purchasePlace: '',		// 购买渠道
			country: ''  			// 所在地区
		};

        $scope.submitTheForm = function () {
            console.log($scope.supportForm);
        };


    	var submit = {
    		formOption:{}
    		,init:function(){
                console.log(123);
    			// submit.getCountrys();
                console.log($scope.supportForm);
    		}
    		,getCountrys:function(){
                $http({
                    url: '/data/country.json'
                }).success(function(data) {
                    var countryArray = data;
                    $scope.countrys = data;
                    $scope.$apply();
                });
    		}

    	};

    	submit.init();
    }]);

});