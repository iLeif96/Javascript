/**
 * Сначла импортируем объекты
 */
import _Player from "./Characters/Player.js";
import _Enemy from "./Characters/Enemy.js";
import _Runner from "./Characters/Runner.js";

import _RoughWall from "./Walls/RoughWall.js";

/**
 * Основной класс для создания и хранения объектов;
 */
export default class Objects {
	constructor(groundMatrix) {
		this.groundMatrix = groundMatrix;
		
		/**
		 Список доступных персонажей
		 */
		this.chars = {
			/**
			 * @type Player
			 */
			Player: _Player,
			/**
			 * @type Enemy
			 */
			Enemy: _Enemy,
			
			/**
			 * @type Runner
			 */
			Runner: _Runner
		};
		
		/**
			Список доступных стен
		 */
		this.walls = {
			RoughWall: _RoughWall,
		};
		
		/**
		 * Список созданных объектов
		 */
		this.createdObjects = {
			createdCharacter: [],
			createdWalls: [],
		};
		
		this.forId = 0;
	}
	
	/**
	 * Создать персонажа
	 * @param character
	 */
	addCharacter(character) {
		this.createdObjects.createdCharacter.push(character);
		character.id = this.forId++;
		this.groundMatrix[character.position.mPoint.x][character.position.mPoint.y].placed[character.id] = character;
		
	}
	
	/**
	 * Создать стенку
	 * @param wall
	 */
	addWall(wall) {
		this.createdObjects.createdWalls.push(wall);
		wall.id = this.forId++;
		this.groundMatrix[wall.position.mPoint.x][wall.position.mPoint.y].placed[wall.id] = wall;
		
	}
}