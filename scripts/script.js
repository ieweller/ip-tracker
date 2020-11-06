var lat = "";
var lng = "";

$(function() { update(); });

function update(input) {

  $.ajax({

    url: "https://geo.ipify.org/api/v1",
    data: {apiKey: "at_C4SDN7bt74w5infGoMPMzdtIIJd2w", ipAddress: input, domain: input},
    success: function(data) {

      document.getElementById("ip-address").innerHTML = data.ip;
      document.getElementById("location").innerHTML = data.location.city + ", " + data.location.region + " " + data.location.postalCode;
      document.getElementById("timezone").innerHTML = data.location.timezone + " UTC";
      document.getElementById("isp").innerHTML = data.isp;

      lat = data.location.lat;
      lng = data.location.lng;

      var viewlat = lat + 0.0075;

      mapboxgl.accessToken = 'pk.eyJ1Ijoid2VsbGVyaW5kZXAiLCJhIjoiY2toNHhsbmgzMGczdDMwcWJqODVyd2FyeSJ9.io83u9yMFfuKLtBMrsaGNA';

      var map = new mapboxgl.Map({

        container: 'mapid',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, viewlat],
        zoom: 14,
        interactive: false

      });

      var marker = new mapboxgl.Marker({ color: '#000000' })

      .setLngLat([lng, lat])
      .addTo(map);

    }
  });

}

document.getElementById('ip-form').onsubmit = function() {

  var searchField = document.getElementById('search');

  var input = searchField.value;

  searchField.value = "";
  searchField.blur();

  update(input);

  return false;

};
