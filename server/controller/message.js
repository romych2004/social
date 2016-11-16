var users = require('./users');

var rooms = [
	{ membersId: ['user-1', 'user-2'], id: 'room-1' }
];

var items = [
	{ authorId: 'user-1', content: 'abracadabra', id: 'message-1', parentId: 'room-1', date: '' },
	{ authorId: 'user-2', content: 'NONONONO', id: 'message-2', parentId: 'room-1', date: '' }
];

rooms.reverse();

exports.getRooms = function(params) {
	var result = rooms.filter(function(room) {
		return room.membersId.indexOf(users.getCurrentUserId()) > -1;
	});
	
	result.map(function(room) {
		room.membersCount = room.membersId.length;
		room.lastMessage = exports.getMessageById(items[items.length-1].id);
	});

	return result;
};


exports.getMessagesByRoomId = function(params) {
	var col = items.filter(function(item){
		return item.parentId == params.roomId;
	});
	col.map(function(message) {
		message.author = users.getUserById(message.authorId);
	});
	return col;
};


exports.getMessageById = function(id) {

	var col = items.filter(function(item){
		return item.id == id;
	});

	col.map(function(message) {
		message.author = users.getUserById(message.authorId);
	});

	if(col.length) return col[0];
	else return null;
};