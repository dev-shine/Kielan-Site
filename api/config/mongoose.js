var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/admin');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {
	type: String,
	required: true
    },
    subtitle: {
	type: String,
	required: true
    },
    date: {
	type: Date,
	default: Date.now
    },
    content: {
	type: String,
	required: true
    }
}, {collection: 'Posts'})

global.Post = mongoose.model('Post', postSchema);
