exports.task = {
  name:          'refresh',
  description:   "Refresh stock and websocket clients",
  frequency:     30 * 1000,
  queue:         'default',
  plugins:       [],
  pluginOptions: {},

  run: function(api, params, next){
    api.chatRoom.broadcast({room: 'stock'}, 'stock', 'refresh');
    api.tasks.enqueue('google', 'stock', function(err, toRun){  });
    api.tasks.enqueue('moto', 'stock', function(err, toRun){  });
    api.tasks.enqueue('bby', 'stock', function(err, toRun){  });
    next(true, null);
  }
};


//TODO: proper error handling re:google ENOTFOUND (shitty network?)
//TODO: desktop notifications?
//TODO: cleanup and commit ffs
