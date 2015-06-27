angular.module('options', [ 'chrome' ]);


angular.module('options').controller('OptionsCtrl', [ '$scope', 'chrome', '$timeout',  function( $scope, chrome, $timeout ){
    $scope.options = {};


    chrome.readConfig().then(function( config ){
        $scope.options.details = config;
    });

    $scope.save = function(){
        $scope.options.thinking = true;
        chrome.saveConfig($scope.options.details).then(function(){
            $timeout(function(){
                $scope.options.thinking = false;
            },1000);
        });
    };

    $scope.reset = function(){
        $scope.options.details = {};
    };

}]);
