/**
 * Создается для стрельбы из оружия
 */
import Interpolation from "../Interpolation/Interpolation.js";
import Animation from "../Animation/Animation.js";
import Periodic from "../Periodic.js";
import {CPoint} from "../Point.js";
import Bullet from "../Objects/Decals/Bullet.js";
import Path from "../Path.js";

export default class Shooting extends Periodic {
	/**
	 *
	 * @param object {SimpleObject}
	 * @param targetPosition {Cell}
	 * @param groundMatrix {GroundMatrix}
	 * @param objects {Objects}
	 * @return {Move}
	 */
	constructor(object, targetPosition, groundMatrix, objects) {
		super();
		this.object = object;
		this.objects = objects;
		this.targetPosition = targetPosition;
		this.groundMatrix = groundMatrix;
		
		/** @type {Path} */
		this.path = this.solvePath();
		
		if (this.path === null)
			throw "Path not created";
		
		/** @type {Animation} */
		this.anim = new Animation(this.path.nowPath(), this.object.longWeapon.bulletSpeed, null);
		
		if (this.anim === null)
			throw "Path not created";
		
		this.bullet = this.objects.addDecal(new Bullet("Bullet", this.object.position.clone(), this));
		this.bullet.addAction(this);
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
		let tP = this.targetPosition.cPoint;
		let sP = this.object.position.cPoint.clone();
		let lastPos = sP.clone();
		let path = null;
		
		let vector = new CPoint(tP.x - sP.x, tP.y - sP.y);
		
		lastPos.x = tP.x + vector.x * this.object.longWeapon.range;
		lastPos.y = tP.y + vector.y * this.object.longWeapon.range;
		
		path = new Path(sP, lastPos);
		return path;
	}
	
	tick() {
		let cell = null;
		if (!this.anim.isDone()) {
			// cell = this.path.now().clone();
			cell = this.anim.next();
		}
		else if (!this.path.isDone()) {
			cell = this.path.now().clone();
			this.anim = new Animation(this.path.nextPath(), this.object.longWeapon.bulletSpeed, null);
		}
		//Удаляем объект передвижения
		else {
			//cell = this.object.position;
			this.object.move = null;
		}
		this.bullet.needRedraw = true;
		this.object.needRedraw = true;
		
		// if (cell !== null) {
		// 	cell.groundCell = this.groundMatrix[cell.x][cell.y];
		// }
		
		this.bullet.position.cPoint.setPositionFromPoint(cell);
		
		//this.afterFunc(cell, this);
		
		return cell;
	}
	
	toString() {
		return "Shooting";
	}
}