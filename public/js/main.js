
$(function() {
  retailers = ['google', 'moto', 'bby'];
  seenNotifications = [];
  allTheNotifications = false;
  notificationsGranted = null;

  if ("Notification" in window) { Notification.requestPermission(function (perm) { notificationsGranted = perm; }); }

    sec = 1;
    lat = null;
    lng = null;

    refresh();
    draw();
    increment();
    setInterval(function() {
        draw();
        increment();
    }, 1000);

    setInterval(function() {
        refresh();
    }, 60000);

});

function refresh(){
    getStock();
    $("[data-retailer='bby']  [data-stock-type='local'] [data-model='black'] ul").html('');
    $("[data-retailer='bby']  [data-stock-type='local'] [data-model='stone'] ul").html('');
    // Check BestBuy, 35mi radius
    if(lat != null) { bbyLocal(lat, lng); }
    else geo();
}

function updateStock(retailer, model, stockType, available, stores){
  if(stockType == null) stockType = 'onlineAvailability';
  // console.log(retailer+":"+model+":"+stockType+":"+available);
  if(available){
    if(stores != null) $.each(stores, function(index, store){ $("[data-retailer='"+retailer+"']  [data-stock-type='"+stockType+"'] [data-model='"+model+"'] ul").append('<li>'+store+'</li>'); });
    $("[data-retailer='"+retailer+"']  [data-stock-type='"+stockType+"'] [data-model='"+model+"']").removeClass('unknown unavailable').addClass('available');
    $('#available').text('YES!');
    if (notificationsGranted == "granted" && seenNotifications.indexOf(retailer+model) < 0 ) {
      var notifications = new Notification("Moto 360 in stock!", {
        tag: "360"+retailer+model,
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Clock_simple.svg/120px-Clock_simple.svg.png",
        body: "The "+model+" 360 is in stock at "+retailer+"!"
      });
      notifications.onshow = function(){
        var self = this;
        setTimeout(function(){
          self.close();
        }, 5000);
      }
      if(!allTheNotifications) seenNotifications.push(retailer+model);
    }
  }
  else {
    $("[data-retailer='"+retailer+"']  [data-stock-type='"+stockType+"'] [data-model='"+model+"']").removeClass('unknown available').addClass('unavailable');
  }
}

function getStock(){
  $.getJSON( "http://360.zackboe.co/api/stock", function( data ) {
    console.log(data.stock);
    $.each(retailers, function(index, retailer){
      $.each(data.stock[retailer], function(index, models){
        if(retailer == 'bby'){
          updateStock(retailer, index, 'onlineAvailability', models.available.onlineAvailability);
          updateStock(retailer, index, 'inStoreAvailability', models.available.inStoreAvailability);
        }
        else{
          updateStock(retailer, index, null, models.available);
        }
      });
    });
  });
}

function bbyLocal(lat,lng){
  // updateStock('bby','black','local',true,data.stores[sindex].name);
  stock = [];
  stores = [];
  stock['black'] = false;
  stock['stone'] = false;
  stores['black'] = [];
  stores['stone'] = [];
  $.getJSON( "http://360.zackboe.co/api/bbyLocal?lat="+lat+"&lng="+lng, function( data ) {
    console.log(data.stores.length);
    $.each(data.stores, function(sindex,store){
      $.each(data.stores[sindex].products, function(pindex, product){
        if(product.sku == 8307152){
          stock['black'] = true;
          stores['black'].push(data.stores[sindex].name);
        }
        if(product.sku == 9169039){
          stock['stone'] = true;
          stores['stone'].push(data.stores[sindex].name);
        }
      })
      if (sindex == data.stores.length -1){
        updateStock('bby', 'black', 'local', stock['black'], stores['black']);
        updateStock('bby', 'stone', 'local', stock['stone'], stores['stone']);
      }
    })
  });
}

function geo(){
    if ("geolocation" in navigator) {
      console.log('getting coords');
        navigator.geolocation.getCurrentPosition(function(position, error) {
            if(error) $('[data-retailer="bby"] [data-stock-type="local"]').removeClass('unknown unavailable').html('<td colspan="3">Cannot check local stock, current location unavailable.</td>');
            if(!position) $('[data-retailer="bby"] [data-stock-type="local"]').removeClass('unknown unavailable').html('<td colspan="3">Cannot check local stock, current location unavailable.</td>');
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            bbyLocal(lat, lng);
        });
    }
    else $('[data-retailer="bby"] [data-stock-type="local"]').removeClass('unknown unavailable').html('<td colspan="3">Cannot check local stock, current location unavailable.</td>');
}


$('.hella').on("click", function(){ allTheNotifications = true; seenNotifications = []; });

// Tick Tock
var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

function degToPi(d) {
    return ((d / 360) * 2) - 0.5;
}

function drawSeconds(startAngle, endAngle) {
    ctx.strokeStyle = 'steelblue';
    ctx.lineWidth = 30
    drawArc((cvs.width/2), startAngle, endAngle);
}

function drawArc(radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(cvs.width/2, cvs.height/2, radius,
            degToPi(startAngle)*Math.PI,
            degToPi(endAngle)*Math.PI);
    ctx.stroke();
}

function clear() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
}

function draw() {
    clear();
    drawSeconds(0, sec);
}

function increment() {
    sec += 6;
    if(sec>360) sec = 6;
}
