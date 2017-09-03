var output = require('./output');
var tof = require('./trueORFalse');
var gitLayer = require('./gitLayer');

exports.main = function(args){
	 tof.isGitInitialized(function(boolVal){
	 	if(boolVal){
	 		output.success('gitworks has been initalized.')
	 	}
	 	else{
	 		output.error('git must be initalized before using gitworks.');
	 	}
	 });
}
