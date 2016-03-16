module.exports = function($rootScope, $q, $log, $timeout, $cacheFactory) {
    
    var sessionCache = $cacheFactory('session', {
      storageMode: 'localStorage',
    });

    var sessionKey = 'session';

    function getSession() {
        return sessionCache.get(sessionKey);
    }

    function hasSession() {
        return !!getSession();
    }

    function setSession(session) {
        sessionCache.put(sessionKey, session);
    }

    function destroySession() {
        sessionCache.remove(sessionKey);
    }

    return {
      getSession: getSession,
      setSession: setSession,
      hasSession: hasSession,
      destroySession: destroySession
    };
    
  };
      