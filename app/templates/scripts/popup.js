angular.module('popup',[ 'chrome' ]);

angular.module('popup').controller('PopupCtrl', [ '$scope' , 'chrome', '$http' , function( $scope, chrome, $http ){

    function onData( request ) {

            $scope.page = request.data;
    }

    chrome.onMessage(function( request ){
        if (request.type === 'data') {
            onData( request );
        }
    });

    $http.get('dev/mockData.json').then(function( result ){
        onData(result);
    });

    chrome.sendMessage({ 'type' : 'data-please' });

}]);
