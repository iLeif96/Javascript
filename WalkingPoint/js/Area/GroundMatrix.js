import {CPoint} from  "../Point.js";

export default class GroundMatrix extends Array {
	constructor (canvas, scope) {
		super();
		this.scope = scope;
		this.canvas = canvas;
		this.xLenght = 0;
		this.yLenght = 0;
		this.create(this.canvas, this.scope);
	}
	
	create(canvas, scope) {
		let i, j;
		for (i = 0; i * scope.cell < (scope.width); i++) {
			this[i] = [];
			for (j = 0; j * scope.cell < (scope.hEnd - scope.hStart); j ++) {
				let x = (scope.cell * i) + scope.wStart;
				let y = (scope.cell * j) + scope.hStart;
				this[i][j] = new CPoint(x, y);
				this[i][j].mPoint = new CPoint(i, j);
			}
		}
		
		this.xLenght = i;
		this.yLenght = j;
	}
	
	/**
	 * Передает точку в непереведенных к отрисовке координатам
	 * @param mPoint {MPoint}
	 * @returns {CPoint}
	 */
	getCPoint(mPoint) {
		return this[mPoint.x][mPoint.y];
	}
	
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param mPoint {MPoint}
	 * @returns x: {number}
	 */
	getX(mPoint) {
		return this[mPoint.x][mPoint.y].getX(this.scope);
	}
	
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param mPoint {MPoint}
	 * @returns y: {number}
	 */
	getY(mPoint) {
		return this[mPoint.x][mPoint.y].getY(this.scope);
	}
}