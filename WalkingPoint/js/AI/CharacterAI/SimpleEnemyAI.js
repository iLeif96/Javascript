import BaseAI from "./BaseAI.js";

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
		this.fowl = null;
		
		this.lastPlayerCell = null;
		
		this.patrolCell = null;
		
		this.stateList = {
			idle: 0,
			findPath: 1,
			move: 2,
			find: 3,
			hunting: 4,
			patrol: 5,
		};
	}
	
	/**
	 * Ищем в пределах видимости кого-то похожего на игрока. Возвращает true, если находит
	 */
	findPlayer() {
		let mP = this.character.position.mPoint;
		let r = this.character.visionRadius;
		for (let i = mP.x - this.character.visionRadius; i <= mP.x + r; i++) {
			for (let j = mP.y - this.character.visionRadius; j <= mP.y + r; j++) {
				if (i >= 0 && i < this.groundMatrix.xLenght && j >= 0 && j < this.groundMatrix.yLenght) {
					//if (Math.pow(i - mP.x, 2) + Math.pow(j - mP.y, 2) <= r * 2) {
					let currCell;
					if (currCell = this.groundMatrix[i][j]) {
						for (let obj in currCell.placed) {
							if (currCell.placed[obj].decency > 50 && currCell.placed[obj].isDie() === false && this.character !== currCell.placed[obj]) {
								this.fowl = currCell.placed[obj];
								this.character.setTargetPosition(currCell.clone(), true);
								return true;
								this.changeState(this.stateList.hunting);
							}
						}
					}
					//}
				}
			}
		}
		this.fowl = null;
		return false;
		this.changeState(this.stateList.patrol);
	}
	
	/**
	 * Охота на персонажа. Возвращает false, если Охота в процессе. false, если объект потерян
	 */
	hunting() {
		
		//Если противник все еще в поле зрения, то задаем его, как цель перемещения
		if (this.findPlayer()) {
			this.lastPlayerCell = this.fowl.position.clone();
			this.character.setTargetPosition(this.fowl.position.clone());
		}
		//Если противник скрылся, то начинаем патрулирование
		else {
			return false
		}
		
		//Если персонаж в пределах одной клетки от врага, то он считается пойманным
		if (Math.abs(this.character.position.x - this.fowl.position.x) <= 1 && Math.abs(this.character.position.y - this.fowl.position.y) <= 1) {
			this.fowl.hit(0.005, this.character);
			return true;
		}
		else if (!this.character.isMoving()) {
			this.findPath();
		}
		
		
		
		//Продолжаем преследование
		return true;
	}
	
	/**
	 * Патрулирование местности в поиске игрока. Возвращает true, если патрулирование продолжается и false, если дичь найдена
	 */
	patrol() {
		
		//Если дичь найдена, то охотимся на неё
		if (this.findPlayer()) {
			return false;
		}
		//Если дичь не найдена, но она успела где-то засветиться
		else if (this.lastPlayerCell !== null) {
			this.patrolCell = this.lastPlayerCell.clone();
			
			if (this.character.position.x === this.lastPlayerCell.x && this.character.position.y === this.lastPlayerCell.y)
				this.lastPlayerCell = null;
		}
		
		
		//Есть есть точка, в которую будет осуществляться патрулирование, то идем в неё
		if (this.patrolCell) {
			//Если путь уже создан, то идем по нему
			if (this.character.move !== null) {
				//Идем. Если путь пройден, то будем искать другую точку для патрулирования
					if (!this.character.isMoving()) {
						this.patrolCell = null;
					}
			}
			// Если путь не создан, то строим его
			else {
				this.character.setTargetPosition(this.patrolCell.clone());
				//Если путь нельзя построить, то ищем что-то новое
				//if (!this.animating) {
					if (!this.findPath()) {
						this.character.targetPosition.pop();
						this.patrolCell = null;
					}
				//}
			}
			return true;
		}
		//Если точка для патрулирования не задана, то ищем случайную
		else {
			this.patrolCell = this.getRandomCell(this.character, this.groundMatrix);
			return true;
		}
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
				this.findPlayer() ? this.changeState(this.stateList.hunting) : this.changeState(this.stateList.patrol);
				break;
				
			case (this.stateList.hunting) :
				this.hunting() ? this.changeState(this.stateList.hunting) : this.changeState(this.stateList.patrol);
				break;
			
			case (this.stateList.patrol) :
				this.patrol() ? this.changeState(this.stateList.patrol) : this.changeState(this.stateList.hunting);
				break;
		}
		//console.log(this.state);
		
	}
	
}