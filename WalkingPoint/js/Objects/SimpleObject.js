import {Cell} from "../Cell.js";
import {EventAbleObject} from "../Events.js";
import Periodic from "../Periodic.js";

export default class SimpleObject extends Periodic {
	constructor(name = "Object", position, hp = 100) {
		super();
		this.name = name;
		this.lastPosition = position.clone();
		this.position = position;
		this.maxHp = hp;
		this.hp = hp;
		this.type = "SimpleObject";
		this.color = "rgb(30, 30, 30)";
		this.id = 0;
		this.isDie = false;
		//this.born();
	}
	
	/**
	 * Вызывается при создании объекта
	 */
	born() {
		this.isDie = false;
		console.log("Shh: *", this.name);
	}
	
	/**
	 * Вызывается при смерти объекта
	 */
	die() {
		this.isDie = true;
		console.log("Shh: *", this.name)
	}
	
	/**
	 * Для удара по чему-то
	 */
	hit(damage, puncher) {
		this.hp -= damage;
	}
	
	/**
	 * Периодично вызываемая функция
	 */
	tick() {
		if (!this.isDie) {
			if (this.hp <= 0) {
				this.die();
			}
		}
	}
	
	//От этого надо избавиться
	
	/*
		Просто макросы для получения координат
	 */
	/**
	 * Передает точку в непереведенных к отрисовке координатам
	 * @param groundMatrix {GroundMatrix}
	 * @returns {CPoint}
	 */
	getCPoint(groundMatrix) {
		this.position.getCPoint(groundMatrix);
	}
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param groundMatrix {GroundMatrix}
	 * @returns x: {number}
	 */
	getX(groundMatrix) {
		return this.position.getX(groundMatrix);
	}
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param mPoint {MPoint}
	 * @returns y: {number}
	 */
	getY(groundMatrix) {
		return this.position.getY(groundMatrix);
	}
}