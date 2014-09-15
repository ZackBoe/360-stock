exports.stock = function(api, next){

  api.stock = {};

  api.stock._start = function(api, next){
    // api.tasks.enqueue("google", "stock", function(err, toRun){
    //     if(err) api.log(err, "alert");
    //     api.log("queuing google");
    // });
    next();
  };

  api.stock._stop =  function(api, next){
    next();
  };

  next();
}
