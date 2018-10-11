import Periodic from "../../Periodic.js";
import {CPoint, MPoint} from "../../Point.js";
import Path from "../../Path.js";
import Interpolation from "../../Interpolation/Interpolation.js";
import Animation from "../../Animation/Animation.js";
import Cell from "../../Cell.js";

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
			move: 1,
			find: 2,
			hunting: 3,
		};
		/**
		 * Текущее состояние персонажа
		 * @type {stateList}
		 */
		this.state = this.stateList.idle;
		
		
	}
	
	/**
	 * Управление значением состояния
	 * @param newState {stateList}
	 */
	changeState(newState) {
		this.state = newState;
	}
	
	
	toTargetPosition() {
		if (this.character.targetPosition.length > 0) {
			if (this.path === null || this.character.forceMove === true) {
				this.path = Interpolation.positionToPosition(this.groundMatrix, this.character.position, this.character.targetPosition[0]);
				this.character.forceMove = false;
			}
			
			if (this.path.currentPositionInPath >= this.path.length - 1) {
				this.character.targetPosition.shift();
				this.path = null;
				//this.changeState(this.stateList.idle);
			}
			else if (this.anim == null) {
				//this.changeState(this.stateList.move);
				this.anim = new Animation(this.time, this.path.nowPath(), this.character.speed, null);
				this.character.position.setPosition(this.path.now().mPoint, this.anim.next());
				//this.character.position = this.path.next();
				this.canvas.objectsChanges = true;
			}
			else if (!this.anim.done) {
				this.character.position.setPosition(this.path.now().mPoint, this.anim.next());
				this.canvas.objectsChanges = true;
			}
			else if (this.anim.done) {
				this.anim = null;
				this.path.currentPositionInPath++;
				this.character.position.setPositionFromCell(this.path.now());
			}
		}
	}
	
	tick() {
		super.tick();
		this.toTargetPosition();
	}
}