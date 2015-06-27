angular.module('background', ['chrome']);


angular.module('background').controller('BackgroundCtrl', [ '$scope', '$interval', 'chrome',  function ( $scope, $interval, chrome) {


    var i = 0;

    function getData() {
        chrome.sendMessage({ 'type': 'data','data': $scope.config.name + ' ' + i });
        chrome.setBadgeText({'text': i});
        i++;
    }

    chrome.onMessage(function (request/*, sender, sendResponse*/) {
        if (request.type === 'data-please') {
            getData();
        }
    });

    chrome.setDefaultConfig({ 'name' : 'hello world' });

    $interval(function () {
        chrome.readConfig().then(function(data){
            console.log('got data',data);
            $scope.config = data;
            getData();
        });

    },1000);
}]);
