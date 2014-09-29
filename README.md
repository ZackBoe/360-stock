# 360-Stock | [360.zackboe.co](360.zackboe.co)

Rewrite of a quick & *very* dirty PHP script to check Moto 360 stock from Google, Motorola, and Best Buy.

Previously each client called for a refresh of each retailer's API. Now, the server does so itself, saves to redis, and provides a *stock* api endpoint to clients.

Uses [ActionHeroJS](http://actionherojs.com/) and [request](https://github.com/mikeal/request).  
Hosted on [Heroku](http://heroku.com/) and [RedisCloud](https://redislabs.com/)
