var tileReduce = require('tile-reduce');
var path = require('path');

/**
 * Given a TileJSON object representing a vector tile dataset on the
 * internet, find and analyze tiles, calling callback with
 * an 'enhanced' stats object.
 *
 * @param {string} mapid
 * @param {string} accessToken
 * @param {Function} callback
function backfill(mapid, accessToken, callback) {
  var url = 'https://a.tiles.mapbox.com/v4/' + mapid + '.json?access_token=' + accessToken;

  request({
    url: url, json: true
  }, function(err, res, tilejson) {
    if (err) return callback(err);
    var q = queue(1);
    tilejson.vector_layers.forEach(function(vector_layer) {
      q.defer(loadVectorLayer, tilejson, vector_layer);
    });
    q.awaitAll(function(err, results) {
      callback(err, results);
    });
  });
}
 */

function backfill() {
  var bbox = [
    -74.16732788085938,
    40.606654663050485,
    -73.79653930664062,
    40.8626410807892
  ];

  var opts = {
    zoom: 15,
    tileLayers: [
      {
        name: 'streets',
        url: 'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=' + process.env.MapboxAccessToken,
        layers: ['landuse']
      }
    ],
    map: path.join(__dirname, '/stats.js')
  };

  var tilereduce = tileReduce(bbox, opts);

  tilereduce.on('reduce', function(result) {
    console.log(JSON.stringify(result));
  });

  tilereduce.run();

  return tilereduce;
}

module.exports = backfill;
