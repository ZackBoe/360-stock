exports.default = {
  keys: function(api){
    return {
        kimono: '',
        bby: '',
        moto: {
          request: {url:'', qs:{}},
          regex: /()/
        },
        redis: {
          url: 'localhost',
          port: 6379,
          pass: ''
        }
    }
  }
}
