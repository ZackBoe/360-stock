exports.task = {
  name:          'moto',
  description:   'Refreshes Motorola online availablity',
  frequency:     0,
  queue:         'stock',
  plugins:       [],
  pluginOptions: {},

  run: function(api, params, next){
    var request = require('request');

    request({url:process.env.motourl, qs:{cid: 'moto360-pdp-hero'}}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var cleaned = body.replace(process.env.motoregex);
        data = JSON.parse(cleaned);

        if(data.variants[0].availability == 'NOT_AVAILABLE') api.cache.save('moto_black', false);
        else api.cache.save('moto_black', true);

        if(data.variants[1].availability == 'NOT_AVAILABLE') api.cache.save('moto_silver', false);
        else api.cache.save('moto_silver', true);


        next(true, null);
      }
      else { api.log(error); api.log(response); api.log(body); next(false, null); }
      })
  }
};
