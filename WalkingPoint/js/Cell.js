export default class Cell {
	constructor(mPoint, cPoint, scope) {
		this.mPoint = mPoint;
		this.cPoint = cPoint;
		this.scope = scope;
		this.border = {leftTop: null, rightDown: null};
		this.type = "Cell";
		this.setBorder();
	}
	
	/**
	 * Устанавливает границы для каждой ячейки
	 */
	setBorder() {
		this.border.leftTop = this.cPoint.clone();
		this.border.rightDown = this.cPoint.clone();
		
		this.border.rightDown.x += this.scope.cell;
		this.border.rightDown.y += this.scope.cell;
	}
	
	/**
	 * Проверяет, находится ли точка в данной ячейке
	 * @param cPoint {CPoint}
	 */
	checkCross(cPoint) {
		let match = {xMatch: false, yMatch: false, total: false};
		
		match.xMatch = ((cPoint.x >= this.border.leftTop.x) && (cPoint.x <= this.border.rightDown.x));
		match.yMatch = ((cPoint.y >= this.border.leftTop.y) && (cPoint.y <= this.border.rightDown.y));
		match.total = (match.xMatch && match.yMatch);
		
		return match;
	}
	
	//От этого надо избавиться
	
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @returns x: {number}
	 */
	getX() {
		return this.cPoint.getX(this.scope);
	}
	
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @returns y: {number}
	 */
	getY() {
		return this.cPoint.getY(this.scope);
	}
	
	/**
	 * Клонирует объект
	 */
	clone() {
		return new Cell(this.mPoint.clone(), this.cPoint.clone(), this.scope);
	}
}