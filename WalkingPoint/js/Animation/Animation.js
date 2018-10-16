import {Cell} from "../Cell.js";
import {CPoint} from "../Point.js";

/**
 * Анимирует плавное перемещение между клетками матрицы
 */
export default class Animation {
	/**
	 * @param time {Time}
	 * @param path {Path}
	 * @param speed {Number}
	 * @param mode {modes}
	 */
	constructor(time, path, speed, mode) {
		this.modes = {
			positionToPosition: this.positionToPosition
		};
		
		this.startTime = 0;
		this.endTime = 1;
		this.currentTime = 0;
		
		this.inc = 1 / time.operationsInSecond;
		
		this.done = false;
		
		this.path = path;
		this.speed = speed;
		this.time = time;
		
		this.startPosition = null;
		this.endPosition = null;
		this.currentPosition = null;
		
		this.solveAnimation();
	}
	
	/**
	 * Первоначальный рассчет действий анимации
	 */
	solveAnimation() {
		if (this.path.length === 2) {
			let pt1 = this.path[0];
			let pt2 = this.path[1];
			
			let x = pt2.cPoint.x - pt1.cPoint.x;
			let y = pt2.cPoint.y - pt1.cPoint.y;
			
			let module = Math.sqrt((x * x) + (y * y));
			
			this.endTime = module / this.speed;
			
			this.xSpeed = x / this.endTime;
			this.ySpeed = y / this.endTime;
			
			this.startPosition = pt1.cPoint.clone();
			this.endPosition = pt2.cPoint.clone();
			this.currentPosition = pt1.cPoint;
		}
	}
	
	/**
	 * Простое перемещение от точки к точке без ускорения
	 */
	positionToPosition() {
		this.currentPosition.x = this.startPosition.x + (this.currentTime * this.xSpeed);
		this.currentPosition.y = this.startPosition.y + (this.currentTime * this.ySpeed);
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