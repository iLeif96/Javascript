import SimpleObject from "../SimpleObject.js";

export default class Decal extends SimpleObject {
	constructor(name = "Decal", position, parent) {
		super(name, position);
		this.parent = parent;
		this.type = Decal;
		this.baseType = Decal;
	}
	
	tick() {
		super.tick();
	}
}