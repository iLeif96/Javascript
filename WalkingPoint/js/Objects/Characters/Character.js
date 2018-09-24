import SimpleObject from "../SimpleObject.js";

export default class Character extends SimpleObject {
	constructor(name, position, hp) {
		super(name = "Character", position, hp);
		this.type = "Character";
		this.color = "rgb(150, 150, 150)";
	}
};