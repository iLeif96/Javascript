import Wall from "./Wall.js";

export default class RoughWall extends Wall {
	constructor(name, position, hp) {
		super(name, position, hp);
		this.type = "RoughWall";
		this.color = "rgb(150, 255, 110)"
	}
}