exports.task = {
  name:          'moto',
  description:   'Refreshes Motorola online availablity',
  frequency:     60 * 1000,
  queue:         'stock',
  plugins:       [],
  pluginOptions: {},

  run: function(api, params, next){
    var request = require('request');

    request(api.config.keys.motorequest, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var cleaned = body.replace(api.config.keys.motoregex);
        data = JSON.parse(cleaned);

        if(data.variants[0].availability == 'NOT_AVAILABLE') api.cache.save('moto_black', false);
        else api.cache.save('moto_black', true);

        if(data.variants[1].availability == 'NOT_AVAILABLE') api.cache.save('moto_silver', false);
        else api.cache.save('moto_silver', true);


        next(true, null);
      }
      else { api.log(error); next(false, null); }
      })
  }
};
