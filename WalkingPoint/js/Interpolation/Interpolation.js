import {Cell} from "../Cell.js";
import Path from "../Path.js";
import {MPoint} from "../Point.js";

/**
 * Просчитывает точки путей
 */
export default class Interpolation {
	/**
	* Прокладывает путь от точки к точке
	* @param gM {GroundMatrix}
	* @param position1: {Cell}
	* @param position2: {Cell}
    * @return {Path}
	*/
	static positionToPosition(gM, position1, position2) {
		
		//Если точка назначения и точка отправления в одной и той же клетке, то возвращаем null
		if (position1.mPoint.compare(position2.mPoint))
			return null;
		
		//Если точка назначения занята, то ищем свободную ближе к первой точке
		if (gM[position2.x][position2.y].isBusy()) {
			position2 = this.findFreeCell(position2.mPoint, gM);
		}
		
		//Для быстрого доступа к MPoint клеток
		let mPt1 = position1.mPoint;
		let mPt2 = position2.mPoint;
		
		//Сам путь, который нужно заполнить клетками
		let path = new Path();
		
		//Клетка, которую будем заносить в путь
		let pathCell = position1;
		
		//Клетка, в которой был персонаж на предыдущем шаге
		let prevCell = position1;
		
		// Заносим в путь начальную точку
		path.push(pathCell.clone());
		
		//Просчитываем путь
		do {
			
			if (path[path.length - 2]) {
				prevCell = path[path.length - 2]
			}
			
			pathCell = this.checkInfluence(pathCell.mPoint, prevCell.mPoint, mPt2, gM);
			
			if (pathCell === null)
				return null;
			
			if (path.length > 50)
				return path;
			
			path.push(pathCell.clone());
			
		} while (!pathCell.mPoint.compare(mPt2));
		
		if (path.length <= 1)
			path = null;
		
		return path;
	};
	
	
	/**
	 * Алгоритм поиска в ширину
	 * @param sPos {Cell} стартовая позиция
	 * @param fPos {Cell} финальная позиция
	 * @param gM {GroundMatrix} поле
	 * @param draw: {Draw}
	 * @return Path
	 */
	static findWaySimple(sPos, fPos, gM, draw) {
		
		let sP = sPos.mPoint;
		let fP = fPos.mPoint;
		
		if (sP.compare(fP)) {
			return null;
		}
		
		//Путь
		let path = new Path();
		
		//Посещенные точки
		let visited = {};
		
		//Бегунок по клеткам
		let frontier = {
			current: null,
			arr: [],
			i: -1,
			put(around) {
				this.arr.push(around);
			},
			get() {
				this.current = this.arr[++this.i];
				return this.current;
			},
			isDone() {
				return (this.i >= this.arr.length)
			}
		};
		
		//Помещаем в массив первую точку
		frontier.put(sP.clone());
		
		//Клетки вокруг нужной клетки. Генератор
		let around;// = this.aroundPoints(frontier.get(), visited, gM);
		
		let stopper = 0;
		do {
			for (let cell of this.aroundPoints(frontier.get(), gM)) {
				if (!(cell.isBusy()) && !(cell.id in visited)) {
					let putPoint = cell.mPoint.clone();
					putPoint.id = cell.id;
					putPoint.parent = frontier.current;
					visited[putPoint.id] = true;
					
					frontier.put(putPoint);
				}
			}
			
			//Если дошли до нужной точки, то заполняем путь
			if (fP.compare(frontier.current)) {
				let putPoint = frontier.current;
				
				while (putPoint.parent) {
					//if (draw) draw.debugDraw(putPoint);
					path.push(gM[putPoint.x][putPoint.y].clone());
					putPoint = putPoint.parent;
				}
				path.push(sPos.clone());
				path.reverse();
				break;
			}
			stopper++;
			if (stopper > 2000)
				break;
			
		} while (!frontier.isDone());
		
		if (path.length < 2) {
			return null;
		}
		//let lastPt = around[frontier.i - 1];
		
		// do {
			
			// path.push(gM[lastPt.x][lastPt.y].clone());
			// draw.debugDraw(lastPt);
			
			// lastPt = lastPt.parent;
		// } while (lastPt.parent);
		
		return path;
	}
	
