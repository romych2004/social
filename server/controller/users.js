var items = [
	{ fullName: 'Roman', username: 'romych', password: '123', id: 'user-1' },
	{ fullName: 'Dima', username: 'dima', password: '123', id: 'user-2' }
];

exports.getUsers = function(params) {
	return items;
};

exports.getUserById = function(id) {
	var col = items.filter(function(user){
		return user.id == id;
	});
	if(col.length) return col[0];
	else return null;
};

exports.createUser = function(user) {
	items.push(user);
};

exports.updateUser = function(id, data) {
	
};

exports.getCurrentUserId = function() {
	return 'user-1';
}