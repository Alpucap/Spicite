const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: String,
    comment: String
  });
  
// Model komentar
const Comment = mongoose.model('Comment', commentSchema, 'dataComment');
module.exports = Comment;