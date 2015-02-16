(function(){

angular.module('ParseRecord', [])  

.factory('ParseRecord', function() {
  return {
    extend: function(name, fields, methods, queries) {
      
      if (name == 'User') {
        var object = Parse.User.extend(name, methods, queries);
      } else {
        var object = Parse.Object.extend(name, methods, queries);
      }

      for (var i = 0; i < fields.length; i++) {
        (function(field) {
          Object.defineProperty(object.prototype, field, {
            get: function() {
              return this.get(field);
            },
            set: function(value) {
              return this.set(field, value);
            }
          });
        })(fields[i]);
      }

      object.query = function() {
        return new Parse.Query(this);
      };

      object.all = function() {
        return this.query().find();
      };

      object.first = function() {
        return this.query().first();
      };

      return object;
    }
  };
});

})();
