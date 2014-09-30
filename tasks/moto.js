exports.task = {
  name:          'moto',
  description:   'Refreshes Motorola online availablity',
  frequency:     0,
  queue:         'stock',
  plugins:       [],
  pluginOptions: {},

  run: function(api, params, next){
    var request = require('request');

    request({url:api.config.secrets.moto.url, qs:{cid: 'moto360-pdp-hero'}}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var cleaned = body.replace(api.config.secrets.moto.regex);
        data = JSON.parse(cleaned);

        // api.log(data.variants[0].availability);
        if(data.variants[0].availability == 'IN_STOCK'){ api.cache.save('moto_stone', true); }
        else { api.cache.save('moto_stone', true); }

        // api.log(data.variants[1].availability);
        if(data.variants[1].availability == 'NOT_AVAILABLE'){ api.cache.save('moto_black', true); }
        else { api.cache.save('moto_black', false); }


        next(true, null);
      }
      else { api.log(error); api.log(response); api.log(body); next(false, null); }
      })
  }
};
