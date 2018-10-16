import Character from "./Character.js";

export default class Enemy extends Character {
	constructor(name, position, speed = 100, hp) {
		super(name, position, speed, hp);
		this.type = "Enemy";
		this.color = "rgb(220, 150, 170)";
		this.decency = 5;
	}
}