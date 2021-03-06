import {Cell} from "../Cell.js";
import Path from "../Path.js";
import {MPoint} from "../Point.js";
import Queue from "../Queue.js";

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
		let frontier = new Queue();
		
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
					if (draw) draw.debugDraw(putPoint);
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
	 * Ищет клетки вокруг точки. Генератор
	 * @param point {MPoint}
	 * @param gM {GroundMatrix}
	 * @return Array
	 */
	static *aroundPoints(point, gM) {
		//let arr = [];
		// let mP = null;
		// for (let i = -1; i <= 1; i++) {
		// 	for (let j = -1; j <= 1; j++) {
		// 		if ((point.x + i >= 0 && point.x + i < gM.xLenght) && (point.y + j >= 0 && point.y + j < gM.yLenght)) {
		// 			if ((i !== j !== 1)) {
		// 				//arr.push(cell.mPoint);
		// 				yield gM[point.x + i][point.y + j];
		// 			}
		// 		}
		// 	}
		// }
		//
		// let arr = [];
		
		if ((point.x >= 0 && point.x < gM.xLenght) && (point.y - 1 >= 0 && point.y - 1 < gM.yLenght)) {
			yield (gM[point.x][point.y - 1])
		}
		if ((point.x - 1 >= 0 && point.x - 1 < gM.xLenght) && (point.y >= 0 && point.y < gM.yLenght)) {
			yield (gM[point.x - 1][point.y])
		}
		if ((point.x + 1 >= 0 && point.x + 1 < gM.xLenght) && (point.y >= 0 && point.y < gM.yLenght)) {
			yield (gM[point.x + 1][point.y])
		}
		if ((point.x >= 0 && point.x < gM.xLenght) && (point.y + 1 >= 0 && point.y + 1 < gM.yLenght)) {
			yield (gM[point.x][point.y + 1])
		}
		
		if ((point.x - 1 >= 0 && point.x - 1< gM.xLenght) && (point.y - 1 >= 0 && point.y - 1 < gM.yLenght)) {
			yield (gM[point.x - 1][point.y - 1])
		}
		if ((point.x + 1 >= 0 && point.x + 1 < gM.xLenght) && (point.y - 1>= 0 && point.y - 1 < gM.yLenght)) {
			yield (gM[point.x + 1][point.y - 1])
		}
		if ((point.x - 1 >= 0 && point.x - 1 < gM.xLenght) && (point.y + 1>= 0 && point.y + 1 < gM.yLenght)) {
			yield (gM[point.x - 1][point.y + 1])
		}
		if ((point.x + 1 >= 0 && point.x + 1 < gM.xLenght) && (point.y + 1 >= 0 && point.y + 1 < gM.yLenght)) {
			yield (gM[point.x + 1][point.y + 1])
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
		if (resultCell !== null)
			return resultCell.clone();
		else
			return null;
	}
	
}