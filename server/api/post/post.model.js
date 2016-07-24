(function() {
  'use strict';
  var PostSchema, Schema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  PostSchema = new Schema({
    pid: Number,
    title: String,
    imglist: [
      {
        no: Number,
        link: String,
        desc: String,
        size: String
      }
    ],
    newslist: [
      {
        company: String,
        title: String,
        desc: String
      }
    ]
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  });

  PostSchema.virtual('postlist').get(function() {
    return {
      pid: this.pid,
      title: this.title
    };
  });

  PostSchema.path('pid').validate((function(value, resp) {
    var self;
    self = this;
    return this.constructor.findOne({
      pid: value
    }, function(err, post) {
      if (err) {
        throw err;
      }
      if (post) {
        if (self.id === post.id) {
          return resp(true);
        }
        return respond(false);
      }
      return resp(true);
    });
  }), 'pid is already in use');

  module.exports = mongoose.model('Post', PostSchema, 'postinfo');

}).call(this);

//# sourceMappingURL=post.model.js.map
