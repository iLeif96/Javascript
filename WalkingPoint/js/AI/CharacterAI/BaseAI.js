import Periodic from "../../Periodic.js";
import {CPoint, MPoint} from "../../Point.js";
import Interpolation from "../../Interpolation/Interpolation.js";

export default class BaseAI extends Periodic{
	/**
	 * @param character {Character}
	 * @param scope {Scope}
	 * @param groundMatrix {GroundMatrix}
	 * @param canvas {UserCanvas}
	 * @param interpolation {Interpolation}
	 */
	constructor(character, scope, groundMatrix, canvas, interpolation) {
		super();
		this.character = character;
		this.scope = scope;
		this.groundMatrix = groundMatrix;
		this.canvas = canvas;
		/**
		 * Путь, по которому персонаж должен сделать проход
		 * @type {Path}
		 */
		this.path = null;
	}
	
	fromPointToPoint() {
		if (this.character.targetPosition.length > 0) {
			if (this.path === null || this.character.forceMove === true) {
				this.path = Interpolation.positionToPosition(this.groundMatrix, this.character.position, this.character.targetPosition[0]);
				this.character.forceMove = false;
			}
			
			if (this.path.currentPositionInPath === this.path.length) {
				this.character.targetPosition.shift();
				this.path = null;
			}
			else {
				this.character.position = this.path[this.path.currentPositionInPath];
				this.canvas.objectsChanges = true;
				this.path.currentPositionInPath++;
			}
		}
	}
	
	tick() {
		super.tick();
		this.fromPointToPoint();
	}
}