(function() {
  'use strict';
  var Schema, ShoppingSchema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ShoppingSchema = new Schema({
    name: String,
    info: String,
    active: Boolean
  });

  module.exports = mongoose.model('Shopping', ShoppingSchema, 'shopping');

}).call(this);

//# sourceMappingURL=shopping.model.js.map
