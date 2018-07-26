module.exports = function (req, res, next) {
    Post.find({}, function(err, docs) {
	if(err) console.log(err)
	console.log(docs)
	return res.json(docs);
    })
}
