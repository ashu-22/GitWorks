});
  };
  
 -exports.getCurrentUsername = function (callback){
 +exports.setUserConfigInfo = function(userinfo){
 +    exec('git config --global user.name \"'+userinfo.username+'\"', {cwd: process.cwd()}, function(error, stdout, stderr) {
 +            exec('git config --global user.email \"'+userinfo.email+'\"', {cwd: process.cwd()}, function(error, stdout, stderr) {});
 +    });
 +};
 +
 +exports.getCurrentUsername = function(callback){
      exports.getUserConfigInfo(function(userinfo){
          callback(userinfo.username);
      });
  };
 +
 +exports.getCurrentEmail = function(callback){
 +    exports.getUserConfigInfo(function(userinfo){
 +        callback(userinfo.email);
 +    });
 +};
