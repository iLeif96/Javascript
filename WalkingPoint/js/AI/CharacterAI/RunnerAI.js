import BaseAI from "./BaseAI.js";
import {Cell} from "../../Cell.js";
import Interpolation from "../../Interpolation/Interpolation.js";
import {MPoint} from "../../Point.js";
import Queue from "../../Queue.js";

export default class SimpleEnemyAI extends BaseAI {
	/**
	 * @param character {Character}
	 * @param scope {Scope}
	 * @param groundMatrix {GroundMatrix}
	 * @param canvas {UserCanvas}
	 * @param time {Time}
	 */
	constructor(character, scope, groundMatrix, canvas, time) {
		super(character, scope, groundMatrix, canvas, time);
		
		//Список врагов поблизости
		this.enemyNear = {};
		
		this.stateList = {
			idle: 0,
			move: 1,
			runAway: 2,
		};
	}
	
	/**
	 * Ищем в пределах видимости кого-то похожего на врага. Возвращает true, если находит
	 */
	findEnemy() {
		let mP = this.character.position.mPoint;
		let r = this.character.visionRadius;
		this.enemyNear = {};
		for (let i = mP.x - this.character.visionRadius; i <= mP.x + r; i++) {
			for (let j = mP.y - this.character.visionRadius; j <= mP.y + r; j++) {
				if (i >= 0 && i < this.groundMatrix.xLenght && j >= 0 && j < this.groundMatrix.yLenght) {
					//if (Math.pow(i - mP.x, 2) + Math.pow(j - mP.y, 2) <= r * 2) {
					let currCell;
					if (currCell = this.groundMatrix[i][j]) {
						for (let obj in currCell.placed) {
							if (currCell.placed[obj].decency < 101 && currCell.placed[obj].isDie() === false && this.character !== currCell.placed[obj]) {
								this.enemyNear[obj] = currCell.placed[obj];
								return true;
							}
						}
					}
					//}
				}
			}
		}
		return false;
	}
	
	/**
	 * Убегание от противников. True, если продолжаем убегать, false, если прекратили
	 */
	runAway() {
		
		//Если есть точка куда надо бежать, то
		//Если противник все еще рядом, то бежим от него (них)
		if (this.findEnemy()) {
			if (this.character.move === null) {
				let newPos = this.findEscape(this.character.position);
				if (newPos !== null) {
					this.character.setTargetPosition(newPos.clone());
					this.findPath();
				}
			}
		}
		//Если противники ушли, то стоим и ждем их
		else {
			return false
		}
		
		
		
		//Продолжаем убегать
		return true;
	}
	
	// findEscape(position) {
	//
	// 	//Позиция противника
	// 	let ePos;
	// 	//Свое текущее положение
	// 	let sPos = this.character.position.mPoint;
	// 	//Своя новая позиция
	// 	let nPos;
	// 	//Указывает на направление движения
	// 	let dir = {x: 0, y: 0};
	// 	let lastDir = null;
	// 	if (!position) {
	// 		//Уходим от каждого противника на шаг в другую сторону
	// 		for (let enemy in this.enemyNear) {
	// 			ePos = this.enemyNear[enemy].mPoint;
	// 			dir.x += ePos.x - sPos.x;
	// 			dir.y += ePos.y - sPos.y;
	// 		}
	//
	// 		dir.x = (dir.x < 0 && dir.x !== 0) ? -1 : 1;
	// 		dir.y = (dir.y < 0 && dir.y !== 0) ? -1 : 1;
	//
	// 		nPos = Interpolation.findFreeCell(new MPoint(sPos.x + dir.x, sPos.y + dir.y), this.groundMatrix, sPos);
	// 	}
	// 	else {
	// 		nPos = position;
	// 	}
	//
	// 	let busyCells = 0;
	// 	let checkBusyCells = 0;
	// 	if (nPos !== null) {
	// 		let frontier = new Queue();
	// 		for (let cell of Interpolation.aroundPoints(nPos.mPoint, this.groundMatrix)) {
	// 			if (cell.isBusy()) busyCells++;
	// 			else frontier.put(cell);
	// 		}
	// 		while (!frontier.isDone()) {
	// 			for (let cell of Interpolation.aroundPoints(frontier.get().mPoint, this.groundMatrix)) {
	// 				if (cell.isBusy()) checkBusyCells++;
	// 			}
	// 			if (busyCells > checkBusyCells) {
	// 				nPos = frontier.current;
	// 				busyCells = checkBusyCells;
	// 			}
	// 		}
	// 	}
	// 	//Проверяем возможность отхода
	// 	return nPos
	//
	// }
	
	findEscape(position) {
		
		let lt = new MPoint(position.x - this.character.visionRadius, position.y - this.character.visionRadius); 		//левая = верхняя
		let rd = new MPoint(position.x + this.character.visionRadius, position.y + this.character.visionRadius); 		//правая = нижняя
		
		let arr = [];
		let obj = {};
		
		let sum = 0;
		
		// for (let cell of Interpolation.aroundPoints(this.character.position, this.groundMatrix)) {
		for (let cell of this.groundMatrix.forEach(lt, rd)) {
			for (let subCell of Interpolation.aroundPoints(cell, this.groundMatrix)) {
				for (let subSubCell of Interpolation.aroundPoints(subCell, this.groundMatrix)) {
					sum += subSubCell.isBusy() ? subSubCell.getDecency(this.character) : 1;
				}
				sum += subCell.isBusy() ? subCell.getDecency(this.character)  : 1;
			}
			sum += cell.isBusy() ? cell.getDecency(this.character)  : 1;
			//sum = cell.getDecency(this.character);
			arr.push(sum);
			obj[sum] = cell;
			sum = 0;
		}
		let min = obj[Math.min(...arr)];
		return min
	}
	
	/**
	 * Проверяет сектора на наличие в них противника
	 */
	checkSectors(character, enemies) {
	
	}
	/**
	 * Возвращает случайную ячейку поля для патрулирования
	 *
	 */
	getRandomCell(character, gM) {
		let xRangeMin = Math.max(0, character.position.x - character.visionRadius);
		let xRangeMax = Math.min(gM.xLenght - 1, character.position.x + character.visionRadius);
		
		let yRangeMin = Math.max(0, character.position.y - character.visionRadius);
		let yRangeMax = Math.min(gM.yLenght - 1, character.position.y + character.visionRadius);
		
		let x = xRangeMin + Math.floor((Math.random() * (xRangeMax - xRangeMin + 1)));
		let y = yRangeMin + Math.floor((Math.random() * (yRangeMax - yRangeMin + 1)));
		
		
		if (x === character.position.x && y === character.position.y)
			return this.getRandomCell(character, gM);
		
		return gM[x][y].clone();
	}
	
	
	tick() {
		switch (this.state) {
			case (this.stateList.idle) :
				this.findEnemy() ? this.changeState(this.stateList.runAway) : this.changeState(this.stateList.idle);
				break;
			
			case (this.stateList.runAway) :
				this.runAway() ? this.changeState(this.stateList.runAway) : this.changeState(this.stateList.idle);
				break;
			
		}
		//console.log(this.state);
		
	}
	
}