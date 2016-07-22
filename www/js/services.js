angular.module('starter.services', [])

  .factory('GeoLoc', ['$log', '$http', function($log, $http) {
    var methods;
    var bgGeo;

    var ajaxCallback = function(response) {
      $log.debug('ajaxCallback response', response);
      ////
      // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
      //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      //
      //
      bgGeo.finish();
    };

    var callbackFn = function(location) {
      $log.debug('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
      // Do your HTTP request here to POST location to your server.
      //
      //

      $http.post({
        method: 'POST',
        url: 'http://requestb.in/1dctw3y1',
        data: location
      }).then(function httpPostSuccess(res) {
          $log.debug('httpPostSuccess response', res);
        })
        .then(function httpPostError(err) {
          $log.debug('httpPostError response', err);
        });

      ajaxCallback.call(this);
    };

    var failureFn = function(error) {
      $log.error('BackgroundGeoLocation error');
    };

    methods = {
      'init': function init() {
        if(window.plugins.hasOwnProperty('backgroundGeoLocation')) {
          $log.debug('geoloc initializing');
          bgGeo = window.plugins.backgroundGeoLocation;
          $log.debug('geoloc initialized');
        } else {
          $log.debug('geoloc background plugin not found');
        }
      },
      'start': function start() {
        $log.debug('geolocation starting');
        bgGeo.start();
        $log.debug('geolocation started');
      },
      'stop': function stop() {
        $log.debug('geolocation stopping');
        bgGeo.stop();
        $log.debug('geolocation stopped');
      }
    };

    return methods;
  }])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
