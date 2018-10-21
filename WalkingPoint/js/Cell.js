import Objects from "./Objects/Objects.js";

/**
 * Описывает позицию объекта
 */

export class Cell {
	get x() {
		return this.mPoint.x;
	}
	
	set x(value) {
		this.mPoint.x = value;
	}
	get y() {
		return this.mPoint.y;
	}
	
	set y(value) {
		this.mPoint.y = value;
	}
	constructor(mPoint, cPoint, scope) {
		this.mPoint = mPoint;
		this.cPoint = cPoint;
		this.scope = scope;
		this.border = {leftTop: null, rightDown: null};
		this.type = "Cell";
		this.id = Cell.CellId++;
		/** @type GroundCell */
		this.groundCell = null;
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
		
		match.xMatch = ((cPoint.x >= this.border.leftTop.x) && (cPoint.x < this.border.rightDown.x));
		match.yMatch = ((cPoint.y >= this.border.leftTop.y) && (cPoint.y < this.border.rightDown.y));
		match.total = (match.xMatch && match.yMatch);
		
		return match;
	}
	
	/**
	 * Устанавливает позицию по точкам, не учитывая привязку к матрице
	 * @param mPoint {MPoint}
	 * @param cPoint {CPoint}
	 */
	setPosition(mPoint, cPoint) {
		this.cPoint.x = cPoint.x;
		this.cPoint.y = cPoint.y;
		this.mPoint.x = mPoint.x;
		this.mPoint.y = mPoint.y;
		
		return this;
	}
	
	/**
	 * Устанавливает позицию из существующей клетки
	 * @param cell {Cell}
	 */
	setPositionFromCell(cell) {
		this.cPoint.x = cell.cPoint.x;
		this.cPoint.y = cell.cPoint.y;
		this.mPoint.x = cell.mPoint.x;
		this.mPoint.y = cell.mPoint.y;
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

/**
 * Ячейка самой матрицы
 */
export class GroundCell extends Cell {
	constructor(mPoint, cPoint, groundMatrix) {
		super(mPoint, cPoint, groundMatrix);
		this.placed = {};
	}
	
	/**
	 * Получает "вес" клетки относительно объекта
	 * @param object {SimpleObject}
	 */
	getDecency(object) {
		let result = object.decency;
		for (let obj in this.placed)
			result += (this.placed[obj].decency / object.decency);
		
		return result;
	}
	
	/**
	 * Стоит ли на данной клетке что угодно? true, если занято.
	 * @caller {SimpleObject}
	 * @return {Boolean}
	 */
	isBusy(caller = null) {
		let value = Object.keys(this.placed).length > 0;
		if (caller)
			value = (!(caller.id in this.placed) && value);
		return value;
	}
	
	clone() {
		let cell = super.clone();
		cell.groundCell = this;
		return cell;
	}
}

Cell.CellId = 0;
