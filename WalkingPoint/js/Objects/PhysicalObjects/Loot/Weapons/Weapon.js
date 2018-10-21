/**
 * Самое простое оружее
 */
import Loot from "../Loot.js";

export default class Weapon extends Loot {
	constructor(name = "Weapon", position, hp = 100) {
		super(name, position, hp);
		this.range = 500;
		this.rateOfFire = 5;
		this.bulletSpeed = 800;
		this.damage = 10;
		this.type = Weapon;
	}
	
	
	tick() {
		super.tick();
	}
};