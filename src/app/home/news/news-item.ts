import { User, CommentItem } from '../../common';

export class NewsItem {
	id: string;
	content: string;
	author: User;
	comments: Array<CommentItem>;
	commentsCount:number = 0;

	likedByMe: boolean = false;
	likesCount: number = 0;
	likes: Array<User>;
}