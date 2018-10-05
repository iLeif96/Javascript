import {CPoint, MPoint} from  "../Point.js";
import Cell from "../Cell.js";

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
			for (j = 0; j * scope.cell < (scope.width); j ++) {
				let x = (scope.cell * i);
				let y = (scope.cell * j);
				this[i][j] = new Cell(new MPoint(i, j), new CPoint(x, y), this.scope);
			}
		}
		
		this.xLenght = i;
		this.yLenght = j;
	}
	
	/**
	 * Передает точку декартовых координат ячейки 
	 * @param mPoint {MPoint}
	 * @returns {CPoint}
	 */
	getCPoint(mPoint) {
		try {
			return this.getCell(mPoint).cPoint;
		}
		catch (e){
			console.log(e);
			return undefined;
		}
	}
	
	/**
	 * Передает точку матричных координат ячейки
	 * @param CPoint {CPoint}
	 * @returns {MPoint}
	*/
	getMPoint(cPoint) {
		try {
			return this.getCell(cPoint).mPoint;
		}
		catch (e){
			console.log(e);
			return undefined;
		}
	}
	
	/**
	 * Передает ячейку матрицы
	 * @param point {Point}
	 * @returns Cell: {Cell}
	*/
	getCell(point) {
		let cell = undefined;
		
		switch (point.type) {
			case "MPoint": {
				cell = this[point.x][point.y];
				break;
			}
			case "CPoint": {
				let xLenght = this.xLenght;
				let yLenght = this.yLenght;
				
				rows: for (let i = 0; i < xLenght; i++) {
					columns: for (let j = 0; j < yLenght; j++) {
						
						//Проверяем пересечения
						let match = this[i][j].checkCross(point);
						
						//Если ячейка совпадает, то выходим из цикла 
						if (match.total) {
							cell = this[i][j];
							break rows;
						}
						//Если нет, то проверяем в какой строчке/столбе совпадение
						else {
							//Если в строчке, то ищем только в этой строчке:
							if (match.xMatch) {
								subRow: for (let col = j; col < yLenght; col++) { 
									match = this[i][col].checkCross(point);
									if (match.total) {
										cell = this[i][col];
										break rows;
									}
								}
								break rows;
							}
							//Если в столбе, то ищем только в этом столбе:
							else if (match.yMatch) {
								subColumns: for (let row = i; row < xLenght; row++) { 
									match = this[row][j].checkCross(point);
									if (match.total) {
										cell = this[row][j];
										break rows;
									}
								}
								break rows;
							}
						}
					}
				}
				break;
			}
		}
		
		if (!cell) throw "Point not found";
		return cell;
	}
	
	
	//От этого надо избавиться
	
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param mPoint {MPoint}
	 * @returns x: {number}
	 */
	getX(mPoint) {
		return this[mPoint.x][mPoint.y].cPoint.getX(this.scope);
	}
	
	/**
	 * Передает координату в переведенных к отрисовке координатам
	 * @param mPoint {MPoint}
	 * @returns y: {number}
	 */
	getY(mPoint) {
		return this[mPoint.x][mPoint.y].cPoint.getY(this.scope);
	}
}