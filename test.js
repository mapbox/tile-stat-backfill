var test = require('tape'),
  backfill = require('./');

test('terrain', function(t) {
  var reducer = backfill();
  reducer.on('end', function() {
    t.end();
  });
});
