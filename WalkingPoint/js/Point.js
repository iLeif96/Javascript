/**
 * Родитель всех двух видов точек
 */
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.type = "Point";
	}
	
	/**
	 * Сравниввает две точки
	 * @param point {Point}
	 * @return {boolean}
	 */
	compare(point) {
		return (this.x === point.x && this.y === point.y);
	}
	
	clone() {
		return new Point(this.x, this.y)	
	}
	
	setPosition(x, y) {
		this.x = x;
		this.y = y;
		
		return this;
	}
	
	setPositionFromPoint(point) {
		this.x = point.x;
		this.y = point.y;
		
		return this;
	}
}

/**
 * Позиция объекта в матрице
 */
export class MPoint extends Point{
	constructor(x, y) {
		super(Math.floor(x), Math.floor(y));
		this.type = "MPoint";
	}
	
	clone() {
		return new MPoint(this.x, this.y)
	}
	
	/**
	 * Возвращает точку для отрисовки
	 * @returns {CPoint}
	 */
	getCPoint(groundMatrix) {
		return groundMatrix.getCPoint(this);
	};
	
	/**
	 * Возвращает x для отрисовки
	 * @param groundMatrix {GroundMatrix}
	 * @returns x: {number}
	 */
	getX(groundMatrix) {
		return groundMatrix.getX(this);
	};
	
	/**
	 * Возвращает y для отрисовки
	 * @param groundMatrix {GroundMatrix}
	 * @returns y: {number}
	 */
	getY(groundMatrix) {
		return groundMatrix.getY(this);
	};
}

/**
 * Позиция в координатах для отрисовки в непереведенных координатах
 */
export class CPoint extends Point {
	constructor(x, y) {
		super(x, y);
		this.type = "CPoint";
	}
	
	clone() {
		return new CPoint(this.x, this.y)
	}
	
	/**
	 * Возвращает x для отрисовки
	 * @returns {number}
	 */
	getX(scope) {
		return scope.getX(this.x);
	};
	
	/**
	 * Возвращает y для отрисовки
	 * @returns {number}
	 */
	getY(scope) {
		return scope.getY(this.y);
	};
}

