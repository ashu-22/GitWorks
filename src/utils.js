@@ -17,6 +17,17 @@ exports.askUser = function(question, callback){
      });
  }
  
 +exports.askUserRequired = function(question, callback){
 +    prompt.get([{
 +        name: 'question',
 +        description: question,
 +        required: true,
 +    }], function(err, results) {
 +        callback(results.question);
 +    });
 +}
 +
 +
  exports.getDateTime = function () {
      var date = new Date();
      var hour = date.getHours();
