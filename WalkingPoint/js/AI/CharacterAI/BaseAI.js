import Periodic from "../../Periodic.js";
import {CPoint, MPoint} from "../../Point.js";
import Path from "../../Path.js";
import Interpolation from "../../Interpolation/Interpolation.js";
import Animation from "../../Animation/Animation.js";
import {Cell} from "../../Cell.js";
import Move from "../../Moving/Move.js";

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
		 * Предыдущее состояние персонажа
		 * @type {stateList}
		 */
		this.prevState = this.state;
		
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
		this.prevState = this.state;
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
			return true;
			this.changeState(this.stateList.findPath);
		}
		return false;
	}
	
	/**
	 *  Поиск пути. Возвращает true, если путь создан
	 */
	findPath() {
		this.character.moveTo(new Move(this.character, this.character.targetPosition[0], this.groundMatrix))
	}
	
	tick() {
		super.tick();
		switch (this.state) {
			
			case (this.stateList.idle):
				if (!this.character.isMoving())
					this.checkForMoving() ? this.changeState(this.stateList.findPath) : this.changeState(this.stateList.idle);
				break;
				
			case (this.stateList.findPath):
				this.findPath() ? this.changeState(this.stateList.move) : this.changeState(this.stateList.idle);
				break;
				
			case (this.stateList.move):
				this.character.isMoving() ? this.changeState(this.stateList.move) : this.changeState(this.stateList.idle);
				break;
		}
		//console.log(this.state);
		
	}
}