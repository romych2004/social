var items = {
	home: [
		{ html: "Новости", url: 'news', style: '', styleClass: '', disabled: false, icon: 'home' },
		{ html: "Сообщения", url: 'messages', style: '', styleClass: '', disabled: false },
		{ html: "Третья", url: 'ha', style: '', styleClass: '', disabled: true },
		{ html: "Четвертая", url: 'http://ya.ru', style: '', styleClass: '', disabled: false }
	],
	admin: [
		{ html: "Admin-Новости", url: 'news', style: '', styleClass: '', disabled: false },
		{ html: "Admin-Сообщения", url: 'messages', style: '', styleClass: '', disabled: false },
		{ html: "Admin-Третья", url: 'ha', style: '', styleClass: '', disabled: true },
		{ html: "Admin-Четвертая", url: 'http://ya.ru', style: '', styleClass: '', disabled: false }
	]
}


exports.getMenu = function(page) {
	return items[page];
}