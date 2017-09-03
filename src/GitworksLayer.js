@@ -18,6 +18,7 @@ exports.addMember = function(userinfo, callback){
      exports.readGitWorksFile(function(gitWorksFile){
          gitWorksFile.members[utils.randomStringGenerator(5)] = userinfo;
          exports.writeGitWorksFile(gitWorksFile, function(){
 +            output.success(userinfo.username+"("+userinfo.email+") has been added as a member");
              callback();
          });
      });                    
 @@ -33,8 +34,8 @@ exports.addTask = function(task_data, callback){
  };
  
  exports.getCurrentMemberId = function(callback){
 -    gitLayer.getCurrentUsername(function(username){
 -        exports.getMemberIdByName(username, function(memberId){
 +    gitLayer.getCurrentEmail(function(email){
 +        exports.getMemberIdByEmail(email, function(memberId){
              callback(memberId);
          });
      });
 @@ -65,7 +66,7 @@ exports.getMemberIdByName = function(name, callback){
              callback(results[0]);
          }
          else{
 -            output.note("Could not find the exact member, did you mean any of the follow:");
 +            output.note("Could not find the exact member, did you mean any of the following:");
              for (var i = 0; i < results.length; i++) {
                  console.log(""+(i+1).toString()+": "+gitWorksFile.members[results[i]].username+"("+gitWorksFile.members[results[i]].email+")")
              }
 @@ -76,6 +77,30 @@ exports.getMemberIdByName = function(name, callback){
      }); 
  };
  
 +exports.getMemberIdByEmail = function(email, callback){
 +    if(email==''){
 +        callback(null);
 +        return;
 +    }
 +    var results = [];
 +    exports.readGitWorksFile(function(gitWorksFile){
 +        for (var user_id in gitWorksFile.members){
 +            if (gitWorksFile.members.hasOwnProperty(user_id)){
 +                if((gitWorksFile.members[user_id]['email'].toLowerCase()).indexOf(email.toLowerCase()) != -1){
 +                results.push(user_id);
 +                };
 +            }
 +        }
 +        if(results.length==1){
 +            callback(results[0]);
 +        }
 +        else{
 +            callback(null);
 +        }
 +    });
 +
 +};
 +
  exports.readGitWorksFile = function(callback){
      tof.isGitWorksInitialized(function(boolVal){
          if(boolVal){
 @@ -89,7 +114,7 @@ exports.readGitWorksFile = function(callback){
              });
          }
          else{
 -            error.warning('gitworks not initalized.');
 +            output.error('gitworks not initalized.');
          }    
      });
  };
 @@ -105,7 +130,7 @@ exports.writeGitWorksFile = function(gitWorksFile, callback){
              });
          }
          else{
 -            error.warning('gitworks not initalized.');
 +            output.error('gitworks not initalized.');
          }    
      });
  }
View
