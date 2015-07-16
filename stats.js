module.exports = function(tileLayers, opts, done) {
  // var roads = tileLayers.streets.roads;
  done(null, tileLayers.streets);
};
