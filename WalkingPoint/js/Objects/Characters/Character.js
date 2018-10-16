import SimpleObject from "../SimpleObject.js";

export default class Character extends SimpleObject {
	constructor(name = "Character", position, speed = 200, hp) {
		super(name, position, hp);
		this.type = "Character";
		this.color = "rgb(150, 150, 150)";
		this.speed = speed;
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
		
		/**
		 * Как далеко видит персонаж (в клетках)
		 */
		this.visionRadius = 3;
		
		/**
		 * Порядочность персонажа
		 * @type {number}
		 */
		this.decency = 50;
	}
	
	die() {
		super.die();
		console.log("I hate to be dead");
	}
	
	born() {
		console.log("I`m born and my name is", this.name);
	}
	
	/**
	 * Для удара по игроку
	 */
	hit(damage, puncher) {
		this.hp -= damage;
		console.log("Life is pain. Kill me, f*cking " + puncher.name);
	}
	
	/**
	 * Периодически вызываемая функция
	 */
	tick() {
		super.tick();
		
		if (this.AI !== null) {
			this.AI.tick();
		}
		else {
			if (this.targetPosition.length !== 0) {
				this.position = this.targetPosition[0];
				this.targetPosition.shift();
			}
		}
	}
	
	/**
	 * Записывает точку, в которую персонаж должен переместиться
	 * @param targetPosition {Cell}
	 * @param forceMove {boolean}
	 */
	setTargetPosition(targetPosition, forceMove = true) {
		if (forceMove) {
			this.targetPosition = [targetPosition];
		}
		this.targetPosition.push(targetPosition);
		this.forceMove = forceMove;
	};
};