import Periodic from "../../Periodic.js";
import {CPoint, MPoint} from "../../Point.js";
import Path from "../../Path.js";
import Interpolation from "../../Interpolation/Interpolation.js";
import Animation from "../../Animation/Animation.js";
import {Cell} from "../../Cell.js";

export default class BaseAI extends Periodic{
	/**
	 * @param character {Character}
	 * @param scope {Scope}
	 * @param groundMatrix {GroundMatrix}
	 * @param canvas {UserCanvas}
	 * @param time {Time}
	 */
	constructor(character, scope, groundMatrix, canvas, time) {
		super();
		this.character = character;
		this.scope = scope;
		this.groundMatrix = groundMatrix;
		this.canvas = canvas;
		this.time = time;
		
		/**
		 * Путь, по которому персонаж должен сделать проход
		 * @type {Path}
		 */
		this.path = null;
		/**
		 * Расчет анимации от точки к точке
		 * @type {Animation}
		 */
		this.anim = null;
		
		/**
		 * список состояний
		 */
		this.stateList = {
			idle: 0,
			findPath: 1,
			move: 2,
		};
		/**
		 * Текущее состояние персонажа
		 * @type {stateList}
		 */
		this.state = this.stateList.idle;
		
		/**
		 * Анимируется ли объект
		 */
		this.animating = false;
	}
	
	/**
	 * Управление значением состояния
	 * @param newState {stateList}
	 */
	changeState(newState) {
		this.state = newState;
	}
	
	/**
	 * Проверка на встречу с препятствием
	 */
	hindranceCheck() {
		
		
		let currentPosition = this.character.position;
		let nextPosition = this.character.position;
		if (pathCell.isBusy()) {
			return path;
		}
	}
	
	/**
	 * Нужно ли передвигаться? true, если да
	 */
	checkForMoving() {
		if (this.character.targetPosition[0] ) {
			//Если путь не создан, то удаляем targetPosition и переходим в idle
			this.character.forceMove = false;
			return true;
			this.changeState(this.stateList.findPath);
		}
		return false;
	}
	
	/**
	 *  Поиск пути. Возвращает true, если путь создан
	 */
	findPath() {
		this.path = Interpolation.positionToPosition(this.groundMatrix, this.character.position, this.character.targetPosition[0]);
		if (this.path == null) {
			this.character.targetPosition.shift();
			return false;
			this.changeState(this.stateList.idle)
		}
		//Если создан, то начинаем передвижение
		else {
			return true;
			this.changeState(this.stateList.move);
		}
	}
	
	/**
	 *  Передвижение по пути. Возвращает true, если передвижение осуществляется
	 */
	followThePath() {
		//Есть ли сам путь, по которому идти
			//Если анимация не создана, то создаем её
			if (this.anim == null && this.path !== null) {
				this.anim = new Animation(this.time, this.path.nowPath(), this.character.speed, null);
				this.animating = true;
				//this.changeState(this.stateList.move);
				//this.character.position.setPosition(this.path.now().mPoint, this.anim.next());
				//this.character.position = this.path.next();
				//this.canvas.objectsChanges = true;
			}
			//Явно что-то не так
			else if (this.anim === null && this.path === null) {
				return false;
			}
			//Если анимации не закончена, то устанавливаем персонажу новую позицию
			else if (!this.anim.done) {
				this.character.position.setPosition(this.path.now().mPoint, this.anim.next());
				this.canvas.objectsChanges = true;
			}
			//Если анимация закончена, то удаляем объект анимации и принудительно устанавливаем персонажа в последнюю точку пути
			else {
				this.anim = null;
				this.path.currentPositionInPath++;
				this.character.position.setPositionFromCell(this.path.now());
				this.animating = false;
			}
			
			/**
			 * Проверка на окончание пути
			 */
			if (this.path.currentPositionInPath >= this.path.length - 1) {
				if (this.character.targetPosition[0]) {
					this.character.targetPosition.shift();
				}
				
				this.path = null;
				return false;
				this.changeState(this.stateList.idle);
			}
			return true;
		
	}
	
	/**
	 * Идет ли сейчас анимация?
	 */
	isAnimating() {
		if (this.anim) {
			if (!this.anim.done)
				return true;
		}
		return false;
	}
	
	tick() {
		super.tick();
		switch (this.state) {
			
			case (this.stateList.idle):
				if (!this.isAnimating())
					this.checkForMoving() ? this.changeState(this.stateList.findPath) : this.changeState(this.stateList.idle);
				break;
				
			case (this.stateList.findPath):
				this.findPath() ? this.changeState(this.stateList.move) : this.changeState(this.stateList.idle);
				break;
				
			case (this.stateList.move):
				this.followThePath() ? this.changeState(this.stateList.move) : this.changeState(this.stateList.idle);
				break;
		}
		//console.log(this.state);
		
	}
}