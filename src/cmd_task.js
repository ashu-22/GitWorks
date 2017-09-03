@@ -0,0 +1,104 @@
 +require('console.table');
 +var utils = require('./utils');
 +var output = require('./output');
 +var gitWorksLayer = require('./gitWorksLayer');
 +var gitLayer = require('./gitLayer');
 +
 +exports.main = function(args){
 +    var command = args.shift();
 +    if(command=='-n' || command=='--new'){
 +        if(args.length!=0){
 +            output.usage();
 +            return;
 +        }
 +        createNewTask();
 +    }
 +    else if(command=='-l' || command=='--list'){
 +        listAllTasks(); 
 +    }
 +    else{
 +        output.usage();
 +    }
 +}
 +
 +function createNewTask(){
 +    var  new_task_data = {};
 +    utils.askUser('Please enter the new task', function(answer){
 +        new_task_data.name = answer;
 +        utils.askUser('Enter the name of the member, whom you want to assign this to (leave blank to assign it yourself)', function(answer){
 +            if(answer==''){
 +                gitLayer.getCurrentUsername(function(username){
 +                    createNewTaskProcessUsername(username, new_task_data);
 +                });
 +            }
 +            else{
 +                createNewTaskProcessUsername(answer, new_task_data);
 +            }
 +        });
 +    });
 +};
 +
 +function createNewTaskProcessUsername(name, new_task_data){
 +    gitWorksLayer.getMemberIdByName(name, function(memberId){
 +        new_task_data.assignedto = memberId;
 +        createNewTaskProcessConfirmation(memberId, new_task_data);
 +    });
 +};
 +
 +function createNewTaskProcessConfirmation(memberId, new_task_data){
 +    gitWorksLayer.getMemberNameById(memberId, function(assignedtousername){
 +        gitLayer.getCurrentUsername(function(createdbyusername){
 +            gitWorksLayer.getMemberIdByName(createdbyusername, function(memberId){
 +                new_task_data.createdby = memberId;
 +            });
 +            new_task_data.createdat = utils.getDateTime();
 +            new_task_data.status = 'New';
 +            console.log();
 +            output.note('New Task Confirmation');
 +            console.log();
 +            console.table([
 +                            {
 +                                'Task': new_task_data.name,
 +                                'Create By': createdbyusername+'(You)',
 +                                'Assigned To': assignedtousername,
 +                                'Created At': utils.getDateTime()
 +                            }
 +            ]);
 +            utils.askUser('Are you sure you want to create this task? (y/n)', function(answer){
 +                if(answer=='y' || answer=='yes'){
 +                    gitWorksLayer.addTask(new_task_data, function(){
 +                        output.success('\''+new_task_data.name+'\''+' task has been created!');
 +                    });
 +                }
 +                else if(answer=='n' || answer=='no'){
 +                    output.note('new task has been discarded');
 +                }
 +                else{
 +                    output.error('invalid input - please enter yes or no');
 +                    createNewTaskProcessConfirmation(memberId, new_task_data);
 +                }
 +            });
 +        }); 
 +    });
 +};
 +
 +function listAllTasks(){
 +    gitWorksLayer.readGitWorksFile(function(gitWorksFile){
 +        result = [];
 +        count=1;
 +        for(var task_id in gitWorksFile.tasks){
 +            result.push({
 +                'Count': count,
 +                'Task': gitWorksFile.tasks[task_id].name,
 +                'Status': gitWorksFile.tasks[task_id].status,
 +                'Created By': gitWorksFile.members[gitWorksFile.tasks[task_id].createdby].username,
 +                'Assigned To': gitWorksFile.members[gitWorksFile.tasks[task_id].assignedto].username,
 +                'Created At': gitWorksFile.tasks[task_id].createdat,
 +                'Finished At': 'Not Yet',
 +            });
 +            count++;
 +        }
 +        console.log();
 +        console.table(result);       
 +    }); 
 +};
View
