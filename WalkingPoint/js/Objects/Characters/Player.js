import Character from "./Character.js";

export default class Player extends Character {
	constructor(name = "Player", position, speed = 400, hp) {
		super(name, position, speed, hp);
		this.type = "Player";
		this.color = "rgb(190, 200, 220)";
		this.decency = 100;
		this.longWeapon = true;
	}
}