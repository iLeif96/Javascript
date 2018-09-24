/**
 * Родитель всех двух видов точек
 */
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.type = "Point";
	}
}

/**
 * Позиция объекта в матрице
 */
export class MPoint extends Point{
	constructor(x, y) {
		super(x, y);
		this.type = "MPoint";
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
export class CPoint {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.mPoint = null;
		this.type = "СPoint";
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

