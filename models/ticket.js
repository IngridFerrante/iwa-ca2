const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    concert: String,
    information: String,
    
    },{ writeConcern: { w: 'majority', j: true, wtimeout: 1000 } })

module.exports = mongoose.model('Ticket', ticketSchema);
