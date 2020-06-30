const mongoose = require('mongoose')

const connectSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    network: {type: String, required: true },
    responseTime: {type: String, required: true},
    callbacks: {type: String, required: true }
});

const blogModelSchema = new mongoose.Schema({
  
 title: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  draft: {
    type: Boolean,
    default: true
  },

  status: {type: String, required: true, enum: 
    ['Available', 'Archived', 'Down', 'Roasted'], default: 'Available'},

  age: { 
    type: Number, 
    min: 5, 
    max: 100
  },

  connections: [connectSchema]
})



module.exports = mongoose.model('BlogInstance', blogModelSchema)