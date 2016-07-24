(function() {
  'use strict';
  var Shopping, _, handleError;

  _ = require('lodash');

  Shopping = require('./shopping.model');

  exports.index = function(req, res) {
    return Shopping.find(function(err, shoppings) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(shoppings);
    });
  };

  exports.show = function(req, res) {
    return Shopping.findById(req.params.id, function(err, shopping) {
      if (err) {
        return handleError(res, err);
      }
      if (!shopping) {
        return res.status(404).send('Not Found');
      }
      return res.json(shopping);
    });
  };

  exports.create = function(req, res) {
    return Shopping.create(req.body, function(err, shopping) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(201).json(shopping);
    });
  };

  exports.update = function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    return Shopping.findById(req.params.id, function(err, shopping) {
      var updated;
      if (err) {
        return handleError(res, err);
      }
      if (!shopping) {
        return res.status(404).send('Not Found');
      }
      updated = _.merge(shopping, req.body);
      return updated.save(function(err) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(200).json(shopping);
      });
    });
  };

  exports.destroy = function(req, res) {
    return Shopping.findById(req.params.id, function(err, shopping) {
      if (err) {
        return handleError(res, err);
      }
      if (!shopping) {
        return res.status(404).send('Not Found');
      }
      return shopping.remove(function(err) {
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

//# sourceMappingURL=shopping.controller.js.map
