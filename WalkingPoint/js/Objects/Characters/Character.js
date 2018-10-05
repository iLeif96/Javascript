import SimpleObject from "../SimpleObject.js";

export default class Character extends SimpleObject {
	constructor(name, position, hp) {
		super(name = "Character", position, hp);
		this.type = "Character";
		this.color = "rgb(150, 150, 150)";
		this.speed = 10;
		/**
		 * Цель перемещения игрока
		 * @Type {Array} Cell
		 */
		this.targetPosition = [];
		
		/**
		 * Должен ли персонаж пересчитать траекторию движения
		 */
		this.forceMove = false;
		
		/**
		 * Цель перемещения игрока
		 * @Type {BaseAI}
		 */
		this.AI = null;
	}
	
	/**
	 * Периодически вызываемая функция
	 */
	tick() {
		super.tick();
		
		if (this.AI !== null) {
			this.AI.tick();
		}
	}
	
	/**
	 * Записывает точку, в которую персонаж должен переместиться
	 * @param targetPosition {Cell}
	 * @param forceMove {boolean}
	 */
	setTargetPosition(targetPosition, forceMove = true) {
		this.targetPosition.push(targetPosition);
		this.forceMove = forceMove;
	};
};