/**
 * Создается для перемещения объекта
 */
import Interpolation from "../Interpolation/Interpolation.js";
import Animation from "../Animation/Animation.js";
import Periodic from "../Periodic.js";

export default class Move extends Periodic {

	/**
	 * @param groundMatrix {GroundMatrix}
	 * @param object {SimpleObject}
	 * @param targetPosition {Cell}
	 * @param afterFunc {Function}
	 * @return {Move}
	 */
	constructor(object, targetPosition, groundMatrix, afterFunc = null) {
		super();
		this.groundMatrix = groundMatrix;
		this.targetPosition = targetPosition;
		this.object = object;
		
		this.afterFunc = afterFunc;
		
		this.currentPosition = this.object.position;
		
		/** @type {Path} */
		this.path = this.solvePath();

		if (this.path === null)
			throw "Path not created";
		
		/** @type {Animation} */
		this.anim = new Animation(this.path.nowPath(), object.speed, null);
		
		if (this.anim === null)
			throw "Path not created";
	}
	
	/**
	 * Есть ли движение
	 */
	isMoving() {
		return (!this.path.isDone())
	}
	
	/**
	 * Рассчитываем путь движения объекта
	 * @return {Path}
	 */
	solvePath() {
		let tP = this.targetPosition.mPoint;
		let path = null;
		
		if (this.groundMatrix[tP.x][tP.y].isBusy()) {
			this.targetPosition = Interpolation.findFreeCell(
				tP,
				this.groundMatrix,
				this.object.position.mPoint);
			
			if (this.targetPosition === null)
				return path;
		}
		
		
		//Интерполируем путь
		path = Interpolation.findWaySimple(
			this.object.position,
			this.targetPosition,
			this.groundMatrix);
		
		//Удаляем целевую точку. Она теперь не нужна
		//this.targetPosition.shift();
		
		return path;
	}
	
	/**
	 * Перерассчитать уже существующий путь
	 * @return {Path}
	 */
	resolvePath() {
		this.targetPosition = this.path[this.path.length - 1];
		return this.path = this.solvePath();
	}
	tick() {
		let cell = null;
		if (!this.anim.isDone()) {
			cell = this.path.now().clone();
			cell.cPoint = this.anim.next();
		}
		else if (!this.path.isDone()) {
			cell = this.path.now().clone();
			this.anim = new Animation(this.path.nextPath(), this.object.speed, null);
		}
		//Удаляем объект передвижения
		else {
			cell = this.object.position;
			//this.object.move = null;
		}
		this.object.needRedraw = true;
		
		if (cell !== null)
			cell.groundCell = this.groundMatrix[cell.x][cell.y];
		
		this.currentPosition = cell;
		
		this.afterFunc(this);
		return cell;
	}
	
	toString() {
		return "Move";
	}
}