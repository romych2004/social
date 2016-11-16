export class AppError {
	constructor(public text: string, public event: Event, public title?: string) {}
}