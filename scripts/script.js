var api_key = "at_C4SDN7bt74w5infGoMPMzdtIIJd2w";

var lat = "";
var lng = "";


function update(ip) {

  $.ajax({
    url: "https://geo.ipify.org/api/v1",
    data: {apiKey: api_key, ipAddress: ip},
    success: function(data) {
      document.getElementById("ip-address").innerHTML = data.ip;
      document.getElementById("location").innerHTML = data.location.city + ", " + data.location.region + " " + data.location.postalCode;
      document.getElementById("timezone").innerHTML = data.location.timezone + " UTC";
      document.getElementById("isp").innerHTML = data.isp;

      lat = data.location.lat;
      lng = data.location.lng;

      var viewlat = lat + 0.005;

      mapboxgl.accessToken = 'pk.eyJ1Ijoid2VsbGVyaW5kZXAiLCJhIjoiY2toNHhsbmgzMGczdDMwcWJqODVyd2FyeSJ9.io83u9yMFfuKLtBMrsaGNA';
      var map = new mapboxgl.Map({
        container: 'mapid',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, viewlat],
        zoom: 14,
        interactive: false
      });

      var marker = new mapboxgl.Marker({
        color: '#000000'
      })
      .setLngLat([lng, lat])
      .addTo(map);
    }
  });

}

document.getElementById('ip-form').onsubmit = function() {
  var input = document.getElementById('search').value;
  document.getElementById('search').value = "";
  update(input);
  return false;
};

$(function() {
  update();
});
