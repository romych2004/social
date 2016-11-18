var users = require('./users');
var likes = require('./like');

var items = [
	{ authorId: 'user-1', parentId: 'home', content: 'Новость!', id: 'news-1'},
	{ authorId: 'user-2', parentId: 'home', content: 'Тест!', id: 'news-2'},
	{ authorId: 'user-1', parentId: 'home', content: 'Новость!', id: 'news-3'}
];

items.reverse();

exports.getNews = function(params) {
	var result = items.filter(function(item) {
		return item.parentId == params.parentId;
	});
	
	result.map(function(item1) {
		if(!item1.author) item1.author = users.getUserById(item1.authorId);
		
		item1.likesCount = likes.getLikesCount(item1.id);
		item1.likedByMe = likes.isLikedByMe(item1.id);
	});

	return result;
};

exports.createNews = function(parentId, item) {
	item.parentId = parentId;
	item.authorId = item.author.id;
	delete item.author;
	items.splice(0, 0, item);
	item.id = 'news-' + items.length;
	return item;
};