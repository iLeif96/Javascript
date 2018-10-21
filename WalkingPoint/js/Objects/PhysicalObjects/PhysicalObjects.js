import SimpleObject from "../SimpleObject.js";
import Shooting from "../../Shooting/Shooting.js";

export default class PhysicalObjects extends SimpleObject {
	constructor(name = "PhysicalObjects ", position, hp = 100) {
		super(name, position, hp);
		this.maxHp = hp;
		this.hp = hp;
		this.type = PhysicalObjects;
		this.baseType = PhysicalObjects;
		this.longWeapon = null;
		//this.born();
		this.decency = 0;
	}
	
	isDie() {
		return (this.hp <= 0)
	}
	
	/**
	 * Для удара от чего-то
	 */
	hit(damage, puncher) {
		this.hp -= damage;
	}
	
	/**
	 * Записывает точку, в которую персонаж должен переместиться
	 * @param targetPosition {Cell}
	 * @param forceMove {boolean}
	 */
	setTargetPosition(targetPosition, forceMove = true) {
		if (forceMove)
			this.targetPosition = [targetPosition];
		else
			this.targetPosition.push(targetPosition);
		this.forceMove = forceMove;
	};
	
	/**
	 * Периодично вызываемая функция
	 */
	tick() {
		super.tick();
	}
	
	/**
	 * Выстрелить куда-то
	 * @param targetPosition {Cell}
	 * @param groundMatrix {GroundMatrix}
	 * @param objects {Objects}
	 */
	doShot(targetPosition, groundMatrix, objects) {
		try {
			new Shooting(this, targetPosition, groundMatrix, objects);
		}
		catch (e) {
			return true;
		}
	}
}