	/**
	 * Ищет клетки вокруг точки
	 * @param point {MPoint}
	 * @param gM {GroundMatrix}
	 * @return Array
	 */
	static *aroundPoints(point, gM) {
		//let arr = [];
		let mP = null;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if ((point.x + i >= 0 && point.x + i < gM.xLenght) && (point.y + j >= 0 && point.y + j < gM.yLenght)) {
					let cell = gM[point.x + i][point.y + j];
					if ((i !== j !== 1)) {
						//arr.push(cell.mPoint);
						yield cell;
					}
				}
			}
		}
		//return arr;
	}
	
	/**
	 * Проверяет клетки вокруг данной клетки на возможность и необходимость сделать туда шаг.
	 */
	static checkInfluence(currPos, prevPos, finPos, gM) {
		/** Проверка на то, что существует такая клетка в которую можно передвинуться*/
		let isMoveAvailable = false;
		
		/** Возвращаемая функцией клетка*/
		let nextPos = null;
		
		//Задает окрестности клетки
		let minX = Math.max(0, currPos.x - 1),
			maxX = Math.min(gM.xLenght - 1, currPos.x + 1),
			minY = Math.max(0, currPos.y - 1),
			maxY = Math.min(gM.yLenght - 1, currPos.y + 1);
		
		let influence = 0;
		let nextInfluence = 0;
		for (let i = minX; i <= maxX; i++) {
			for (let j = minY; j <= maxY; j++) {
				if (!gM[i][j].isBusy()) {
					nextInfluence = (1 / ((Math.abs(i - finPos.x)) + Math.abs(j - finPos.y) + 1));
					if (nextInfluence > influence) {
						if (!gM[i][j].mPoint.compare(currPos) && !gM[i][j].mPoint.compare(prevPos)) {
							isMoveAvailable = true;
							influence = nextInfluence;
							nextPos = gM[i][j];
						}
					}
				}
			}
		}
		
		return ((isMoveAvailable) ?  nextPos.clone() : nextPos);
	}
	
	/**
	 * Проверить, есть ли вокруг заданной точки свободные точки и, если есть, то вернуть какую-нибудь
	 * @param needPos {MPoint}
	 * @param gM {GroundMatrix}
	 * @param solvePos {MPoint}
	 * @return Cell
	 */
	static findFreeCell(needPos, gM, solvePos = null) {
		
		let resultCell = null;
		for (let cell of this.aroundPoints(needPos, gM)) {
			if (!cell.isBusy()) {
				if (resultCell !== null) {
					if (solvePos !== null) {
						if ((Math.sqrt(Math.pow(Math.abs(solvePos.x - cell.x), 2) + (Math.pow(Math.abs(solvePos.y - cell.y), 2)))) <
							(Math.sqrt(Math.pow(Math.abs(solvePos.x - resultCell.x), 2) + (Math.pow(Math.abs(solvePos.y - resultCell.y), 2))))
						) {
							resultCell = cell;
						}
					}
					else {
						break;
					}
				}
				else {
					resultCell = cell;
				}
			}
		}
		
		return resultCell.clone();
	}
	
	positionToPositionOld() {
				
				let mPt1 = position1.mPoint;
				let mPt2 = position2.mPoint;
				
				let path = new Path();
				
				let xSteps = mPt2.x - mPt1.x;
				let ySteps = mPt2.y - mPt1.y;
				
				let xDir = 1;
				let yDir = 1;
				
				if (xSteps < 0) { xDir = -xDir; xSteps = -xSteps; }
				if (ySteps < 0) { yDir = -yDir; ySteps = -ySteps; }
				
				let step = mPt1.clone();
				let prevStep = step.clone();
				
				let pathCell;
				
				let steps = Math.max(Math.abs(xSteps), Math.abs(ySteps));
				
				try { path.push(gM.getCell(step)); }
				catch (e) { }
				
				do {
					if (step.x !== mPt2.x && step.y !== mPt2.y) {
						step.x = step.x + xDir;
						step.y = step.y + yDir;
					}
					else if (step.x === mPt2.x && step.y === mPt2.y) {
						break;
					}
					else if (step.x === mPt2.x) {
						step.y = step.y + yDir;
					}
					else if (step.y === mPt2.y) {
						step.x = step.x + xDir;
					}
					
					pathCell = gM[step.x][step.y];
					
					if (pathCell.isBusy()) {
						if (path.length <= 1)
							path = null;
						
						return path;
					}
					
					try { path.push(pathCell.clone()); }
					catch (e) { }
					
					if (path.length > 100)
						return null;
					
				} while (((step.x !== mPt2.x) || (step.y !== mPt2.y)));
				
				if (path.length <= 1)
					path = null;
				
				return path;
	}
}