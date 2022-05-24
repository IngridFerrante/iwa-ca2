const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
    name: String,
    location: String,
    
    },{ writeConcern: { w: 'majority', j: true, wtimeout: 1000 } })

module.exports = mongoose.model('Concert', concertSchema);
