import {Cell} from "../Cell.js";
import {CPoint} from "../Point.js";
import Time from "../Time.js";

/**
 * Анимирует плавное перемещение между клетками матрицы
 */
export default class Animation {
	/**
	 * @param path {Path}
	 * @param speed {Number}
	 * @param mode {modes}
	 * @return {Animation}
	 */
	constructor(path, speed, mode) {
		this.modes = {
			positionToPosition: this.positionToPosition
		};
		if (path.length < 2)
			return null;
		
		this.startTime = 0;
		this.endTime = 1;
		this.currentTime = 0;
		
		this.done = false;
		
		this.path = path;
		this.speed = speed;
		
		this.startPosition = null;
		this.endPosition = null;
		this.currentPosition = null;
		
		this.solveAnimation();
		
		this.inc = 1 / Time.operationsInSecond;
		
	}
	
	/**
	 * Первоначальный рассчет действий анимации
	 */
	solveAnimation() {
		if (this.path.length === 2) {
			let pt1 = this.path[0];
			if (pt1.cPoint)
				pt1 = pt1.cPoint;
			
			let pt2 = this.path[1];
			if (pt2.cPoint)
				pt2 = pt2.cPoint;
			
			let x = pt2.x - pt1.x;
			let y = pt2.y - pt1.y;
			
			let module = Math.sqrt((x * x) + (y * y));
			
			this.endTime = module / this.speed;
			
			this.xSpeed = x / this.endTime;
			this.ySpeed = y / this.endTime;
			
			this.startPosition = pt1.clone();
			this.endPosition = pt2.clone();
			this.currentPosition = pt1;
		}
	}
	
	/**
	 * Простое перемещение от точки к точке без ускорения
	 */
	positionToPosition() {
		this.currentPosition.x = this.startPosition.x + (this.currentTime * this.xSpeed);
		this.currentPosition.y = this.startPosition.y + (this.currentTime * this.ySpeed);
	}
	
	isDone() {
		return this.done;
	}
	
	/**
	 * Рассчитывает новую позицию для координат
	 * @return CPoint
	 */
	next() {
		if (this.currentTime >= this.endTime) {
			this.done = true;
			return this.endPosition;
		}
		else {
			this.positionToPosition();
			this.currentTime += this.inc;
			return this.currentPosition;
		}
	}
}