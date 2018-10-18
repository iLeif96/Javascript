import Character from "./Character.js";

export default class Player extends Character {
	constructor(name = "Runner", position, speed = 500, hp = 80) {
		super(name, position, speed, hp);
		this.type = "Runner";
		this.color = "rgb(230, 230, 230)";
		this.decency = 90;
	}
}