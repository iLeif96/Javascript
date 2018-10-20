import {Cell} from "../Cell.js";
import {EventAbleObject} from "../Events.js";
import Periodic from "../Periodic.js";
import Move from "../Moving/Move.js"

export default class SimpleObject extends Periodic {
	constructor(name = "Object", position, hp = 100) {
		super();
		this.name = name;
		this.lastPosition = position.clone();
		this.position = position;
		this.maxHp = hp;
		this.hp = hp;
		this.type = "SimpleObject";
		this.speed = 0;
		this.color = "rgb(30, 30, 30)";
		this.id = 0;
		this.isDie = false;
		this.longWeapon = null;
		//this.born();
		this.forceMove = false;
		this.targetPosition = [];
		this.move = null;
		this.canvasType = "globalChanges";
		
	}
	
	isMoving() {
		if (this.move !== null) {
			if (this.move.isMoving) {
				return true
			}
		}
		return false;
	}
	
	/**
	 * Вызывается для перемещения куда бы то ни было
	 * @param move {Move}
	 */
	moveTo(move) {
		this.move = move;
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
	tick(canvas) {
		if (!this.isDie) {
			if (this.hp <= 0) {
				this.die();
			}
		}
		
		if (this.move !== null) {
			this.move.tick(canvas);
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