'use strict';

module.exports = function($q /* inject any needed providers or factories here */) {
    
    var service = this;
    
    service.getData = function() {
        var defer = $q.defer();
        
        return defer.promise;
    };
};