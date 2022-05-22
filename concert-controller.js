const Concert = require("./models/concert");

exports.createConcert = function(req, res){
    let newConcert = new Concert(req.body);
    newConcert.save(function(err, concert){
        if(err){
            res.status(400).json(err);
        }
        res.json(concert);
    });
};

exports.getConcerts = function(req, res){
    Concert.find({}, function(err, concerts){
        if(err){
            res.status(400).json(err);
        }
        res.json(concerts);
    });
};

exports.getConcerts = function(req, res) {
    Concert.findOne({_id: req.params.id}, function (err, concert) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(concert);
    }); 
};

exports.updateConcert = function(req, res) {
    Concert.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, concert) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(concert);
    }); 
};

exports.deleteConcert = function(req, res) {
    Concert.findByIdAndRemove(req.params.id, function (err, concert) {
      if (err) {
        res.status(400).json(err);
      } 
      res.json(concert);
    }); 
};

