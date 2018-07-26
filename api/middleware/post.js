module.exports = function(req, res, next) {
    var urlParam = req.params.urlParam
    Post.findOne({url: urlParam}, function(err, doc) {
	if(err) console.log(err)
	console.log(doc)
	return res.json(doc);
    })
}
