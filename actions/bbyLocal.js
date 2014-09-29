exports.action = {
  name:                   'bbyLocal',
  description:            'Returns local Best Buy stock availability',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,

  inputs: {
    required: ["lat","lng"],
    optional: [],
  },

  run: function(api, connection, next){
    var request = require('request');

    connection.response.stores = [];

    request({url:'http://api.remix.bestbuy.com/v1/stores(area('+connection.params['lat']+','+connection.params['lng']+',35))+products(sku in(8307152,9169039))',
      qs:{apiKey:api.config.secrets.bbyLocal, format:'json', show:'storeId,name,products.sku,products.name'}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);

            connection.response.stores = data.stores;
            next(connection, true);
        }
        else { api.log(error); next(connection, false); }
    })

  }
};
