'use strict';
 
 var controller = function($state /* LoginService */) {
    
    var vm = this;
    
    console.log('loaded controller');
    
    this.login = function() {
        // send login request to server and navigate to token manager  
        //this.username == the user input name

        //var loginInformation = {username:'yokiblak', password:'baddassprogrammer'};
        //LoginService.login(loginInformation);

    };
    
    this.register = function() {
        $state.go('register');    
    };
};

module.exports = controller;