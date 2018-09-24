import Character from "./Character.js";

export default class Player extends Character {
	constructor(name, position, hp) {
		super(name, position, hp);
		this.type = "Player";
		this.color = "rgb(190, 200, 220)"
	}
}