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
        kimono: process.env.kimono,
        bby: process.env.bby,
        moto: {
          request: process.env.motorequest,
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
