import Character from "./Character.js";

export default class Player extends Character {
	constructor(name, position, hp) {
		super(name, position, hp);
		this.type = "Enemy";
		this.color = "rgb(220, 150, 170)";
		this.speed = 60;
	}
}