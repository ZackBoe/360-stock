exports.default = {
  secrets: function(api){
    return {
        kimono: api.config.keys.kimono,
        bby: api.config.keys.bby,
        moto: {
          request: api.config.keys.moto.request,
          regex: api.config.keys.moto.regex
        },
        redis: {
          url: api.config.keys.redis.url,
          port: api.config.keys.redis.port,
          pass: api.config.keys.redis.pass
        }
    }
  }
},

exports.production = {
  secrets: function(api){
    return {
        kimono: function(api){ return { process.env.kimono },
        bby: function(api){ return { process.env.bby },
        moto: {
          request: function(api){ return { process.env.motorequest },
          regex: function(api){ return { process.env.motoregex }
        },
        redis: {
          url: function(api){ return { process.env.redisurl },
          port: function(api){ return { process.env.redisport },
          pass: function(api){ return { process.env.redispass }
        }
    }
  }
}
