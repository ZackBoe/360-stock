var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'stock';
action.description = 'I will test the internal cache functions of the API';
action.inputs = {
    'required' : [],
    'optional' : []
};
action.blockedConnectionTypes = [];
action.outputExample = {
    cacheTestResults: {
        key: 'key',
        value: 'value',
        saveResp: 'OK',
        loadResp: 'OK',
        deleteResp: 'OK'
    }
}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){
    var key = 'google_black';
    var value = false;

    connection.response.stock = {};

    api.cache.load('google_black', function(err, resp, expireTimestamp, createdAt, readAt){
        connection.response.stock.google.black = {
            available: resp, updatedAt: createdAt
        }
        next(connection, true);
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
    });




    connection.response.stock.google = {};
    connection.response.stock.moto = {};
    connection.response.stock.bby = {};

};

    /////////////////////////////////////////////////////////////////////
    // exports
    exports.action = action;