import SimpleObject from "../SimpleObject.js";

export default class Character extends SimpleObject {
	constructor(name, position, hp) {
		super(name = "Character", position, hp);
		this.type = "Character";
		this.color = "rgb(150, 150, 150)";
		this.speed = 100;
		/**
		 * Цель перемещения игрока
		 * @Type {Cell}
		 */
		this.targetPosition = null;
		
		/**
		 * Цель перемещения игрока
		 * @Type {BaseAI}
		 */
		this.AI = null;
	}
	
	/**
	 * Помечает точку, в которую нужно идти
	 * @param cell {Cell}
	 */
	moveToCell(cell) {
		this.targetPosition = cell
	}
	
	tick() {
		super.tick();
		
		if (this.AI !== null) {
			this.AI.tick();
		}
	}
};