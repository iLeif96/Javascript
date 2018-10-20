/**
 * Создается для перемещения объекта
 */
import Interpolation from "../Interpolation/Interpolation.js";
import Animation from "../Animation/Animation.js";
import Periodic from "../Periodic.js";

export default class Move extends Periodic {
	/**
	 *
	 * @param groundMatrix {GroundMatrix}
	 * @param object {SimpleObject}
	 * @param targetPosition {Cell}
	 * @return {Move}
	 */
	constructor(object, targetPosition, groundMatrix) {
		super();
		this.groundMatrix = groundMatrix;
		this.targetPosition = [targetPosition];
		this.object = object;
		
		/** @type {Path} */
		this.path = this.solvePath();
		/** @type {Animation} */
		this.anim = new Animation(this.path.nowPath(), object.speed, null);
		
		if (this.anim === null)
			return null;
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
		let tP = this.targetPosition[0].mPoint;
		let path = null;
		
		if (this.groundMatrix[tP.x][tP.y].isBusy()) {
			this.targetPosition[0] = Interpolation.findFreeCell(
				tP,
				this.groundMatrix,
				this.object.position.mPoint);
		}
		
		//Интерполируем путь
		path = Interpolation.findWaySimple(
			this.object.position,
			this.targetPosition[0],
			this.groundMatrix);
		
		//Удаляем целевую точку. Она теперь не нужна
		this.targetPosition.shift();
		
		return path;
	}
	
	tick(canvas) {
		if (!this.anim.isDone()) {
			this.object.position.setPosition(this.path.now().mPoint, this.anim.next());
		}
		else if (!this.path.isDone()) {
			this.anim = new Animation(this.path.nextPath(), this.object.speed, null);
		}
		else {
			this.object.move = null;
		}
		
		if (this.object.canvasType === "walls") {
			canvas.wallsChanges = true;
		}
		else if (this.object.canvasType === "characters") {
			canvas.charactersChanges = true;
		}
	}
}