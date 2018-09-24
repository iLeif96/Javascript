import SimpleObject from "../SimpleObject.js";

export default class Wall extends SimpleObject {
	constructor(name, position, hp) {
		super(name = "Wall", position, hp = 200);
		this.type = "Wall";
		this.color = "rgb(150, 250, 150)";
	}
};