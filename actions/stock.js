var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'stock';
action.description = 'Returns stock availability';
action.inputs = {
    'required' : [],
    'optional' : []
};
action.blockedConnectionTypes = [];
action.outputExample = {
    google: {
      black: { available: false },
      silver: { available: false }
    },
    moto: {
      black: { available: false },
      silver: { available: false }
    },
    bby: {
      black:{
        available: {
          inStoreAvailability: false,
          onlineAvailability: false
        }
      },
      silver:{
        available: {
          inStoreAvailability: false,
          onlineAvailability: false
        }
      }
    }
}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){

    connection.response.stock = {};
    connection.response.stock.google = {};
    connection.response.stock.moto = {};
    connection.response.stock.bby = {};

    api.cache.load('google_black', function(err, resp, expireTimestamp, createdAt, readAt){
        connection.response.stock.google.black = { available: resp, updatedAt: createdAt }
    });

    api.cache.load('google_silver', function(err, resp, expireTimestamp, createdAt, readAt){
        connection.response.stock.google.silver =  { available: resp, updatedAt: createdAt }
    });

    api.cache.load('moto_black', function(err, resp, expireTimestamp, createdAt, readAt){
        connection.response.stock.moto.black =  { available: resp, updatedAt: createdAt }
    });

    api.cache.load('moto_silver', function(err, resp, expireTimestamp, createdAt, readAt){
        connection.response.stock.moto.silver =  { available: resp, updatedAt: createdAt }
    });

    api.cache.load('bby_black', function(err, resp, expireTimestamp, createdAt, readAt){
        connection.response.stock.bby.black =  { available: resp, updatedAt: createdAt }
    });

    api.cache.load('bby_silver', function(err, resp, expireTimestamp, createdAt, readAt){
        connection.response.stock.bby.silver =  { available: resp, updatedAt: createdAt }
        next(connection, true);
    });

};

    /////////////////////////////////////////////////////////////////////
    // exports
    exports.action = action;
