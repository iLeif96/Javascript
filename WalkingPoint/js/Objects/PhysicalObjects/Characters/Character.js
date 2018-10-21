import PhysicalObjects from "../PhysicalObjects.js";

export default class Character extends PhysicalObjects {
	constructor(name = "Character", position, speed = 200, hp) {
		super(name, position, hp);
		this.type = Character;
		this.baseType = Character;
		this.color = "rgb(150, 150, 150)";
		this.speed = speed;
		
		
		/**
		 * ИИ объекта
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
	tick() {
		if (this.AI !== null) {
			this.AI.tick();
		}
		
		super.tick();
	}
	

};