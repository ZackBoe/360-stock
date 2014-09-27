exports.default = {
  secrets: function(api){
    return {
        kimono: api.config.keys.kimono,
        bby: api.config.keys.bby,
        bbyLocal: api.config.keys.bbyLocal,
        moto: {
          url: api.config.keys.moto.url,
          regex: api.config.keys.moto.regex
        },
        redis: {
          url: api.config.keys.redis.url,
          port: api.config.keys.redis.port,
          pass: api.config.keys.redis.pass
        }
    }
  }
}

exports.production = {
  secrets: function(api){
    return {
        kimono: process.env.kimono,
        bby: process.env.bby,
        bbyLocal: process.env.bbyLocal,
        moto: {
          url: process.env.motourl,
          regex: process.env.motoregex
        },
        redis: {
          url: process.env.redisurl,
          port: process.env.redisport,
          pass: process.env.redispass
        }
    }
  }
}
