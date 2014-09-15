exports.task = {
    name:          'google',
    description:   'Refreshes Google Play stock status',
    frequency:     60 * 1000,
    queue:         'stock',
    plugins:       [],
    pluginOptions: {},

    run: function(api, params, next){
        var request = require('request');

        request({url:'https://www.kimonolabs.com/api/efixfpqe', qs:{apikey:api.config.keys.kimono}}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body);
                if(data.results[360][0].price['class'].indexOf('disabled') > -1){
                    api.cache.save('google_black', false);
                }
                else api.cache.save('google_black', true);
            }
            else { api.log(error); next(false, null); }
        })


        request({url:'https://www.kimonolabs.com/api/cfddg2cw', qs:{apikey:api.config.keys.kimono}}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body);
                if(data.results[360][0].price['class'].indexOf('disabled') > -1){
                    api.cache.save('google_silver', false);
                }
                else api.cache.save('google_silver', true);
                next(true, null);
            }
            else { api.log(error); next(false, null); }
        })

    }
};
