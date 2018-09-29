import Periodic from "../../Periodic.js";

export default class BaseAI extends Periodic{
	/**
	 * @param character {Character}
	 * @param scope {Scope}
	 * @param groundMatrix {GroundMatrix}
	 * @param canvas {UserCanvas}
	 */
	constructor(character, scope, groundMatrix, canvas) {
		super();
		this.character = character;
		this.scope = scope;
		this.groundMatrix = groundMatrix;
		this.canvas = canvas;
	}
	
	fromPointToPoint() {
		if (this.character.targetPosition) {
			this.character.position = this.character.targetPosition.clone();
			this.character.targetPosition = null;
			this.canvas.objectsChanges = true;
		}
	}
	
	tick() {
		super.tick();
		this.fromPointToPoint();
	}
}