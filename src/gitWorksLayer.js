@@ -7,7 +7,7 @@ var utils = require('./utils');
  
  exports.createGitWorksFile = function(callback){
  	gitLayer.getProjectRootDirectory(function(path){
 -		fs.writeFile(path+'/.gitWorks', '{"members":[], "tasks":[]}', function(err) {
 +		fs.writeFile(path+'/.gitWorks', '{"members":{}, "tasks":{}}', function(err) {
      		if(err) throw err;
              callback();
  	    }); 
 @@ -16,8 +16,7 @@ exports.createGitWorksFile = function(callback){
  
  exports.addMember = function(userinfo, callback){
      exports.readGitWorksFile(function(gitWorksFile){
 -        userinfo.id = utils.randomStringGenerator(5);
 -        gitWorksFile.members.push(userinfo);
 +        gitWorksFile.members[utils.randomStringGenerator(5)] = userinfo;
          exports.writeGitWorksFile(gitWorksFile, function(){
              callback();
          });
 @@ -26,7 +25,7 @@ exports.addMember = function(userinfo, callback){
  
  exports.addTask = function(task_data, callback){
      exports.readGitWorksFile(function(gitWorksFile){
 -        gitWorksFile.tasks.push(task_data);
 +        gitWorksFile.tasks[utils.randomStringGenerator(5)] = task_data;
          exports.writeGitWorksFile(gitWorksFile, function(){
              callback();
          });
 @@ -41,40 +40,37 @@ exports.getCurrentMemberId = function(callback){
      });
  };
  
 -exports.getMemberNameById = function(id, callback){
 +exports.getMemberNameById = function(user_id, callback){
      exports.readGitWorksFile(function(gitWorksFile){
 -        for (var i = 0; i < gitWorksFile.members.length; i++) {
 -            if(gitWorksFile.members[i].id == id){
 -                callback(gitWorksFile.members[i].username);
 -                break;
 -            };
 -        }
 +        callback(gitWorksFile.members[user_id]['username']);
      }); 
  };
  
  exports.getMemberIdByName = function(name, callback){
      var results = [];
      exports.readGitWorksFile(function(gitWorksFile){
 -        for (var i = 0; i < gitWorksFile.members.length; i++) {
 -            if((gitWorksFile.members[i].username.toLowerCase()).indexOf(name.toLowerCase()) != -1){
 -                results.push(gitWorksFile.members[i]);
 -            };
 +        for (var user_id in gitWorksFile.members){
 +            if (gitWorksFile.members.hasOwnProperty(user_id)){
 +                if((gitWorksFile.members[user_id]['username'].toLowerCase()).indexOf(name.toLowerCase()) != -1){
 +                results.push(user_id);
 +                };
 +            }
          }
          if(results.length==0){
              utils.askUser('[ERROR] Member not found, please type another name',function(answer){
                  exports.getMemberIdByName(answer, callback);
              });
          }
          else if(results.length==1){
 -            callback(results[0].id);
 +            callback(results[0]);
          }
          else{
              output.note("Could not find the exact member, did you mean any of the follow:");
              for (var i = 0; i < results.length; i++) {
 -                console.log(""+(i+1).toString()+": "+results[i].username+"("+results[i].email+")")
 +                console.log(""+(i+1).toString()+": "+gitWorksFile.members[results[i]].username+"("+gitWorksFile.members[results[i]].email+")")
              }
              utils.askUser('Please type the corresponding number of the member you meant',function(answer){
 -                callback(results[parseInt(answer)].id);
 +                callback(results[parseInt(answer)-1]);
              });
          }
      }); 
