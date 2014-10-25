exports.task = {
    name:          'google',
    description:   'Refreshes Google Play stock status',
    frequency:     0,
    queue:         'stock',
    plugins:       [],
    pluginOptions: {},

    run: function(api, params, next){
        var request = require('request');

        request({url:'https://www.kimonolabs.com/api/6uag53ws', qs:{apikey:api.config.secrets.kimono}}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body);
                if(data.results[360][0].price['class'].indexOf('disabled') > -1){
                    api.cache.save('google_black', false);
                }
                else api.cache.save('google_black', true);
            }
            else { api.log('err'+error); api.log('res'+response); api.log('body'+body);  }
        })

      request({url:'https://www.kimonolabs.com/api/467e2i2c', qs:{apikey:api.config.secrets.kimono}}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              data = JSON.parse(body);
              if(data.results[360][0].price['class'].indexOf('disabled') > -1){
                  api.cache.save('google_stone', false);
              }
              else api.cache.save('google_stone', true);
          }
          else { api.log('err'+error); api.log('res'+response); api.log('body'+body);  }
      })

        request({url:'https://www.kimonolabs.com/api/byb181li', qs:{apikey:api.config.secrets.kimono}}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body);
                if(data.results[360][0].price['class'].indexOf('disabled') > -1){
                    api.cache.save('google_silver', false);
                }
                else api.cache.save('google_silver', true);
                next(true, null);
            }
            else { api.log('err'+error); }
        })

    }
};
