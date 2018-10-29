import Periodic from "../Periodic.js";
import BaseAI from  "./CharacterAI/BaseAI.js"
import SimpleEnemyAI from  "./CharacterAI/SimpleEnemyAI.js"
import RunnerAI from  "./CharacterAI/RunnerAI.js"
/**
 * Основной класс для создания и хранения AI;
 */
export default class AI {
	/**
	 * @param scope {Scope}
	 * @param groundMatrix {GroundMatrix}
	 * @param canvas {UserCanvas}
	 */
	constructor(scope, groundMatrix, canvas) {
		/**
		 * Простейший тип для персонажей
		 * @type {BaseAI}
		 */
		this.BaseAI = BaseAI;
		
		/**
		 * Простейший тип для персонажей
		 * @type {SimpleEnemyAI}
		 */
		this.SimpleEnemyAI = SimpleEnemyAI;
		
		/**
		 * Простейший тип для бегунов - союзников
		 * @type {SimpleEnemyAI}
		 */
		this.RunnerAI = RunnerAI;
		
		this.scope = scope;
		this.groundMatrix = groundMatrix;
		this.canvas = canvas;
		
	}
	
	addAI(character, _AI) {
		character.AI = new _AI(character, this.scope, this.groundMatrix, this.canvas)
	}
}