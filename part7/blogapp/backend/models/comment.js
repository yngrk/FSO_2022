const { default: mongoose } = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
});

commentSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id;
    delete retObj._id;
    delete retObj.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
