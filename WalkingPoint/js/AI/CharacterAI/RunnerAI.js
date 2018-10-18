import BaseAI from "./BaseAI.js";
import {Cell} from "../../Cell.js";
import Interpolation from "../../Interpolation/Interpolation.js";
import {MPoint} from "../../Point.js";

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
							if (currCell.placed[obj].decency < 101 && currCell.placed[obj].isDie === false && this.character !== currCell.placed[obj]) {
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
		
		//Если противник все еще рядом, то бежим от него (них)
		if (this.findEnemy()) {
			//Позиция противника
			let ePos;
			//Свое текущее положение
			let sPos = this.character.position.mPoint;
			//Своя новая позиция
			let nPos;
			//Указывает на направление движения
			let dir = {x: 0, y: 0};
			let lastDir = null;
			
			//Уходим от каждого противника на шаг в другую сторону
			for (let enemy in this.enemyNear) {
				ePos = this.enemyNear[enemy].position.mPoint;
				
				//(enPos.y < myPos.y) ? newPos.y++ : newPos.y--;
				// dir.x += (ePos.x < sPos.x) ? 1 : -1;
				// dir.y += (ePos.y < sPos.y) ? 1 : -1;
				
				if (ePos.x === sPos.x)  { dir.x = 0; }
				else if (ePos.x < sPos.x) { dir.x = 1; }
				else if (ePos.x < sPos.x) { dir.x = -1; }
				
				if (ePos.y === sPos.y)  { dir.y = 0; }
				else if (ePos.y < sPos.y) { dir.y = 1; }
				else if (ePos.y < sPos.y) { dir.y = -1; }
				
				if (lastDir !== null) {
					dir.x += lastDir.x;
					dir.y += lastDir.y;
				}
				
				lastDir = {x: dir.x, y: dir.y};
			}
			
			if (dir.x < dir.x) { dir.x = -1; }
			else if (dir.x > dir.x) { dir.x = 1; }
			
			if (dir.y < dir.y) { dir.y = -1; }
			else if (dir.y > dir.y) { dir.y = 1; }
			
			//Проверяем возможность отхода
			nPos = Interpolation.findFreeCell(new MPoint(sPos.x + dir.x, sPos.y + dir.y), this.groundMatrix, sPos);
			if (nPos)
				this.character.setTargetPosition(nPos.clone());
			
		}
		//Если противники ушли, то стоим и ждем их
		else {
			return false
		}
		
		//Если есть точка куда надо бежать, то
		if (this.character.targetPosition.length > 0) {
			if (this.path === null) {
				this.findPath();
			}
			
			this.followThePath();
		}
		
		//Продолжаем убегать
		return true;
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