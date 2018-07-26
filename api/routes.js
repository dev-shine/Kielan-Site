var express = require('express'),
router = express.Router();

router.get('/posts', middleware('posts'));
router.get('/post/:urlParam', middleware('post'))

module.exports = router;
