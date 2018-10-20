import Wall from "./Wall.js";

export default class RoughWall extends Wall {
	constructor(name, position, hp) {
		super(name, position, hp);
		this.type = "RoughWall";
		this.color = "#78909c"
	}
}