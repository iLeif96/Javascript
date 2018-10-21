import Decal from "./Decal.js";

export default class Bullet extends Decal{
	constructor(name = "Bullet", position, parent) {
		super(name, position, parent);
		this.type = Bullet;
	}
	
	tick() {
		super.tick();
	}
}