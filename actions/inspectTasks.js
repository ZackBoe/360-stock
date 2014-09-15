var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = "inspectTasks";
action.description = "I show you what it going on";
action.inputs = {
    "required" : [],
    "optional" : []
};
action.outputExample = {}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){
    api.tasks.enqueue("refresh");
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
