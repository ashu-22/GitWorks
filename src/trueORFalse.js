@@ -2,6 +2,7 @@
  var fs = require('fs');
  
  var gitLayer = require('./gitLayer');
 +var gitWorksLayer = require('./gitWorksLayer');
  var output = require('./output');
  
  exports.isGitInstalled = function (callback){
 @@ -22,3 +23,30 @@ exports.isGitWorksInitialized = function(callback){
  		callback(fs.existsSync(val+'/.gitWorks'));
  	});
  }
 +
 +exports.isGitUserConfigInfoValid = function(callback){
 +    gitLayer.getUserConfigInfo(function(userinfo){
 +        if(userinfo.username=='' || userinfo.email=='')
 +            callback(false);
 +        else
 +            callback(true);
 +    });
 +}
 +
 +exports.isCurrentUserAMember = function(callback){
 +    gitWorksLayer.getCurrentMemberId(function(current_user_id){
 +        if(current_user_id)
 +            callback(true);
 +        else
 +            callback(false);
 +    });
 +}
 +
 +exports.isUserAMember = function(userinfo,callback){
 +    gitWorksLayer.getMemberIdByEmail(userinfo.email, function(user_id){
 +        if(user_id)
 +            callback(true);
 +        else
 +            callback(false);
 +    });
 +}
View
