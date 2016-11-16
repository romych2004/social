var users = require('./users');

var items = [
	{ parentId: 'news-1', id: 'like-1', userId: 'user-2' },
	{ parentId: 'news-1', id: 'like-2', userId: 'user-1' }
];

items.reverse();

exports.getLikes = function(params) {
	var result = items.filter(function(item) {
		return item.parentId == params.parentId;
	});
	
	result.map(function(item1) {
		if(!item1.user) item1.user = users.getUserById(item1.userId);
	});

	return result;
};

exports.getLikesCount = function(id) {
	var result = items.filter(function(item) {
		return item.parentId == id;
	});
	return result.length;
};

exports.isLikedByMe = function(id) {
	var result = false;
	items.map(function(item) {
		if(item.parentId == id && item.userId == users.getCurrentUserId()) result = true;
	});
	
	return result;
};

exports.addLike = function(params) {
	var result = items.filter(function(item) {
		return item.parentId == params.parentId && item.userId == users.getCurrentUserId();
	});
	
	if(result.length) return false;
	var item = {parentId: params.parentId, userId: users.getCurrentUserId()};
	items.splice(0, 0, item);
	item.id = 'like-' + items.length;
	return true;
};

exports.removeLike = function(params) {
	items = items.filter(function(item) {
		return (item.parentId != params.parentId || item.userId != users.getCurrentUserId());
	});
	return true;
};