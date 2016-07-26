(function() {
  'use strict';
  var Post, _, handleError;

  _ = require('lodash');

  Post = require('./post.model');

  exports.index = function(req, res) {
    return Post.find({}).sort({
      pid: -1
    }).limit(1).exec(function(err, doc) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(doc);
    });
  };

  exports.show = function(req, res) {
    return Post.findOne({
      pid: req.params.id
    }, function(err, doc) {
      var idx;
      if (err) {
        return handleError(res, err);
      }
      if (!doc) {
        return res.status(404).send('Not Found');
      }
      idx = Number(req.params.id) + 10;
      return Post.find({
        pid: {
          $lte: idx
        }
      }, {
        pid: 1,
        title: 1
      }).sort({
        pid: -1
      }).limit(10).exec(function(err, list) {
        if (err) {
          return handleError(res, err);
        }
        return res.json({
          data: doc,
          list: list
        });
      });
    });
  };

  exports.create = function(req, res) {
    return Post.create(req.body, function(err, post) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(201).json(post);
    });
  };

  exports.update = function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    return Post.findOne({
      pid: req.params.id
    }, function(err, post) {
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return res.status(404).send('Not Found');
      }
      post.imglist = req.body.imglist;
      return post.save(function(err) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(200).json(post);
      });
    });
  };

  exports.destroy = function(req, res) {
    return Post.findById(req.params.id, function(err, post) {
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return res.status(404).send('Not Found');
      }
      return post.remove(function(err) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(204).send('No Content');
      });
    });
  };

  handleError = function(res, err) {
    return res.status(500).send(err);
  };

}).call(this);

//# sourceMappingURL=post.controller.js.map
