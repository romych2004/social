export class MenuItem {
	public style: string;
	public styleClass: string;
	public disabled = false;

	constructor(public html:string, public url: string) { }
}