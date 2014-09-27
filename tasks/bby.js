exports.task = {
    name:          'bby',
    description:   'Refreshes Best Buy online availablity',
    frequency:     0,
    queue:         'stock',
    plugins:       [],
    pluginOptions: {},

    run: function(api, params, next){
        var request = require('request');

        request({url:'http://api.remix.bestbuy.com/v1/products(sku in(8307152,9169039))', qs:{apiKey:api.config.secrets.bby, format:'json', show:'inStoreAvailability,onlineAvailability'}}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body);

                api.cache.save('bby_black', {inStoreAvailability: data.products[0].inStoreAvailability, onlineAvailability: data.products[0].onlineAvailability});
                api.cache.save('bby_stone', {inStoreAvailability: data.products[1].inStoreAvailability, onlineAvailability: data.products[1].onlineAvailability});
                next(true, null);
            }
            else { api.log(error); next(false, null); }
        })
    }
};
