const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
    name: String,
    timestamp: { type: Date, default: Date.now },
    criticism: String,
    suggestions: String
  });
  
const Insight = mongoose.model('Insight', insightSchema, 'insightUser');
module.exports = Insight;

