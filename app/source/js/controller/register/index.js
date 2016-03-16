'use strict';
 
 var controller = function($scope,  $location, $anchorScroll, $state /* RegisterService */) {

    console.log('loaded controller');
    
    $scope.gotoFeatures = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('features');

      // call $anchorScroll()
      $anchorScroll();
    };    
    
    $scope.gotoPrices = function() {
        $location.hash('prices');
        
        $anchorScroll();
    };
    
    $scope.gotoLogin = function() {
        $state.go('login');    
        
    };
    
    $scope.register = function() {
        console.log('register here!');
    };
};

module.exports = controller;