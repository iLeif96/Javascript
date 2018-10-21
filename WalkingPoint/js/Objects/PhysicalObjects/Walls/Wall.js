import PhysicalObjects from "../PhysicalObjects.js";

export default class Wall extends PhysicalObjects {
	constructor(name, position, hp = 200) {
		super(name = "Wall", position, hp);
		this.type = Wall;
		this.baseType = Wall;
		this.color = "rgb(150, 250, 150)";
		this.canvasType = "walls";
		
	}
};