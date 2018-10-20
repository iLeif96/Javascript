import SimpleObject from "../SimpleObject.js";

export default class Character extends SimpleObject {
	constructor(name = "Character", position, speed = 200, hp) {
		super(name, position, hp);
		this.type = "Character";
		this.color = "rgb(150, 150, 150)";
		this.speed = speed;
		this.canvasType = "characters";
		
		
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
		//console.log("Life is pain. Kill me, f*cking " + puncher.name);
	}
	
	/**
	 * Периодически вызываемая функция
	 */
	tick(canvas) {
		super.tick(canvas);
		
		if (this.AI !== null) {
			this.AI.tick();
		}
	}
	

};