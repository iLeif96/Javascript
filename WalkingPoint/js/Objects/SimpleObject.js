import Periodic from "../Periodic.js";
import Move from "../Moving/Move.js"

export default class SimpleObject extends Periodic {
	constructor(name = "Object", position) {
		super();
		this.name = name;
		this.lastPosition = position;
		this.position = position;
		this.type = SimpleObject;
		this.baseType = SimpleObject;
		this.color = "rgb(30, 30, 30)";
		this.id = 0;
		this.forceMove = false;
		this.speed = 0;
		this.targetPosition = [];
		this.decency = 0;
		this.needRedraw = true;
		this.actions = {};
		
		//this.move = null;
		
	}
	
	addAction(action) {
		this.actions[action.toString()] = action;
	}
	
	deleteAction(action) {
		delete this.actions[action.toString()];
	}
	
	isMoving() {
		// if (this.actions["Move"] !== null) {
		// 	if (this.actions["Move"].isMoving()) {
		// 		return true
		// 	}
		// }
		return false;
	}
	
	/**
	 * Вызывается для перемещения куда бы то ни было
	 * @param move {Move}
	 */
	moveTo(move) {
		if (move) {
			this.addAction(move);
			
			move.afterFunc = function (context) {
				if (context.currentPosition.groundCell.isBusy(context.object)) {
					context.resolvePath();
				}
				context.object.position = context.currentPosition;
			};
			
			return true;
		}
		return false;
	}
	
	/**
	 * Вызывается при создании объекта
	 */
	born() {
		console.log("Shh: *", this.name);
	}
	
	/**
	 * Вызывается при смерти объекта
	 */
	die() {
		console.log("Shh: *", this.name)
	}
	
	/**
	 * Периодично вызываемая функция
	 */
	tick() {
		for (let action in this.actions) {
			if (this.actions[action] !== null) {
				this.actions[action].tick();
			}
		}
	}
	
	toString() {
		return this.id;
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