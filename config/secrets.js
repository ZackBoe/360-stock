exports.default = {
  secrets: function(api){
    return {
        kimono: api.config.keys.kimono,
        bby: api.config.keys.bby,
        moto_url: api.config.keys.moto.url,
        moto_regex: api.config.keys.moto.regex,
        redis_url: api.config.keys.redis.url,
        redis_port: api.config.keys.redis.port,
        redis_pass: api.config.keys.redis.pass
    }
  }
}

exports.production = {
  secrets: function(api){
    return {
        kimono: process.env.kimono,
        bby: process.env.bby,
        moto_url: process.env.motourl,
        moto_regex: process.env.motoregex,
        redis_url: process.env.redisurl,
        redis_port: process.env.redisport,
        redis_pass: process.env.redispass
    }
  }
}
