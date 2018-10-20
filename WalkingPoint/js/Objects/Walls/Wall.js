import SimpleObject from "../SimpleObject.js";

export default class Wall extends SimpleObject {
	constructor(name, position, hp = 200) {
		super(name = "Wall", position, hp);
		this.type = "Wall";
		this.color = "rgb(150, 250, 150)";
		this.canvasType = "walls";
	}
};